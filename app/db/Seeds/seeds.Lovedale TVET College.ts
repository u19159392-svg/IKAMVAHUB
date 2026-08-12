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

const LOVEDALE_COURSES: CourseSeed[] = [

  // ============================================================
  // NATED - BUSINESS STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Public Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "Minimum E symbol / Level 3 for English Second Language HG, or minimum D symbol / Level 4 for English Second Language SG",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12/NSC or N3 Certificate. Accounting at Grade 12 level is recommended. N4-N6 takes approximately 18 months of theory, followed by the applicable workplace experience for the National N Diploma."
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
    english_fal: "Minimum E symbol / Level 3 for English Second Language HG, or minimum D symbol / Level 4 for English Second Language SG",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12/NSC or N3 Certificate. Grade 12 Accounting is required for Financial Management. N4-N6 takes approximately 18 months of theory, followed by applicable workplace experience for the National N Diploma."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Human Resources Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "Minimum E symbol / Level 3 for English Second Language HG, or minimum D symbol / Level 4 for English Second Language SG",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12/NSC or N3 Certificate. This programme is also offered part-time. N4-N6 takes approximately 18 months of theory, followed by applicable workplace experience for the National N Diploma."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Business Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "Minimum E symbol / Level 3 for English Additional Language",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 or NC(V) Level 4. A minimum E symbol / Level 3 for English Additional Language is required. Minimum D symbol / Level 4 for English First Language. N4-N6 takes approximately 18 months of theory, followed by applicable workplace experience for the National N Diploma."
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
    english_fal: "Minimum E symbol / Level 3 for English Additional Language",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 or NC(V) Level 4. A minimum E symbol / Level 3 for English Additional Language is required. Minimum D symbol / Level 4 for English First Language. N4-N6 takes approximately 18 months of theory, followed by applicable workplace experience for the National N Diploma."
  },


  // ============================================================
  // NATED - AGRICULTURE & ARTS
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Agriculture & Arts",
    qualification: "Art & Design",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "Grade 12 English requirement applies",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 admission requirements apply. Programme offered at Alice Campus. N4-N6 consists of Drawing, Painting or Ceramics, Graphic Design, Entrepreneurship & Business Management and History of Art subjects across the levels."
  },

  {
    institution_type: "TVET College",
    faculty: "Agriculture & Arts",
    qualification: "Farming Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "Grade 12 English requirement applies",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 admission requirements apply. Programme offered at Alice Campus. Covers farming activities, animal and plant production and management of a farm as a business. N4-N6 takes approximately 18 months of theory."
  },


  // ============================================================
  // N1-N3 - ENGINEERING / ARTISAN PROGRAMMES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Carpentry & Roofing",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Plumbing",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Masonry / Bricklaying",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Water & Sanitation",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Motor Body Repair",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Motor Mechanic",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Welding",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 with Mathematics, Physical Science or Life Science and English. N1-N3 takes three trimesters, one trimester per level."
  },


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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. NQF Level 1 qualification, PLP designed for access to NQF Level 2, or RPL assessment may also provide access. NC(V) Levels 2-4 take three years, one year at each level."
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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. NQF Level 1 qualification, PLP or RPL may also provide access. NC(V) Levels 2-4 take three years, one year at each level."
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
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. Students who do not meet the Mathematics and Physical Science requirements may be directed to the PLP. NC(V) Levels 2-4 take three years."
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
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. NQF Level 1, PLP or RPL may provide alternative access. NC(V) Levels 2-4 take three years."
  },


  // ============================================================
  // NC(V) - ENGINEERING
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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. Students who do not meet the minimum Mathematics and Physical Science requirements may be directed to the PLP. NC(V) Levels 2-4 take three years."
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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. Students who do not meet the Mathematics and Physical Science requirements may be directed to the PLP. NC(V) Levels 2-4 take three years."
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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. Students who do not meet the minimum Mathematics and Physical Science requirements may be directed to the PLP. NC(V) Levels 2-4 take three years."
  },


  // ============================================================
  // NC(V) - AGRICULTURE
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Agriculture & Arts",
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
      "Minimum Grade 9, Grade 10 or Grade 11, with Grade 10 and 11 given first preference. Programme offered at Alice Campus. NQF Level 1, PLP or RPL may also provide access to NC(V) Level 2. NC(V) Levels 2-4 take three years."
  },


  // ============================================================
  // ENGINEERING FOUNDATIONAL PROGRAMME
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering Foundational Programme",
    qualification_type: "Occupational",
    duration: "1 year",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Foundational programme designed to prepare students for engineering studies. Entry requirements are programme-specific and should be confirmed with Lovedale before application."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedLovedale = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of LOVEDALE_COURSES) {
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
      `Lovedale TVET College seeded successfully: ${LOVEDALE_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Lovedale TVET College:",
      error
    );

    throw error;
  }
};

export default LOVEDALE_COURSES;