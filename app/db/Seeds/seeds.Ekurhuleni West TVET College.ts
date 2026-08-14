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

const EWC_COURSES: CourseSeed[] = [

  // ============================================================
  // NATED - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electronic Engineering (Light Current)",
    qualification_type: "NATED",
    duration: "N3-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "An appropriate National Certificate N3 Engineering Studies, or a Senior Certificate with at least three instructional offerings applicable to the chosen programme, or an equivalent qualification. Previous level must be successfully completed before proceeding to the next level. N2-N3 may be offered to registered apprentices subject to approval."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical Engineering (Heavy Current)",
    qualification_type: "NATED",
    duration: "N3-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "An appropriate National Certificate N3 Engineering Studies, or a Senior Certificate with at least three instructional offerings applicable to the chosen programme, or an equivalent qualification. Previous level must be successfully completed before proceeding to the next level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Mechanical Engineering",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with Mathematics and Science for Engineering Studies, or an appropriate recognised prerequisite qualification. N4-N6. Each N-level is approximately 11 weeks."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Avionics",
    qualification_type: "NATED",
    duration: "N3-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Engineering Studies admission requirements apply. Grade 12 with Mathematics and Science is required for Engineering Studies. N3-N6. Each N-level is approximately 11 weeks."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Part-Time Engineering",
    qualification_type: "NATED",
    duration: "N2-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "An appropriate National Certificate N3 Engineering Studies, or a Senior Certificate with at least three instructional offerings applicable to the chosen programme, or an equivalent qualification. Students proceed to the next level only after successfully completing the previous level. N2 and N3 may be offered to registered apprentices upon written request from their companies and subject to approval."
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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with relevant subjects or an equivalent recognised qualification. N4-N6. Full theoretical programme duration is approximately 1 year and 6 months."
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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with relevant subjects or an equivalent recognised qualification. N4-N6. Full theoretical programme duration is approximately 1 year and 6 months."
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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with relevant subjects or an equivalent recognised qualification. N4-N6. Full theoretical programme duration is approximately 1 year and 6 months."
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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with relevant subjects or an equivalent recognised qualification. N4-N6. Full theoretical programme duration is approximately 1 year and 6 months."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Management Assistant (Secretarial)",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 with relevant subjects or an equivalent recognised qualification. N4-N6. Full theoretical programme duration is approximately 1 year and 6 months."
  },


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
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level. Students must complete three Fundamental and four Vocational subjects."
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
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
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
    english_fal: "First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level. A total of 7 subjects is required: 3 Fundamental and 4 Vocational subjects."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Management",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Transport & Logistics",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  },


  // ============================================================
  // NC(V) - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering and Building Construction",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level. Some Engineering programmes have additional subject requirements."
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
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level. Engineering programmes may have additional subject requirements."
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
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
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
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Mechatronics",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level. Engineering programmes may have additional subject requirements."
  },


  // ============================================================
  // NC(V) - OTHER PROGRAMMES CURRENTLY PUBLISHED BY EWC
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "General & Utility Studies",
    qualification: "Hospitality",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  },

  {
    institution_type: "TVET College",
    faculty: "General & Utility Studies",
    qualification: "Tourism",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  },

  {
    institution_type: "TVET College",
    faculty: "General & Utility Studies",
    qualification: "Education & Development",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or higher, ABET Level 4 or NQF Level 1. Full qualification consists of NQF Levels 2-4, one year at each level."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedEkurhuleniWest = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of EWC_COURSES) {
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
      `Ekurhuleni West TVET College seeded successfully: ${EWC_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Ekurhuleni West TVET College:",
      error
    );

    throw error;
  }
};

export default EWC_COURSES;