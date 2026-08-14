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

const PORT_ELIZABETH_COURSES: CourseSeed[] = [

  // ============================================================
  // NC(V) - BUSINESS STUDIES
  // ============================================================

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
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. The programme is completed over three years, one year at each NC(V) level."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. The programme combines theoretical and practical learning."
  },

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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Subject requirements apply according to the level and programme."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Information Technology & Computer Science",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Programme combines theory and practical IT learning."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Safety in Society",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Additional programme-specific selection requirements may apply."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Engineering programmes may have Mathematics and Physical Science requirements depending on the programme and level."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Mathematics and relevant science requirements may apply."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Engineering subject requirements apply."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Mathematics and relevant engineering subject requirements apply."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification. Practical training forms part of the programme."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // OCCUPATIONAL PROGRAMMES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Bookkeeping",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Electrician",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Welder",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Plumber",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Early Childhood Development Practitioner",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Chef",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Admission requirements and duration are programme-specific and must be confirmed with the college."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedPortElizabeth = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of PORT_ELIZABETH_COURSES) {
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
      `Port Elizabeth TVET College seeded successfully: ${PORT_ELIZABETH_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Port Elizabeth TVET College:",
      error
    );

    throw error;
  }
};

export default PORT_ELIZABETH_COURSES;