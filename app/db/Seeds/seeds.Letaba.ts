import * as SQLite from "expo-sqlite";

// ======================================================
// LETABA TVET COLLEGE
// ======================================================

export const LETABA_COURSES = [

  // ======================================================
  // BUSINESS STUDIES (NATED)
  // ======================================================

  {
    faculty: "Business Studies",
    qualification: "Business Management N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Financial Management N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Human Resource Management N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Management Assistant N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Marketing Management N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Public Management N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Hospitality N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Business Studies",
    qualification: "Tourism N4–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Grade 12 or N3.",
    apply_url: "https://letcol.co.za/",
  },

  // ======================================================
  // ENGINEERING STUDIES (NATED)
  // ======================================================

  {
    faculty: "Engineering Studies",
    qualification: "Civil Engineering N1–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Required",
    mathematical_literacy: null,
    physical_sciences: "Required",
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 12 with Mathematics & Physical Sciences or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Engineering Studies",
    qualification: "Electrical Engineering N1–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Required",
    mathematical_literacy: null,
    physical_sciences: "Required",
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 12 with Mathematics & Physical Sciences or N3.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Engineering Studies",
    qualification: "Mechanical Engineering N1–N6",
    qualification_type: "NATED (Report 191)",
    duration: "18 Months",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: "Required",
    mathematical_literacy: null,
    physical_sciences: "Required",
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 12 with Mathematics & Physical Sciences or N3.",
    apply_url: "https://letcol.co.za/",
  },

  // ======================================================
  // NATIONAL CERTIFICATE (VOCATIONAL) - NC(V)
  // ======================================================

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Office Administration",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Finance, Economics & Accounting",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Management",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Information Technology & Computer Science",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Tourism",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Hospitality",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Civil Engineering & Building Construction",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Engineering & Related Design",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "National Certificate (Vocational)",
    qualification: "Electrical Infrastructure Construction",
    qualification_type: "NC(V)",
    duration: "3 Years",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Grade 9 or higher. National Certificate (Vocational) Level 2–4.",
    apply_url: "https://letcol.co.za/",
  },

  // ======================================================
  // OCCUPATIONAL PROGRAMMES & SKILLS TRAINING
  // ======================================================

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Artisan Development",
    qualification_type: "Occupational Programme",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Artisan development programme.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Apprenticeships",
    qualification_type: "Occupational Programme",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Apprenticeship programme.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Learnerships",
    qualification_type: "Learnership",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Learnership programme.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Skills Programmes",
    qualification_type: "Skills Programme",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Skills programme.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Short Courses",
    qualification_type: "Short Course",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Short course requirements not specified.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Trade Test Preparation",
    qualification_type: "Skills Programme",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Trade test preparation.",
    apply_url: "https://letcol.co.za/",
  },

  {
    faculty: "Occupational Programmes & Skills Training",
    qualification: "Entrepreneurship Development",
    qualification_type: "Skills Programme",
    duration: "Not Specified",
    minimum_aps: null,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Entrepreneurship development programme.",
    apply_url: "https://letcol.co.za/",
  },
];


// ======================================================
// SEED LETABA TVET COLLEGE
// ======================================================

export const seedLetaba = async (
  db: SQLite.SQLiteDatabase
) => {
  const college = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    ["Letaba TVET College"]
  );

  if (!college) {
    throw new Error("Letaba TVET College not found.");
  }

  const institutionId = college.id;

  for (const course of LETABA_COURSES) {
    const existing = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM courses
       WHERE institution_id = ?
       AND qualification = ?`,
      [institutionId, course.qualification]
    );

    if (existing) {
      continue;
    }

    await db.runAsync(
      `INSERT INTO courses (
        institution_id,
        institution_type,
        faculty,
        qualification,
        qualification_type,
        duration,
        province,
        minimum_aps,
        fps,
        english_hl,
        english_fal,
        mathematics,
        mathematical_literacy,
        physical_sciences,
        life_sciences,
        nbt,
        additional_requirements,
        apply_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        "tvet",
        course.faculty,
        course.qualification,
        course.qualification_type,
        course.duration,
        "Limpopo",
        course.minimum_aps,
        course.fps,
        course.english_hl,
        course.english_fal,
        course.mathematics,
        course.mathematical_literacy,
        course.physical_sciences,
        course.life_sciences,
        course.nbt,
        course.additional_requirements,
        course.apply_url,
      ],
    );
  }

  console.log(
    `Letaba TVET College seeded: ${LETABA_COURSES.length} programmes.`
  );
};