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

const THEKWINI_COURSES: CourseSeed[] = [

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
      "Grade 12/NSC or an applicable equivalent qualification for N4 admission. Students progressing to N5 and N6 must have completed the preceding N-level. The National N Diploma requires N4-N6 theory and applicable workplace experience."
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
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Progression to N5 and N6 requires the preceding level. National N Diploma route includes N4-N6 theory and relevant workplace experience."
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
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Progression to N5 and N6 requires the preceding level. National N Diploma route includes N4-N6 theory and relevant workplace experience."
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
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Thekwini offers Public Management at N4-N6 and both full-time and part-time study options are available at selected campuses."
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
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Progression to N5 and N6 requires the preceding level. National N Diploma route includes N4-N6 theory and relevant workplace experience."
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
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Progression to N5 and N6 requires the preceding level. National N Diploma route includes N4-N6 theory and relevant workplace experience."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Public Relations",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. Progression to N5 and N6 requires the preceding level."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Tourism",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12/NSC or applicable equivalent qualification for N4 admission. The programme is offered at selected Thekwini campuses and may be available full-time or part-time."
  },


  // ============================================================
  // NATED / REPORT 191 - ENGINEERING STUDIES
  // ============================================================

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
      "Engineering Studies N1-N6. Entry to N1 generally requires Grade 9 or higher, or an NQF Level 1 qualification. Higher levels require the applicable preceding N-level or recognised equivalent. Engineering studies are generally offered on a trimester basis."
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
      "Engineering Studies N1-N6. Entry to N1 generally requires Grade 9 or higher, or an NQF Level 1 qualification. Higher levels require the applicable preceding N-level or recognised equivalent."
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
      "Engineering Studies N1-N6. Entry to N1 generally requires Grade 9 or higher, or an NQF Level 1 qualification. Higher levels require the applicable preceding N-level or recognised equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering Studies (Mechanical of Metals)",
    qualification_type: "NATED",
    duration: "N1-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Engineering Studies programme covering mechanical and metal-related fields. N1 entry generally requires Grade 9 or higher, or an NQF Level 1 qualification. Higher levels require the applicable preceding N-level."
  },


  // ============================================================
  // NC(V) - BUSINESS STUDIES
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
      "NC(V) Levels 2-4. Minimum entry is generally Grade 9 or an accepted equivalent qualification. The programme includes Business Practice, Office Practice and Office Data Processing."
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
      "NC(V) Levels 2-4. Minimum entry is generally Grade 9 or an accepted equivalent qualification. Subject requirements may vary by level."
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
      "NC(V) Levels 2-4. Minimum entry is generally Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // NC(V) - ENGINEERING
  // ============================================================

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
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or higher with the applicable subject requirements. The Springfield Campus has advertised Engineering & Related Design Level 2."
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
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or higher with applicable Mathematics requirements."
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
      "NC(V) Levels 2-4. Entry to Level 2 generally requires Grade 9 or higher with applicable Mathematics requirements."
  },


  // ============================================================
  // NC(V) - HOSPITALITY
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
      "NC(V) Levels 2-4. Minimum entry is generally Grade 9 or an accepted equivalent qualification. Practical hospitality training forms part of the programme."
  },


  // ============================================================
  // NC(V) - TOURISM
  // ============================================================

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
      "NC(V) Levels 2-4. Minimum entry is generally Grade 9 or an accepted equivalent qualification."
  },


  // ============================================================
  // OCCUPATIONAL / SKILLS PROGRAMMES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Welding",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational/skills programme. Entry requirements and duration depend on the specific occupational programme and intake."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Bricklaying",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational/skills programme. Entry requirements and duration depend on the specific occupational programme and intake."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Plumbing",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational/skills programme. Entry requirements and duration depend on the specific occupational programme and intake."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Early Childhood Development",
    qualification_type: "Occupational",
    duration: "Programme specific",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational programme. Entry requirements, duration and campus availability depend on the specific intake."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedThekwini = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of THEKWINI_COURSES) {
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
      `Thekwini TVET College seeded successfully: ${THEKWINI_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Thekwini TVET College:",
      error
    );

    throw error;
  }
};

export default THEKWINI_COURSES;