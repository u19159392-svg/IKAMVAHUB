import * as SQLite from "expo-sqlite";
import { seedUCT } from "./Seeds/seeds.UCT";

// Second database for reference data
const refDb = SQLite.openDatabaseSync("reference.db");

export const initReferenceDatabase = async () => {
  try {
    await refDb.execAsync(`
      -- SCHOOLS TABLE
      CREATE TABLE IF NOT EXISTS schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        province TEXT NOT NULL,
        type TEXT NOT NULL,
        location TEXT,
        contact TEXT,
        email TEXT,
        subjects_offered TEXT,
        sports TEXT,
        extracurricular TEXT,
        facilities TEXT
      );

      -- SCHOOL CONTACTS TABLE
      CREATE TABLE IF NOT EXISTS school_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_id INTEGER,
        phone TEXT,
        address TEXT,
        email TEXT,
        website TEXT,
        FOREIGN KEY (school_id) REFERENCES schools (id) ON DELETE CASCADE
      );

      -- CAREERS TABLE
      CREATE TABLE IF NOT EXISTS careers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        field TEXT,
        description TEXT,
        subjects_needed TEXT,
        study_path TEXT,
        institutions TEXT,
        aps_range TEXT
      );

      -- INDUSTRIES TABLE
      CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sector TEXT,
        location TEXT,
        specialization TEXT,
        jobs_available TEXT,
        factories TEXT
      );

      -- SUBJECTS TABLE
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        stream TEXT
      );

      -- UNIVERSITIES TABLE
      CREATE TABLE IF NOT EXISTS universities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        province TEXT,
        website TEXT,
        contact TEXT,
        minimum_aps INTEGER,
        image_url TEXT
      );

      -- TVET COLLEGES TABLE
      CREATE TABLE IF NOT EXISTS tvet_colleges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        province TEXT,
        website TEXT,
        contact TEXT,
        type TEXT,
        image_url TEXT
      );

      -- COURSES TABLE
      CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    institution_type TEXT NOT NULL,
    faculty TEXT NOT NULL,
    qualification TEXT NOT NULL,
    qualification_type TEXT NOT NULL,
    duration TEXT NOT NULL,
    province TEXT NOT NULL,
    minimum_aps INTEGER,
    fps TEXT,
    english_hl TEXT,
    english_fal TEXT,
    mathematics TEXT,
    mathematical_literacy TEXT,
    physical_sciences TEXT,
    life_sciences TEXT,
    nbt TEXT,
    additional_requirements TEXT,
    apply_url TEXT,
    FOREIGN KEY (institution_id) REFERENCES universities(id)
);

      -- SCHOLARSHIPS TABLE
      CREATE TABLE IF NOT EXISTS scholarships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        provider TEXT,
        amount TEXT,
        eligibility TEXT,
        closing_date TEXT,
        apply_link TEXT,
        field_of_study TEXT
      );

      -- BURSARIES TABLE
      CREATE TABLE IF NOT EXISTS bursaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        provider TEXT,
        amount TEXT,
        eligibility TEXT,
        closing_date TEXT,
        apply_link TEXT,
        field_of_study TEXT
      );

      -- MENTORS TABLE
      CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        field TEXT NOT NULL,
        bio TEXT,
        phone TEXT,
        email TEXT,
        profile_pic TEXT,
        availability TEXT
      );

      -- APS RULES TABLE
      CREATE TABLE IF NOT EXISTS aps_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        min_percentage INTEGER NOT NULL,
        max_percentage INTEGER NOT NULL,
        points INTEGER NOT NULL
      );
    `);
// Seed the reference database
await seedReferenceDatabase();

console.log("✅ Reference database seeded successfully");
    console.log("✅ Reference database initialized");
  } catch (error) {
    console.error("❌ Reference database init error:", error);
  }
};

// ==================== SCHOOL FUNCTIONS ====================
export const getSchools = async () => {
  try {
    return await refDb.getAllAsync("SELECT * FROM schools ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get schools error:", error);
    return [];
  }
};

export const searchSchools = async (query: string) => {
  try {
    return await refDb.getAllAsync("SELECT * FROM schools WHERE name LIKE ?", [
      `%${query}%`,
    ]);
  } catch (error) {
    console.error("❌ Search schools error:", error);
    return [];
  }
};

export const filterSchools = async (province: string, type: string) => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM schools WHERE province LIKE ? AND type LIKE ?",
      [`%${province}%`, `%${type}%`],
    );
  } catch (error) {
    console.error("❌ Filter schools error:", error);
    return [];
  }
};

export const getSchoolById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM schools WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get school by ID error:", error);
    return null;
  }
};

export const getSchoolContacts = async (schoolId: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM school_contacts WHERE school_id = ?",
      [schoolId],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get school contacts error:", error);
    return null;
  }
};

// ==================== CAREER FUNCTIONS ====================
export const getCareers = async () => {
  try {
    return await refDb.getAllAsync("SELECT * FROM careers ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get careers error:", error);
    return [];
  }
};

export const getCareerById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM careers WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get career by ID error:", error);
    return null;
  }
};

export const searchCareers = async (query: string) => {
  try {
    return await refDb.getAllAsync("SELECT * FROM careers WHERE name LIKE ?", [
      `%${query}%`,
    ]);
  } catch (error) {
    console.error("❌ Search careers error:", error);
    return [];
  }
};

// ==================== INDUSTRY FUNCTIONS ====================
export const getIndustries = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM industries ORDER BY name ASC",
    );
  } catch (error) {
    console.error("❌ Get industries error:", error);
    return [];
  }
};

// ==================== SUBJECT FUNCTIONS ====================
export const getSubjects = async () => {
  try {
    return await refDb.getAllAsync("SELECT * FROM subjects ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get subjects error:", error);
    return [];
  }
};

export const getSubjectsByStream = async (stream: string) => {
  try {
    return await refDb.getAllAsync("SELECT * FROM subjects WHERE stream = ?", [
      stream,
    ]);
  } catch (error) {
    console.error("❌ Get subjects by stream error:", error);
    return [];
  }
};

// ==================== UNIVERSITY FUNCTIONS ====================
export const testUniversities = async () => {
  const data = await refDb.getAllAsync(
    "SELECT * FROM universities"
  );

  console.log("🏛 Universities:", data);

  return data;
};
export const getUniversities = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM universities ORDER BY name ASC",
    );
  } catch (error) {
    console.error("❌ Get universities error:", error);
    return [];
  }
};

export const getUniversityById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM universities WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get university error:", error);
    return null;
  }
};

export const getCoursesByInstitution = async (
  institutionId: number,
  institutionType: string,
) => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM courses WHERE institution_id = ? AND institution_type = ?",
      [institutionId, institutionType],
    );
  } catch (error) {
    console.error("❌ Get courses error:", error);
    return [];
  }
};

// ==================== TVET COLLEGE FUNCTIONS ====================
export const getTvetColleges = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM tvet_colleges ORDER BY name ASC",
    );
  } catch (error) {
    console.error("❌ Get TVET colleges error:", error);
    return [];
  }
};

export const getTvetCollegeById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM tvet_colleges WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get TVET college error:", error);
    return null;
  }
};

// ==================== SCHOLARSHIP FUNCTIONS ====================
export const getScholarships = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM scholarships ORDER BY closing_date ASC",
    );
  } catch (error) {
    console.error("❌ Get scholarships error:", error);
    return [];
  }
};

export const getScholarshipById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM scholarships WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get scholarship error:", error);
    return null;
  }
};

// ==================== BURSARY FUNCTIONS ====================
export const getBursaries = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM bursaries ORDER BY closing_date ASC",
    );
  } catch (error) {
    console.error("❌ Get bursaries error:", error);
    return [];
  }
};

export const getBursaryById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM bursaries WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get bursary error:", error);
    return null;
  }
};

// ==================== MENTOR FUNCTIONS ====================
export const getMentors = async () => {
  try {
    return await refDb.getAllAsync("SELECT * FROM mentors ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get mentors error:", error);
    return [];
  }
};

export const getMentorById = async (id: number) => {
  try {
    const result = await refDb.getAllAsync(
      "SELECT * FROM mentors WHERE id = ?",
      [id],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get mentor error:", error);
    return null;
  }
};

export const filterMentorsByField = async (field: string) => {
  try {
    return await refDb.getAllAsync("SELECT * FROM mentors WHERE field = ?", [
      field,
    ]);
  } catch (error) {
    console.error("❌ Filter mentors by field error:", error);
    return [];
  }
};

// ==================== APS FUNCTIONS ====================
export const getApsPoints = (percentage: number): number => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
};

// ==================== SEED FUNCTIONS ====================
export const seedReferenceDatabase = async () => {
  try {

    const existingCourses = await refDb.getAllAsync(
  "SELECT * FROM courses"
);

console.log(existingCourses);
console.log("Number of courses:", existingCourses.length);

console.log("Total courses in database:", existingCourses.length);

    if (existingCourses.length > 0) {
      console.log("ℹ️ Courses already seeded");
      return;
    }

    console.log("🌱 Checking reference database...");

    await seedUCT(refDb);

    // ===== APS RULES =====
    await refDb.runAsync(`
      INSERT INTO aps_rules (min_percentage, max_percentage, points) VALUES
      (80, 100, 7),
      (70, 79, 6),
      (60, 69, 5),
      (50, 59, 4),
      (40, 49, 3),
      (30, 39, 2),
      (0, 29, 1)
    `);

    // ===== SCHOOLS =====
    const schools = [
      ["Baleni Secondary School", "Eastern Cape", "Public", "Bizana", "", ""],
      [
        "Tyelimhlophe Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      [
        "Toleni Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      ["Bonxa High School", "Eastern Cape", "Public", "Tabankulu", "", ""],
      [
        "Dumsi Senior Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
    ];

    for (const school of schools) {
      await refDb.runAsync(
        "INSERT INTO schools (name, province, type, location, contact, email) VALUES (?, ?, ?, ?, ?, ?)",
        school,
      );
    }

    // ===== CAREERS =====
    const careers = [
      {
        name: "General Practitioner",
        field: "Science & Health Sciences",
        description: "Diagnoses and treats common illnesses.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "MBChB → Internship → Community Service → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand",
        aps_range: "42-46+",
      },
      {
        name: "Registered Nurse",
        field: "Science & Health Sciences",
        description: "Provides patient care and administers medication.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Diploma in Nursing → Registration with SANC",
        institutions:
          "University of Fort Hare, Walter Sisulu University, Nelson Mandela University",
        aps_range: "30-34+",
      },
    ];

    for (const career of careers) {
      await refDb.runAsync(
        "INSERT INTO careers (name, field, description, subjects_needed, study_path, institutions, aps_range) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          career.name,
          career.field,
          career.description,
          career.subjects_needed,
          career.study_path,
          career.institutions,
          career.aps_range,
        ],
      );
    }

    // ===== INDUSTRIES =====
    const industries = [
      [
        "Automotive Manufacturing",
        "Manufacturing",
        "Gqeberha, Kariega, East London",
        "Vehicle assembly, car parts production",
        "Mechanical Engineer, Technician, Machine Operator",
        "Volkswagen, Isuzu, Mercedes-Benz",
      ],
      [
        "Agriculture",
        "Agriculture",
        "Sundays River Valley, Mthatha",
        "Citrus farming, dairy, livestock",
        "Farm Manager, Agricultural Technician, Worker",
        "Clover, Woodlands Dairy",
      ],
    ];

    for (const industry of industries) {
      await refDb.runAsync(
        "INSERT INTO industries (name, sector, location, specialization, jobs_available, factories) VALUES (?, ?, ?, ?, ?, ?)",
        industry,
      );
    }

    // ===== SUBJECTS =====
    const subjects = [
      ["Mathematics", "Science"],
      ["Physical Sciences", "Science"],
      ["Life Sciences", "Science"],
      ["English", "Arts"],
      ["History", "Arts"],
      ["Accounting", "Commerce"],
      ["Business Studies", "Commerce"],
    ];

    for (const subject of subjects) {
      await refDb.runAsync(
        "INSERT INTO subjects (name, stream) VALUES (?, ?)",
        subject,
      );
    }

    // ===== UNIVERSITIES =====
    const universities = [
      [
        "University of Cape Town",
        "Western Cape",
        "www.uct.ac.za",
        "021 650 9111",
        5,
        "",
      ],
      [
        "University of Pretoria",
        "Gauteng",
        "www.up.ac.za",
        "012 420 3111",
        5,
        "",
      ],
      [
        "Stellenbosch University",
        "Western Cape",
        "www.sun.ac.za",
        "021 808 9111",
        5,
        "",
      ],
    ];

    for (const uni of universities) {
      await refDb.runAsync(
        "INSERT INTO universities (name, province, website, contact, minimum_aps, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        uni,
      );
    }

    // ===== TVET COLLEGES =====
    const tvetColleges = [
      [
        "Buffalo City TVET College",
        "Eastern Cape",
        "www.bccollege.co.za",
        "043 704 9800",
        "Public",
        "",
      ],
      [
        "Port Elizabeth TVET College",
        "Eastern Cape",
        "www.pecollege.edu.za",
        "041 509 9000",
        "Public",
        "",
      ],
    ];

    for (const college of tvetColleges) {
      await refDb.runAsync(
        "INSERT INTO tvet_colleges (name, province, website, contact, type, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        college,
      );
    }

    // ===== COURSES =====
    const courses = [
      [
        1,
        "university",
        "Commerce",
        "Bachelor of Business Science specialising in Computer Science",
        "Bachelor's Degree",
        "4 Years",
        "Western Cape",
        36,
        "50%",
        "60%",
        "70%",
        "No",
        "",
        "",
        "Upper Intermediate (AL & QL)",
        "Mathematical Studies and Maths Main are not accepted.",
        "https://applyonline.uct.ac.za"
      ],
    ];

    for (const course of courses) {
      await refDb.runAsync(
        `INSERT INTO courses (
          institution_id,
          institution_type,
          faculty,
          qualification,
          qualification_type,
          duration,
          province,
          minimum_aps,
          english_hl,
          english_fal,
          mathematics,
          mathematical_literacy,
          physical_sciences,
          life_sciences,
          nbt,
          additional_requirements,
          apply_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        course,
      );
    }

    // ===== SCHOLARSHIPS =====
    const scholarships = [
      [
        "ABSA Bursary",
        "ABSA Bank",
        "R50,000",
        "South African citizen, good academic record",
        "2025-09-30",
        "www.absa.co.za",
        "Business",
      ],
      [
        "Sasol Bursary",
        "Sasol",
        "Full tuition",
        "STEM students",
        "2025-10-15",
        "www.sasol.com",
        "Engineering",
      ],
    ];

    for (const scholarship of scholarships) {
      await refDb.runAsync(
        "INSERT INTO scholarships (name, provider, amount, eligibility, closing_date, apply_link, field_of_study) VALUES (?, ?, ?, ?, ?, ?, ?)",
        scholarship,
      );
    }

    // ===== BURSARIES =====
    const bursaries = [
      [
        "Funza Lushaka Bursary",
        "Department of Basic Education",
        "Full tuition",
        "Students pursuing teaching",
        "2025-10-31",
        "www.funzalushaka.gov.za",
        "Education",
      ],
      [
        "NSFAS Bursary",
        "NSFAS",
        "Full tuition",
        "South African citizen, financial need",
        "2025-11-30",
        "www.nsfas.org.za",
        "All fields",
      ],
    ];

    for (const bursary of bursaries) {
      await refDb.runAsync(
        "INSERT INTO bursaries (name, provider, amount, eligibility, closing_date, apply_link, field_of_study) VALUES (?, ?, ?, ?, ?, ?, ?)",
        bursary,
      );
    }

    // ===== MENTORS =====
    const mentors = [
      [
        "Sipho Dlamini",
        "Engineering",
        "Experienced mechanical engineer mentoring students in STEM fields.",
        "012 345 6789",
        "sipho.dlamini@example.com",
        "https://example.com/sipho.jpg",
        "Mon-Fri 9am-5pm",
      ],
      [
        "Anele Khumalo",
        "Business",
        "Career coach focusing on business and finance careers.",
        "098 765 4321",
        "anele.khumalo@example.com",
        "https://example.com/anele.jpg",
        "Weekends 10am-2pm",
      ],
    ];
  
    for (const mentor of mentors) {
      await refDb.runAsync(
        "INSERT INTO mentors (name, field, bio, phone, email, profile_pic, availability) VALUES (?, ?, ?, ?, ?, ?, ?)",
        mentor,
      );
    }

    console.log("✅ Reference database seeded successfully");
  } catch (error) {
    console.error("❌ Seed reference database error:", error);
  }
};

export default refDb;
// ==================== GET COURSES BY UNIVERSITY ====================

export const getCoursesByUniversity = async (
  universityId: number
) => {
  try {
    console.log("🔍 Searching for university ID:", universityId);

    const allCourses = await refDb.getAllAsync(`
      SELECT id, institution_id, faculty, qualification
      FROM courses
    `);

    console.log("📚 ALL COURSES:", allCourses);

    const courses = await refDb.getAllAsync(
      `
      SELECT *
      FROM courses
      WHERE institution_id = ?
      ORDER BY faculty, qualification
      `,
      [universityId]
    );

    console.log("✅ MATCHING COURSES:", courses);

    return courses;
  } catch (error) {
    console.error("❌ Error getting courses:", error);
    return [];
  }
};