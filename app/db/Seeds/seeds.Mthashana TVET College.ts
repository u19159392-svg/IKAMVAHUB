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

const MTHASHANA_COURSES: CourseSeed[] = [

  // ============================================================
  // NATED / REPORT 191 - ENGINEERING STUDIES
  // ============================================================

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
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or equivalent. Higher N-level admission requires the applicable preceding N-level or recognised equivalent qualification. Offered at Vryheid, Nquthu and Nongoma campuses."
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
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or equivalent. Higher N-level admission requires the applicable preceding N-level or recognised equivalent qualification. Offered at Vryheid, Nquthu and Nongoma campuses."
  },

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
      "N1-N6 Engineering Studies. N1 admission generally requires Grade 9 or equivalent. Higher N-level admission requires the applicable preceding N-level or recognised equivalent qualification. Offered at Vryheid, Nquthu and Nongoma campuses."
  },


  // ============================================================
  // NATED / REPORT 191 - BUSINESS STUDIES
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
      "N4-N6 Business Studies. Grade 12 or an applicable equivalent qualification is required for N4 admission. The NATED route consists of theoretical studies followed by relevant workplace experience for the National N Diploma."
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
      "N4-N6 Business Studies. Grade 12 or an applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
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
      "N4-N6 Business Studies. Grade 12 or an applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Farming Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "N4-N6 Business Studies/Agriculture-related programme. Grade 12 or applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
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
      "N4-N6 Business Studies. Grade 12 or applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
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
      "N4-N6 Business Studies. Grade 12 or applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
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
      "N4-N6 Business Studies. Grade 12 or applicable equivalent qualification is required for N4 admission. The National N Diploma route includes theoretical studies and relevant workplace experience."
  },


  // ============================================================
  // NC(V) - BUSINESS / SERVICES
  // ============================================================

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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. The NC(V) programme combines theory and practical/workplace learning."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. The NC(V) programme combines theory and practical/workplace learning."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. The NC(V) programme combines theory and practical/workplace learning."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. The programme combines theoretical and practical agricultural learning."
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
    mathematics: "Mathematics or Mathematical Literacy",
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. The programme combines theoretical and practical IT learning."
  },


  // ============================================================
  // NC(V) - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering and Related Design",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. Engineering programmes may require Mathematics and Physical Science depending on the programme and level."
  },

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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. Engineering programmes may require Mathematics and Physical Science depending on the programme and level."
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
      "NC(V) Levels 2-4. Entry to Level 2 is generally through Grade 9 or an accepted equivalent route. Engineering programmes may require Mathematics and Physical Science depending on the programme and level."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedMthashana = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of MTHASHANA_COURSES) {
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
      `Mthashana TVET College seeded successfully: ${MTHASHANA_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Mthashana TVET College:",
      error
    );

    throw error;
  }
};

export default MTHASHANA_COURSES;