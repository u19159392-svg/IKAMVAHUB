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

const capricornCourses: CourseSeed[] = [

  // ============================================================
  // BUSINESS STUDIES - NATED
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
  },

  {
    institution_type: "Business Studies",
    faculty: "Business Studies",
    qualification: "Public Management",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification. Each level is generally one semester."
  },

  // ============================================================
  // ENGINEERING STUDIES - NATED
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical Engineering",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 requires the relevant recognised prerequisite qualification. Engineering students are required to register for Mathematics rather than Mathematical Literacy."
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
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 requires the relevant recognised prerequisite qualification. Engineering students are required to register for Mathematics rather than Mathematical Literacy."
  },

  // ============================================================
  // GENERAL & UTILITY STUDIES - NATED
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Hospitality and Catering",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Tourism",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
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
      "Entry to N4 generally requires Grade 12/National Senior Certificate, NC(V) Level 4, N3 or an equivalent recognised qualification."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Farming Management and Mechanization",
    qualification_type: "NATED",
    duration: "N4-N6",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    additional_requirements:
      "Entry to N4 generally requires the relevant recognised prerequisite qualification."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent. The programme consists of three fundamental subjects and four vocational subjects."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Marketing",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: "English First Additional Language is compulsory",
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Finance, Economics and Accounting",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: "English First Additional Language is compulsory",
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Office Administration",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: "English First Additional Language is compulsory",
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Information Technology and Computer Science",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: "English First Additional Language is compulsory",
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Business Studies",
    qualification: "Transport and Logistics",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: "English First Additional Language is compulsory",
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  // ============================================================
  // NC(V) - ENGINEERING STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Electrical Infrastructure Construction",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics rather than Mathematical Literacy. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "Engineering Studies",
    qualification: "Civil Engineering and Building Construction",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics rather than Mathematical Literacy. Entry to Level 2 requires Grade 9 or equivalent."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics. Entry to Level 2 requires Grade 9 or equivalent."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics. Entry to Level 2 requires Grade 9 or equivalent."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Entry to Level 2 requires Grade 9 or equivalent."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics. Entry to Level 2 requires Grade 9 or equivalent."
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
    english_fal: "English First Additional Language is compulsory",
    mathematics: "Mathematics is compulsory for Engineering students",
    mathematical_literacy: null,
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years. Engineering students must register for Mathematics. Entry to Level 2 requires Grade 9 or equivalent."
  },

  // ============================================================
  // NC(V) - GENERAL & UTILITY STUDIES
  // ============================================================

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Primary Agriculture",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Hospitality",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Tourism",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Safety in Society",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  },

  {
    institution_type: "TVET College",
    faculty: "General and Utility Studies",
    qualification: "Education and Development",
    qualification_type: "NC(V)",
    duration: "3 years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: "English First Additional Language is compulsory",
    mathematics: null,
    mathematical_literacy: "Mathematics or Mathematical Literacy",
    additional_requirements:
      "NC(V) Levels 2, 3 and 4 are completed over three years, one full year per level. Entry to Level 2 requires Grade 9 or equivalent."
  }
];


// ============================================================
// SEED FUNCTION
// ============================================================

export const seedCapricorn = async (db: SQLite.SQLiteDatabase) => {
  try {
    for (const course of capricornCourses) {
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
      `Capricorn TVET College seeded successfully: ${capricornCourses.length} courses`
    );
  } catch (error) {
    console.error("Error seeding Capricorn TVET College:", error);
    throw error;
  }
};

export default capricornCourses;