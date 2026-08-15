import * as SQLite from "expo-sqlite";

import { seedCPUT } from "./Seeds/seeds.CPUT";
import { seedCUT } from "./Seeds/seeds.CUT";
import { seedMUT } from "./Seeds/seeds.MUT";
import { seedNMU } from "./Seeds/seeds.NMU";
import { seedNWU } from "./Seeds/seeds.NWU";
import { seedSPU } from "./Seeds/seeds.SPU";
import { seedTUT } from "./Seeds/seeds.TUT";
import { seedUCT } from "./Seeds/seeds.UCT";
import { seedUFH } from "./Seeds/seeds.UFH";
import { seedUFS } from "./Seeds/seeds.UFS";
import { seedUJ } from "./Seeds/seeds.UJ";
import { seedUKZN } from "./Seeds/seeds.UKZN";
import { seedUNISA } from "./Seeds/seeds.UNISA";
import { seedUNIVEN } from "./Seeds/seeds.UNIVEN";
import { seedUNW } from "./Seeds/seeds.UNW";
import { seedUP } from "./Seeds/seeds.UP";
import { seedUWC } from "./Seeds/seeds.UWC";
import { seedVUT } from "./Seeds/seeds.VUT";
import { seedWits } from "./Seeds/seeds.Wits";
import { seedWSU } from "./Seeds/seeds.WSU";

// Second database for reference data
const refDb = SQLite.openDatabaseSync("reference.db");

// ============================================================
// DATABASE INITIALIZATION
// ============================================================

export const initReferenceDatabase = async () => {
  try {
    await refDb.execAsync(`
      PRAGMA foreign_keys = ON;

      -- ======================================================
      -- SCHOOLS
      -- ======================================================
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

      -- ======================================================
      -- SCHOOL CONTACTS
      -- ======================================================
      CREATE TABLE IF NOT EXISTS school_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_id INTEGER,
        phone TEXT,
        address TEXT,
        email TEXT,
        website TEXT,
        FOREIGN KEY (school_id)
          REFERENCES schools(id)
          ON DELETE CASCADE
      );

      -- ======================================================
      -- CAREERS
      -- ======================================================
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

      -- ======================================================
      -- INDUSTRIES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sector TEXT,
        location TEXT,
        specialization TEXT,
        jobs_available TEXT,
        factories TEXT
      );

      -- ======================================================
      -- SUBJECTS
      -- ======================================================
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        stream TEXT
      );

      -- ======================================================
      -- UNIVERSITIES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS universities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        province TEXT,
        city TEXT,
        website TEXT,
        contact TEXT,
        minimum_aps INTEGER,
        image_url TEXT,
        description TEXT,
        application_open_date TEXT,
        application_close_date TEXT,
        application_link TEXT,
        prospectus_link TEXT
      );

      -- ======================================================
      -- TVET COLLEGES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS tvet_colleges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        province TEXT,
        website TEXT,
        contact TEXT,
        type TEXT,
        image_url TEXT
      );

      -- ======================================================
      -- COURSES
      -- ======================================================
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
        FOREIGN KEY (institution_id)
          REFERENCES universities(id)
          ON DELETE CASCADE
      );

      -- ======================================================
      -- SCHOLARSHIPS
      -- ======================================================
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

      -- ======================================================
      -- BURSARIES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS bursaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        provider TEXT,
        closing_date TEXT,
        apply_link TEXT
      );

      -- ======================================================
      -- BURSARY CATEGORIES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS bursary_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bursary_id INTEGER NOT NULL,
        category TEXT NOT NULL,
        FOREIGN KEY (bursary_id)
          REFERENCES bursaries(id)
          ON DELETE CASCADE
      );

      -- ======================================================
      -- MENTORS
      -- ======================================================
      CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        field TEXT NOT NULL,
        bio TEXT,
        phone TEXT,
        email TEXT,
        profile_pic TEXT,
        availability TEXT,
        faculty TEXT,
        course TEXT,
        years_of_study INTEGER
      );

      -- ======================================================
      -- APS RULES
      -- ======================================================
      CREATE TABLE IF NOT EXISTS aps_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        min_percentage INTEGER NOT NULL,
        max_percentage INTEGER NOT NULL,
        points INTEGER NOT NULL
      );
    `);

    console.log("✅ Reference database tables created");

    // Seed everything from THIS FILE
    await seedReferenceDatabase();

    console.log("✅ Reference database seeded successfully");
    console.log("✅ Reference database initialized");
  } catch (error) {
    console.error("❌ Reference database initialization error:", error);
  }
};

// ============================================================
// SCHOOL FUNCTIONS
// ============================================================

export const getSchools = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM schools ORDER BY name ASC",
    );
  } catch (error) {
    console.error("❌ Get schools error:", error);
    return [];
  }
};

export const searchSchools = async (query: string) => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM schools WHERE name LIKE ? ORDER BY name ASC",
      [`%${query}%`],
    );
  } catch (error) {
    console.error("❌ Search schools error:", error);
    return [];
  }
};

export const filterSchools = async (
  province: string,
  type: string,
) => {
  try {
    let query = "SELECT * FROM schools WHERE 1=1";
    const params: string[] = [];

    if (province && province !== "All") {
      query += " AND province = ?";
      params.push(province);
    }

    if (type && type !== "All") {
      query += " AND type = ?";
      params.push(type);
    }

    query += " ORDER BY name ASC";

    return await refDb.getAllAsync(query, params);
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

// ============================================================
// CAREER FUNCTIONS
// ============================================================

export const getCareers = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM careers ORDER BY name ASC",
    );
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
    return await refDb.getAllAsync(
      "SELECT * FROM careers WHERE name LIKE ? ORDER BY name ASC",
      [`%${query}%`],
    );
  } catch (error) {
    console.error("❌ Search careers error:", error);
    return [];
  }
};

// ============================================================
// INDUSTRY FUNCTIONS
// ============================================================

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

// ============================================================
// SUBJECT FUNCTIONS
// ============================================================

export const getSubjects = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM subjects ORDER BY name ASC",
    );
  } catch (error) {
    console.error("❌ Get subjects error:", error);
    return [];
  }
};

export const getSubjectsByStream = async (stream: string) => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM subjects WHERE stream = ? ORDER BY name ASC",
      [stream],
    );
  } catch (error) {
    console.error("❌ Get subjects by stream error:", error);
    return [];
  }
};

// ============================================================
// UNIVERSITY FUNCTIONS
// ============================================================

export const testUniversities = async () => {
  try {
    const data = await refDb.getAllAsync(
      "SELECT * FROM universities ORDER BY name ASC",
    );

    console.log("🏛 Universities:", data);

    return data;
  } catch (error) {
    console.error("❌ Test universities error:", error);
    return [];
  }
};

export const getUniversities = async () => {
  try {
    const data = await refDb.getAllAsync(
      "SELECT * FROM universities ORDER BY name ASC",
    );

    console.log("🏛 Universities loaded:", data.length);

    return data;
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

// ============================================================
// COURSE FUNCTIONS
// ============================================================

export const getCoursesByInstitution = async (
  institutionId: number,
  institutionType: string,
) => {
  try {
    return await refDb.getAllAsync(
      `SELECT *
       FROM courses
       WHERE institution_id = ?
       AND institution_type = ?
       ORDER BY faculty, qualification`,
      [institutionId, institutionType],
    );
  } catch (error) {
    console.error("❌ Get courses error:", error);
    return [];
  }
};

export const getCoursesByUniversity = async (
  universityId: number,
) => {
  try {
    console.log(
      "🔍 Searching courses for university ID:",
      universityId,
    );

    const courses = await refDb.getAllAsync(
      `SELECT *
       FROM courses
       WHERE institution_id = ?
       ORDER BY faculty, qualification`,
      [universityId],
    );

    console.log(
      "📚 Matching courses:",
      courses.length,
    );

    return courses;
  } catch (error) {
    console.error("❌ Get courses by university error:", error);
    return [];
  }
};

export const getAllCourses = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM courses ORDER BY qualification ASC",
    );
  } catch (error) {
    console.error("❌ Get all courses error:", error);
    return [];
  }
};

// ============================================================
// TVET COLLEGE FUNCTIONS
// ============================================================

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

// ============================================================
// SCHOLARSHIP FUNCTIONS
// ============================================================

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

// ============================================================
// BURSARY FUNCTIONS
// ============================================================

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

export const getBursaryCategories = async (
  bursaryId: number,
) => {
  try {
    return await refDb.getAllAsync(
      `SELECT category
       FROM bursary_categories
       WHERE bursary_id = ?
       ORDER BY category ASC`,
      [bursaryId],
    );
  } catch (error) {
    console.error("❌ Get bursary categories error:", error);
    return [];
  }
};

export const filterBursariesByCategory = async (
  category: string,
) => {
  try {
    return await refDb.getAllAsync(
      `SELECT DISTINCT b.*
       FROM bursaries b
       INNER JOIN bursary_categories bc
         ON b.id = bc.bursary_id
       WHERE bc.category = ?
       ORDER BY b.closing_date ASC`,
      [category],
    );
  } catch (error) {
    console.error(
      "❌ Filter bursaries by category error:",
      error,
    );
    return [];
  }
};

export const getBursaryCategoriesList = async () => {
  try {
    return await refDb.getAllAsync(
      `SELECT DISTINCT category
       FROM bursary_categories
       ORDER BY category ASC`,
    );
  } catch (error) {
    console.error(
      "❌ Get bursary categories error:",
      error,
    );
    return [];
  }
};

// ============================================================
// MENTOR FUNCTIONS
// ============================================================

export const getMentors = async () => {
  try {
    return await refDb.getAllAsync(
      "SELECT * FROM mentors ORDER BY name ASC",
    );
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
    console.error("❌ Get mentor by ID error:", error);
    return null;
  }
};

// ============================================================
// APS FUNCTIONS
// ============================================================

export const getApsPoints = (
  percentage: number,
): number => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;

  return 1;
};

// ============================================================
// SEED DATABASE
// EVERYTHING IS KEPT IN THIS FILE
// NO INDIVIDUAL SEED FILES REQUIRED
// ============================================================

export const seedReferenceDatabase = async () => {
  try {
    console.log("🌱 Starting reference database seed...");

    // ========================================================
    // APS RULES
    // ========================================================

    const apsExists = await refDb.getFirstAsync<{
      id: number;
    }>("SELECT id FROM aps_rules LIMIT 1");

    if (!apsExists) {
      await refDb.runAsync(`
        INSERT INTO aps_rules
        (min_percentage, max_percentage, points)
        VALUES
        (80, 100, 7),
        (70, 79, 6),
        (60, 69, 5),
        (50, 59, 4),
        (40, 49, 3),
        (30, 39, 2),
        (0, 29, 1)
      `);

      console.log("✅ APS rules seeded");
    }

    // ========================================================
    // SCHOOLS
    // ========================================================

    const schools = [
      [
        "Baleni Secondary School",
        "Eastern Cape",
        "Public",
        "Bizana",
        "",
        "",
      ],
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
      [
        "Bonxa High School",
        "Eastern Cape",
        "Public",
        "Tabankulu",
        "",
        "",
      ],
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
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM schools WHERE name = ?",
        [school[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO schools
          (name, province, type, location, contact, email)
          VALUES (?, ?, ?, ?, ?, ?)`,
          school,
        );
      }
    }

    console.log("✅ Schools seeded");

// ========================================================
// SOUTH AFRICAN UNIVERSITIES
// ========================================================

const universities = [
  [
    "University of Cape Town",
    "Western Cape",
    "Cape Town",
    "https://www.uct.ac.za",
    "",
    36,
    "",
  ],
  [
    "University of Pretoria",
    "Gauteng",
    "Pretoria",
    "https://www.up.ac.za",
    "",
    30,
    "",
  ],
  [
    "Nelson Mandela University",
    "Eastern Cape",
    "Gqeberha",
    "https://www.mandela.ac.za",
    "",
    25,
    "",
  ],
  [
    "University of Fort Hare",
    "Eastern Cape",
    "Alice",
    "https://www.ufh.ac.za",
    "",
    25,
    "",
  ],
  [
    "Walter Sisulu University",
    "Eastern Cape",
    "Mthatha",
    "https://www.wsu.ac.za",
    "",
    25,
    "",
  ],
];

for (const university of universities) {
  const exists = await refDb.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    [university[0]],
  );

  if (!exists) {
    await refDb.runAsync(
      `INSERT INTO universities
      (name, province, city, website, contact, minimum_aps, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      university,
    );
  }
}

console.log("✅ Universities seeded");

    // ========================================================
    // CAREERS
    // ========================================================

    const careers = [
      [
        "General Practitioner",
        "Science & Health Sciences",
        "Diagnoses and treats common illnesses.",
        "Mathematics, Life Sciences, Physical Sciences, English",
        "MBChB → Internship → Community Service → Registration",
        "University of Cape Town, Stellenbosch University, University of the Witwatersrand",
        "42-46+",
      ],
      [
        "Registered Nurse",
        "Science & Health Sciences",
        "Provides patient care and administers medication.",
        "Mathematics, Life Sciences, English",
        "Diploma in Nursing → Registration with SANC",
        "University of Fort Hare, Walter Sisulu University, Nelson Mandela University",
        "30-34+",
      ],
    ];

    for (const career of careers) {
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM careers WHERE name = ?",
        [career[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO careers
          (name, field, description, subjects_needed, study_path, institutions, aps_range)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          career,
        );
      }
    }

    console.log("✅ Careers seeded");

    // ========================================================
    // INDUSTRIES
    // ========================================================

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
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM industries WHERE name = ?",
        [industry[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO industries
          (name, sector, location, specialization, jobs_available, factories)
          VALUES (?, ?, ?, ?, ?, ?)`,
          industry,
        );
      }
    }

    console.log("✅ Industries seeded");

    // ========================================================
    // SUBJECTS
    // ========================================================

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
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM subjects WHERE name = ?",
        [subject[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO subjects
          (name, stream)
          VALUES (?, ?)`,
          subject,
        );
      }
    }

    console.log("✅ Subjects seeded");

    // ========================================================
    // TVET COLLEGES
    // ========================================================

    const tvetColleges = [
      ["Eastcape Midlands TVET College", "Eastern Cape"],
      ["Buffalo City TVET College", "Eastern Cape"],
      ["King Sabata Dalindyebo TVET College", "Eastern Cape"],
      ["King Hintsa TVET College", "Eastern Cape"],
      ["Lovedale TVET College", "Eastern Cape"],
      ["Port Elizabeth TVET College", "Eastern Cape"],
      ["Ikhala TVET College", "Eastern Cape"],

      ["False Bay TVET College", "Western Cape"],
      ["Northlink TVET College", "Western Cape"],
      ["South Cape TVET College", "Western Cape"],
      ["West Coast TVET College", "Western Cape"],

      ["Mnambithi TVET College", "KwaZulu-Natal"],
      ["uMfolozi TVET College", "KwaZulu-Natal"],
      ["Mthashana TVET College", "KwaZulu-Natal"],
      ["Thekwini TVET College", "KwaZulu-Natal"],
      ["uMgungundlovu TVET College", "KwaZulu-Natal"],
      ["Coastal KZN TVET College", "KwaZulu-Natal"],
      ["Elangeni TVET College", "KwaZulu-Natal"],
      ["Majuba TVET College", "KwaZulu-Natal"],
      ["Esayidi TVET College", "KwaZulu-Natal"],

      ["Ekurhuleni East TVET College", "Gauteng"],
      ["Ekurhuleni West TVET College", "Gauteng"],
      ["South West Gauteng TVET College", "Gauteng"],
      ["Central Johannesburg TVET College", "Gauteng"],
      ["Sedibeng TVET College", "Gauteng"],
      ["Tshwane North TVET College", "Gauteng"],
      ["Tshwane South TVET College", "Gauteng"],
      ["Tshwane West TVET College", "Gauteng"],
      ["Western TVET College", "Gauteng"],

      ["Capricorn TVET College", "Limpopo"],
      ["Lephalale TVET College", "Limpopo"],
      ["Mopani South East TVET College", "Limpopo"],
      ["Letaba TVET College", "Limpopo"],
      ["Vhembe TVET College", "Limpopo"],
      ["Sekhukhune TVET College", "Limpopo"],
      ["Waterberg TVET College", "Limpopo"],
      ["Taletso TVET College", "Limpopo"],

      ["Flavius Mareka TVET College", "Free State"],
      ["Goldfields TVET College", "Free State"],
      ["Motheo TVET College", "Free State"],
      ["Maluti TVET College", "Free State"],

      ["Ehlanzeni TVET College", "Mpumalanga"],
      ["Gert Sibande TVET College", "Mpumalanga"],
      ["Nkangala TVET College", "Mpumalanga"],

      ["Orbit TVET College", "North West"],
      ["Vuselela TVET College", "North West"],

      ["Northern Cape Urban TVET College", "Northern Cape"],
      ["Northern Cape Rural TVET College", "Northern Cape"],
    ];

    for (const college of tvetColleges) {
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM tvet_colleges WHERE name = ?",
        [college[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO tvet_colleges
          (name, province, type)
          VALUES (?, ?, 'Public')`,
          college,
        );
      }
    }

    console.log(
      `✅ TVET colleges seeded (${tvetColleges.length})`,
    );

    // ========================================================
    // COURSES
    // ========================================================

    const courseExists = await refDb.getFirstAsync<{ id: number }>(
      "SELECT id FROM courses LIMIT 1",
    );

    if (!courseExists) {
      const uct = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM universities WHERE name = ?",
        ["University of Cape Town"],
      );

      if (uct) {
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
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            uct.id,
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
            "70%",
            "No",
            "",
            "",
            "Upper Intermediate (AL & QL)",
            "Mathematical Studies and Maths Main are not accepted.",
            "https://applyonline.uct.ac.za",
          ],
        );

        console.log("✅ Courses seeded");
      }
    }

    // ========================================================
    // SCHOLARSHIPS
    // ========================================================

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
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM scholarships WHERE name = ?",
        [scholarship[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO scholarships
          (name, provider, amount, eligibility, closing_date, apply_link, field_of_study)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          scholarship,
        );
      }
    }

    console.log("✅ Scholarships seeded");

    // ========================================================
    // MENTORS
    // ========================================================

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
      const exists = await refDb.getFirstAsync<{ id: number }>(
        "SELECT id FROM mentors WHERE name = ?",
        [mentor[0]],
      );

      if (!exists) {
        await refDb.runAsync(
          `INSERT INTO mentors
          (name, field, bio, phone, email, profile_pic, availability)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          mentor,
        );
      }
    }

    console.log("✅ Mentors seeded");

    console.log("🎉 Reference database seed complete");
  } catch (error) {
    console.error(
      "❌ Reference database seed error:",
      error,
    );
  }
};

// ============================================================
// EXPORT DATABASE
// ============================================================

export default refDb;
