// app/utils/eligibility.ts
//
// Compares a learner's saved APS breakdown (from apsStorage.ts) against a
// course row from the `courses` table in reference.db, using the columns
// already defined in ReferenceDatabase.ts.

import { SubjectResult } from './apsStorage';

// Matches the `courses` table columns from ReferenceDatabase.ts.
// Extend this if you add more subject columns later.
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

// Maps a subject name (as it appears in MASTER_SUBJECT_LIST / the calculator)
// to the matching column on a course row.
// IMPORTANT: these subject names must exactly match what's used in
// constants/subjects.ts — mismatched spelling here means a course will
// silently never match, even when the learner actually qualifies.
const SUBJECT_TO_COLUMN: Record<string, keyof Course> = {
  'Mathematics': 'mathematics',
  'Mathematical Literacy': 'mathematical_literacy',
  'Physical Sciences': 'physical_sciences',
  'Life Sciences': 'life_sciences',
  'English Home Language': 'english_hl',
  'English First Additional Language': 'english_fal',
};

/**
 * Extracts the leading number out of a requirement string like "60%" or "60".
 * Returns null if the course doesn't specify a requirement for that subject.
 */
const parseRequiredMark = (requirement: string | null): number | null => {
  if (!requirement) return null;
  const match = requirement.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

/**
 * Returns true if the learner's APS breakdown meets every requirement
 * this course specifies (overall APS + any per-subject minimums).
 * A subject with no requirement on the course (null/blank) is skipped —
 * it isn't held against the learner.
 */
export const isEligible = (
  course: Course,
  totalAps: number,
  breakdown: SubjectResult[],
): boolean => {
  if (course.minimum_aps != null && totalAps < course.minimum_aps) {
    return false;
  }

  for (const [subjectName, column] of Object.entries(SUBJECT_TO_COLUMN)) {
    const requiredMark = parseRequiredMark(course[column] as string | null);
    if (requiredMark == null) continue; // not required for this course

    const learnerSubject = breakdown.find((b) => b.subject === subjectName);
    const learnerMark = learnerSubject?.mark ?? 0;

    if (learnerMark < requiredMark) {
      return false;
    }
  }

  return true;
};

/**
 * Filters a full list of courses down to the ones the learner qualifies for.
 */
export const getQualifyingCourses = (
  courses: Course[],
  totalAps: number,
  breakdown: SubjectResult[],
): Course[] => {
  return courses.filter((course) => isEligible(course, totalAps, breakdown));
};