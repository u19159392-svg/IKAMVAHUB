import * as SQLite from "expo-sqlite";

type CourseSeed = {
  institution_type: string;
  faculty: string;
  qualification: string;
  qualification_type: string;
  duration: string;
  minimum_aps: number | null;
  fps: string | null;
  english_hl: string | null;
  english_fal: string | null;
  mathematics: string | null;
  mathematical_literacy: string | null;
  additional_requirements: string | null;
};

const UMGUNGUNDLOVU_COURSES: CourseSeed[] = [

  // ============================================================
  // NC(V) - BUSINESS STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Finance, Economics & Accounting",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Generic Management",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Marketing",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Office Administration",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Wholesale & Retail",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // NC(V) - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering & Building Construction",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification. Mathematics and relevant engineering requirements may apply."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering & Related Design",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification. Mathematics and relevant engineering requirements may apply."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical Infrastructure Construction",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification. Mathematics and relevant engineering requirements may apply."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Information Technology & Computer Science",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics or Mathematical Literacy",
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // NC(V) - HOSPITALITY & TOURISM
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Hospitality & Tourism",
    qualification: "Hospitality",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification. Practical training forms part of the programme."
  },

  {
    institution_type: "TVET College",
    faculty: "Hospitality & Tourism",
    qualification: "Tourism",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // NC(V) - AGRICULTURE
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Agriculture",
    qualification: "Primary Agriculture",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics or Mathematical Literacy",
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or an accepted equivalent qualification. Practical agricultural training forms part of the programme."
  },


  // ============================================================
  // NATED - BUSINESS STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Business Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification. Progression to N5 and N6 requires the preceding N-level."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Financial Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification. Progression to N5 and N6 requires the preceding N-level."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Human Resource Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Management Assistant",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Public Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Marketing Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Tourism Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies. N4 admission generally requires Grade 12/NSC or an applicable equivalent qualification."
  },


  // ============================================================
  // NATED - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering",
    qualification_type: "NATED",
    duration: "N1-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or an accepted equivalent qualification. Higher N-level admission requires the applicable preceding N-level or recognised equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical Engineering",
    qualification_type: "NATED",
    duration: "N1-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or an accepted equivalent qualification. Higher N-level admission requires the applicable preceding N-level or recognised equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Mechanical Engineering",
    qualification_type: "NATED",
    duration: "N1-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or an accepted equivalent qualification. Higher N-level admission requires the applicable preceding N-level or recognised equivalent."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedUmgungundlovu = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of UMGUNGUNDLOVU_COURSES) {
      await db.runAsync(
        `
        INSERT INTO courses (
          institution_type,
          faculty,
          qualification,
          qualification_type,
          duration,
          minimum_aps,
          fps,
          english_hl,
          english_fal,
          mathematics,
          mathematical_literacy,
          additional_requirements
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          course.institution_type,
          course.faculty,
          course.qualification,
          course.qualification_type,
          course.duration,
          course.minimum_aps,
          course.fps,
          course.english_hl,
          course.english_fal,
          course.mathematics,
          course.mathematical_literacy,
          course.additional_requirements
        ]
      );
    }

    console.log(
      `Umgungundlovu TVET College seeded successfully: ${UMGUNGUNDLOVU_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Umgungundlovu TVET College:",
      error
    );

    throw error;
  }
};

export default UMGUNGUNDLOVU_COURSES;