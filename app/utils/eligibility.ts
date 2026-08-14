// app/utils/eligibility.ts
//
// Compares a learner's saved APS breakdown (from apsStorage.ts) against a
// course row from the `courses` table in reference.db.
//
// Course requirement columns (mathematics, english_hl, etc.) are stored as
// NSC achievement levels — "Level 4", "Level 5", etc. — matching real
// university brochures, and the same bands as getApsPoints() in Database.ts.

import { SubjectResult } from './apsStorage';

export type Course = {
  id: number;
  institution_id: number;
  institution_type: string;
  faculty: string;
  qualification: string;
  qualification_type: string;
  duration: string;
  province: string;
  minimum_aps: number | null;
  fps: string | null;
  english_hl: string | null;
  english_fal: string | null;
  mathematics: string | null;
  mathematical_literacy: string | null;
  physical_sciences: string | null;
  life_sciences: string | null;
  nbt: string | null;
  additional_requirements: string | null;
  apply_url: string | null;
};

// Subjects where a learner only ever has ONE of the two — satisfying
// either one's requirement is enough. A course specifying both columns
// doesn't mean "you need both," it means "whichever one you took."
const SUBJECT_ALTERNATIVES: Array<{
  subjects: string[];
  columns: (keyof Course)[];
}> = [
  {
    subjects: ['English Home Language', 'English First Additional Language'],
    columns: ['english_hl', 'english_fal'],
  },
];

// Every other subject: one subject name maps to exactly one column, and
// it's a straightforward "must meet this" requirement.
const SUBJECT_TO_COLUMN: Record<string, keyof Course> = {
  'Mathematics': 'mathematics',
  'Mathematical Literacy': 'mathematical_literacy',
  'Physical Sciences': 'physical_sciences',
  'Life Sciences': 'life_sciences',
};

// Same bands as getApsPoints() in Database.ts — kept in sync deliberately.
const markToLevel = (mark: number): number => {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
};

const NOT_REQUIRED_VALUES = new Set(['not required', 'no', 'n/a', '']);

const parseRequiredLevel = (requirement: string | null): number | null => {
  if (!requirement) return null;
  if (NOT_REQUIRED_VALUES.has(requirement.trim().toLowerCase())) return null;

  const match = requirement.match(/Level\s*(\d)/i);
  return match ? parseInt(match[1], 10) : null;
};

export const isEligible = (
  course: Course,
  totalAps: number,
  breakdown: SubjectResult[],
): boolean => {
  if (course.minimum_aps != null && totalAps < course.minimum_aps) {
    return false;
  }

  // Standard one-subject-to-one-column requirements
  for (const [subjectName, column] of Object.entries(SUBJECT_TO_COLUMN)) {
    const requiredLevel = parseRequiredLevel(course[column] as string | null);
    if (requiredLevel == null) continue; // not required for this course

    const learnerSubject = breakdown.find((b) => b.subject === subjectName);
    const learnerLevel = learnerSubject ? markToLevel(learnerSubject.mark) : 0;

    if (learnerLevel < requiredLevel) {
      return false;
    }
  }

  // Alternative-subject requirements (e.g. English HL OR FAL) — the
  // learner only needs to satisfy ONE of the listed subject/column pairs.
  for (const group of SUBJECT_ALTERNATIVES) {
    // Does the course require anything from this group at all?
    const requirements = group.columns
      .map((col) => parseRequiredLevel(course[col] as string | null))
      .filter((lvl): lvl is number => lvl != null);

    if (requirements.length === 0) continue; // course doesn't require any of these

    // Find whichever of the group's subjects the learner actually took.
    const learnerEntry = breakdown.find((b) => group.subjects.includes(b.subject));
    if (!learnerEntry) {
      return false; // course needs one of these subjects, learner took none of them
    }

    const learnerLevel = markToLevel(learnerEntry.mark);
    const subjectIndex = group.subjects.indexOf(learnerEntry.subject);
    const requiredLevel = parseRequiredLevel(
      course[group.columns[subjectIndex]] as string | null,
    );

    // If the specific subject the learner took isn't required by the course
    // (e.g. course only sets english_hl, learner took FAL), that's still a
    // pass — the course's real intent is "meet the language requirement."
    if (requiredLevel != null && learnerLevel < requiredLevel) {
      return false;
    }
  }

  return true;
};

export const getQualifyingCourses = (
  courses: Course[],
  totalAps: number,
  breakdown: SubjectResult[],
): Course[] => {
  return courses.filter((course) => isEligible(course, totalAps, breakdown));
};