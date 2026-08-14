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

const GOLDFIELDS_COURSES: CourseSeed[] = [

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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 or equivalent qualification for N4 admission. N4-N6 Business Studies. The full NATED route includes theoretical studies and relevant workplace application."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Educare",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 or equivalent qualification for N4 admission. N4-N6 Business/Utility Studies."
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
      "Grade 12 or equivalent qualification for N4 admission. N4-N6. Students should meet the subject requirements applicable to the programme."
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
      "Grade 12 or equivalent qualification for N4 admission. N4-N6 Business Studies."
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
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Grade 12 or equivalent qualification for N4 admission. N4-N6 Business Studies."
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
      "Grade 12 or equivalent qualification for N4 admission. N4-N6 Business Studies."
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
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "N1 admission generally requires Grade 9 or equivalent. N4 admission requires an appropriate NC(V) Level 4 Engineering certificate, National Certificate N3 Engineering Studies, an equivalent occupational qualification, or another recognised admission route. Goldfields also provides an APS-based route for N4 Engineering admission."
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
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "N1 admission generally requires Grade 9 or equivalent. N4 admission requires an appropriate NC(V) Level 4 Engineering certificate, National Certificate N3 Engineering Studies, an equivalent occupational qualification, or another recognised admission route."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or equivalent for N1 admission. Engineering admission requirements include Mathematics/Mathematical Literacy and English requirements. Goldfields lists Civil Engineering through the Tosa Campus."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering: Plumbing",
    qualification_type: "NATED",
    duration: "N1-N3",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or equivalent for N1 admission. Engineering admission requirements apply. Goldfields lists Civil Engineering: Plumbing at the Tosa Campus."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Multi-Disciplinary Draughting Office Practice (MDDOP)",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "N4 admission requires an appropriate recognised prerequisite qualification. The programme is offered at N4-N6 at Goldfields Tosa Campus."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering & Related Design",
    qualification_type: "NATED",
    duration: "N1-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English",
    mathematics: "Mathematics",
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "N1 admission generally requires Grade 9 or equivalent. Higher N-level admission requires the applicable recognised prerequisite qualification. Goldfields lists Engineering & Related Design at N1-N6."
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
    english_fal: "50% in English First Additional Language",
    mathematics: "50% in Mathematics where applicable",
    mathematical_literacy: "50% in Mathematical Literacy where applicable",
    additional_requirements:
      "Entry to NC(V) Level 2 can be through a Grade 9 statement with at least 50% in Mathematics or Mathematical Literacy and English FAL; AET Level 4 with the same subject requirements; a PLP certificate with the required passes; an equivalent occupational qualification; RPL; or applicable APS routes. NC(V) consists of Levels 2, 3 and 4, one year per level."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Drawing Office Practice",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: "50% in Mathematics where applicable",
    mathematical_literacy: "50% in Mathematical Literacy where applicable",
    additional_requirements:
      "Entry to NC(V) Level 2 requires Grade 9 or an accepted equivalent route. Goldfields' published admission requirements include the Grade 9, AET, PLP, occupational qualification, RPL and APS routes."
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
    english_fal: "50% in English First Additional Language",
    mathematics: "50% in Mathematics where applicable",
    mathematical_literacy: "50% in Mathematical Literacy where applicable",
    additional_requirements:
      "Entry to NC(V) Level 2 requires Grade 9 or an accepted equivalent route. Engineering admission may require Mathematics or Mathematical Literacy and English FAL."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Engineering and Related Design",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: "50% in Mathematics where applicable",
    mathematical_literacy: "50% in Mathematical Literacy where applicable",
    additional_requirements:
      "Entry to NC(V) Level 2 requires Grade 9 or an accepted equivalent route. NC(V) Levels 2-4 are completed over three years."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Information Technology and Computer Science",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Entry to NC(V) Level 2 requires Grade 9 or an accepted equivalent route. The programme is offered at Tosa Campus and forms part of the NC(V) Level 2-4 structure."
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
    english_fal: "50% in English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Entry to NC(V) Level 2 requires Grade 9 or an accepted equivalent route. Mathematics and English requirements apply. Mechatronics is also recognised as one of the NC(V) Level 4 certificates that can provide an admission route into N4 Engineering Studies."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Primary Agriculture",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: null,
    mathematical_literacy: "50% in Mathematical Literacy where applicable",
    additional_requirements:
      "Grade 9 or equivalent accepted route for NC(V) Level 2. NC(V) Levels 2-4 are completed over three years."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Process Instrumentation",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 or equivalent accepted route for NC(V) Level 2. Process Instrumentation is included among the recognised NC(V) Level 4 certificates for the N4 Engineering admission route."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Process Plant Operations",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "50% in English First Additional Language",
    mathematics: "Mathematics",
    mathematical_literacy: null,
    additional_requirements:
      "Grade 9 or equivalent accepted route for NC(V) Level 2. Process Plant Operations is included among the recognised NC(V) Level 4 certificates for the N4 Engineering admission route."
  },


  // ============================================================
  // NC(V) - BUSINESS STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Finance, Economics and Accounting",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy / Mathematics",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
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
    mathematical_literacy: "Mathematical Literacy / Mathematics",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
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
    mathematical_literacy: "Mathematical Literacy / Mathematics",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
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
    mathematical_literacy: "Mathematical Literacy",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
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
    mathematical_literacy: "Mathematical Literacy / Mathematics",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Transport and Logistics",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language",
    mathematics: null,
    mathematical_literacy: "Mathematical Literacy / Mathematics",
    additional_requirements:
      "Grade 9 or equivalent. Goldfields' published NC(V) entry requirements include Grade 9 with Mathematics or Mathematical Literacy and English FAL. NC(V) Levels 2-4 are completed over three years."
  },


  // ============================================================
  // OCCUPATIONAL PROGRAMMES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Early Childhood Development Practitioner",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Hairdresser",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Bookkeeper",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Tourist Information Officer",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Office Administrator",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Chef",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Plumber",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Electrician",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Welder",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  },

  {
    institution_type: "TVET College",
    faculty: "Occupational Programmes",
    qualification: "Occupational Certificate: Solar Photo Voltaic Technician",
    qualification_type: "Occupational",
    duration: "Specific to programme",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Occupational Certificate programme. Admission requirements are programme-specific."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedGoldfields = async (
  db: SQLite.SQLiteDatabase
) => {
  try {
    for (const course of GOLDFIELDS_COURSES) {
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
      `Goldfields TVET College seeded successfully: ${GOLDFIELDS_COURSES.length} courses`
    );
  } catch (error) {
    console.error(
      "Error seeding Goldfields TVET College:",
      error
    );

    throw error;
  }
};

export default GOLDFIELDS_COURSES;