import * as SQLite from "expo-sqlite";

// ======================================================
// MANGOSUTHU UNIVERSITY OF TECHNOLOGY (MUT)
// ======================================================

export const MUT_COURSES = [

  // ======================================================
  // FACULTY OF ENGINEERING
  // ======================================================

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Chemical Engineering",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25. Engineering requirements apply.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Civil Engineering",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25. Engineering requirements apply.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Electrical Engineering",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25. Engineering requirements apply.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Mechanical Engineering",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25. Engineering requirements apply.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Construction Management",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: null,
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "English Level 4, Mathematics Level 4 and Physical Sciences Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Engineering",
    qualification: "Diploma in Quantity Surveying",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: null,
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "English Level 4, Mathematics Level 4 and Physical Sciences Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // FACULTY OF APPLIED AND HEALTH SCIENCES
  // ======================================================

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Agriculture",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 4",
    physical_sciences: "Level 3",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements: "Agricultural Science Level 4 OR Life Sciences Level 4. Mathematics Level 3 OR Mathematical Literacy Level 4. Physical Sciences Level 3.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Analytical Chemistry",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: null,
    nbt: null,
    additional_requirements: "English Level 4, Mathematics Level 4 and Physical Sciences Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Biomedical Sciences",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: "Level 4 (50%)",
    life_sciences: "Level 4 (50%)",
    nbt: null,
    additional_requirements: "Life Sciences Level 4 OR Physical Sciences Level 4. Entrance Test required.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Community Extension",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Faculty admission requirements.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Information Technology",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 4 (50%)",
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "English Level 4 and Mathematics Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Diploma in Nature Conservation",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements: "Life Sciences OR Agricultural Science Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Bachelor of Science in Environmental Health",
    qualification_type: "Bachelor's Degree",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Faculty selection requirements.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Bachelor of Health Sciences in Medical Laboratory Science",
    qualification_type: "Bachelor's Degree",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Faculty selection requirements.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Bachelor of Applied Science in Nature Conservation",
    qualification_type: "Bachelor's Degree",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Faculty selection requirements.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Advanced Diploma in Agriculture (Crop Production)",
    qualification_type: "Advanced Diploma",
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
    additional_requirements: "Relevant Diploma.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Advanced Diploma in Agriculture (Animal Production)",
    qualification_type: "Advanced Diploma",
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
    additional_requirements: "Relevant Diploma.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Advanced Diploma in Analytical Chemistry",
    qualification_type: "Advanced Diploma",
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
    additional_requirements: "Relevant Diploma.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Advanced Diploma in ICT (Applications Development)",
    qualification_type: "Advanced Diploma",
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
    additional_requirements: "Relevant Diploma.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Advanced Diploma in Nature Conservation",
    qualification_type: "Advanced Diploma",
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
    additional_requirements: "Relevant Diploma.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Postgraduate Diploma in Nature Conservation",
    qualification_type: "Postgraduate Diploma",
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
    additional_requirements: "Relevant Bachelor's Degree.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Applied and Health Sciences",
    qualification: "Master of Nature Conservation",
    qualification_type: "Master's Degree",
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
    additional_requirements: "Relevant Honours Degree.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // FACULTY OF MANAGEMENT SCIENCES
  // DEPARTMENT OF ACCOUNTING AND LAW
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Accounting and Law",
    qualification: "Diploma in Accounting",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 6",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 4. Mathematics Level 3 OR Mathematical Literacy Level 6.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Management Sciences - Department of Accounting and Law",
    qualification: "Diploma in Cost and Management Accounting",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 6",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 4. Mathematics Level 3 OR Mathematical Literacy Level 6.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Management Sciences - Department of Accounting and Law",
    qualification: "Diploma in Local Government Finance",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 6",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 4. Mathematics Level 3 OR Mathematical Literacy Level 6.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Management Sciences - Department of Accounting and Law",
    qualification: "Diploma in Public Finance and Accounting",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 6",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 4. Mathematics Level 3 OR Mathematical Literacy Level 6.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // DEPARTMENT OF HUMAN RESOURCE MANAGEMENT
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Human Resource Management",
    qualification: "Diploma in Human Resource Management",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4 (50%)",
    english_fal: "Level 4 (50%)",
    mathematics: "Level 3",
    mathematical_literacy: "Level 4",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 4. Mathematics Level 3 OR Mathematical Literacy Level 4.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // DEPARTMENT OF MARKETING
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Marketing",
    qualification: "Diploma in Marketing",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // DEPARTMENT OF OFFICE MANAGEMENT AND TECHNOLOGY
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Office Management and Technology",
    qualification: "Diploma in Office Management and Technology",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // DEPARTMENT OF PUBLIC ADMINISTRATION AND ECONOMICS
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Public Administration and Economics",
    qualification: "Diploma in Public Administration",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Management Sciences - Department of Public Administration and Economics",
    qualification: "Diploma in Public Management",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },

  {
    faculty: "Faculty of Management Sciences - Department of Public Administration and Economics",
    qualification: "Diploma in Public Relations Management",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },

  // ======================================================
  // DEPARTMENT OF COMMUNICATION
  // ======================================================

  {
    faculty: "Faculty of Management Sciences - Department of Communication",
    qualification: "Diploma in Communication",
    qualification_type: "Diploma",
    duration: "Not Specified",
    minimum_aps: 25,
    fps: null,
    english_hl: null,
    english_fal: null,
    mathematics: null,
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Minimum CAO points: 25.",
    apply_url: "https://www.mut.ac.za",
  },
];


// ======================================================
// SEED MUT
// ======================================================

export const seedMUT = async (db: SQLite.SQLiteDatabase) => {
  const mut = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    ["Mangosuthu University of Technology"]
  );

  if (!mut) {
    throw new Error("Mangosuthu University of Technology not found.");
  }

  const institutionId = mut.id;

  for (const course of MUT_COURSES) {
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
        "university",
        course.faculty,
        course.qualification,
        course.qualification_type,
        course.duration,
        "KwaZulu-Natal",
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
    `MUT seeded: ${MUT_COURSES.length} courses across faculties.`
  );
};