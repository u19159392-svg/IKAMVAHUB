import * as SQLite from "expo-sqlite";
import { seedMthashana } from "./Seeds/seeds.Mthashana TVET College";
import { seedPortElizabeth } from "./Seeds/seeds.Port Elizabeth TVET College";
import { seedThekwini } from "./Seeds/seeds.Thekwini TVET College";
import { seedTUT } from "./Seeds/seeds.TUT";
import { seedUCT } from "./Seeds/seeds.UCT";
import { seedUKZN } from "./Seeds/seeds.UKZN";
import { seedUmgungundlovu } from "./Seeds/seeds.Umgungundlovu TVET College";
import { seedUWC } from "./Seeds/seeds.UWC";
import { seedVhembe } from "./Seeds/seeds.Vhembe TVET College";
import { seedWits } from "./Seeds/seeds.Wits";
import { seedWSU } from "./Seeds/seeds.WSU";
import { seedUFS } from "./Seeds/seeds.UFS";
import { seedUNIVEN } from "./Seeds/seeds.UNIVEN";
import { seedMUT } from "./Seeds/seeds.MUT";
import { seedGertSibande } from "./Seeds/seeds.GertSibande";
import { seedLetaba } from "./Seeds/seeds.Letaba";
import { seedMotheo } from "./Seeds/seeds.Motheo"; 
import { seedUMNGUNGUNDLOVU } from "./Seeds/seeds.UMGUNGUNDLOVU"; 
import { seedTALETSO } from "./Seeds.seeds.TALETSO";
import { seedsORBIT } from "./Seeds.seeds.Orbit";
import { seedsSU } from "./Seeds.seeds.SU"; 





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
        city TEXT,
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
    
        closing_date TEXT,
        apply_link TEXT,
        field_of_study TEXT
      );

      -- BURSARIES TABLE
CREATE TABLE IF NOT EXISTS bursaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  provider TEXT,
  closing_date TEXT,
  apply_link TEXT
);

-- BURSARY CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS bursary_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bursary_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  FOREIGN KEY (bursary_id) REFERENCES bursaries(id) ON DELETE CASCADE
);

      -- MENTORS TABLE
     CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    field TEXT NOT NULL,
    bio TEXT,
    phone TEXT,
    email TEXT,
    availability TEXT,
    faculty TEXT,
    course TEXT,
    years_of_study INTEGER
);

      -- APS RULES TABLE
      CREATE TABLE IF NOT EXISTS aps_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        min_percentage INTEGER NOT NULL,
        max_percentage INTEGER NOT NULL,
        points INTEGER NOT NULL
      );
    `);
    console.log("✅ Reference database schema ready");
  } catch (error) {
    console.error("❌ Init reference database error:", error);
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

// ==================== ELIGIBILITY SUPPORT ====================
export const getAllCourses = async () => {
  try {
    return await refDb.getAllAsync("SELECT * FROM courses");
  } catch (error) {
    console.error("❌ Get all courses error:", error);
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

export const getBursaryCategories = async (bursaryId: number) => {
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

export const filterBursariesByCategory = async (category: string) => {
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
    console.error("❌ Filter bursaries by category error:", error);
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
    console.error("❌ Get bursary categories error:", error);
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
    console.log("🌱 Checking reference database seed status...");

    // ===== APS RULES =====
    const existingApsRules = await refDb.getAllAsync(
      "SELECT id FROM aps_rules LIMIT 1",
    );
    if (existingApsRules.length === 0) {
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
      console.log("✅ Seeded aps_rules");
    }

    // SCHOOLS 
    const existingSchools = await refDb.getAllAsync(
      "SELECT id FROM schools LIMIT 1",
    );
    if (existingSchools.length === 0) {
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
      console.log("✅ Seeded schools");
    }

    // ===== CAREERS =====
    const existingCareers = await refDb.getAllAsync(
      "SELECT id FROM careers LIMIT 1",
    );
    if (existingCareers.length === 0) {
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
      console.log("✅ Seeded careers");
    }

    // ===== INDUSTRIES =====
    const existingIndustries = await refDb.getAllAsync(
      "SELECT id FROM industries LIMIT 1",
    );
    if (existingIndustries.length === 0) {
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
      console.log("✅ Seeded industries");
    }

    // ===== SUBJECTS =====
    const existingSubjects = await refDb.getAllAsync(
      "SELECT id FROM subjects LIMIT 1",
    );
    if (existingSubjects.length === 0) {
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
      console.log("✅ Seeded subjects");
    }

    // ===== UNIVERSITIES (full list of 26 public universities, with city) =====
    const universities: [
      string,
      string,
      string,
      string,
      string,
      number,
      string,
    ][] = [
      [
        "University of Cape Town",
        "Western Cape",
        "Cape Town",
        "www.uct.ac.za",
        "021 650 9111",
        5,
        "",
      ],
      [
        "University of Pretoria",
        "Gauteng",
        "Pretoria",
        "www.up.ac.za",
        "012 420 3111",
        5,
        "",
      ],
      [
        "Stellenbosch University",
        "Western Cape",
        "Stellenbosch",
        "www.sun.ac.za",
        "021 808 9111",
        5,
        "",
      ],
      [
        "University of KwaZulu-Natal",
        "KwaZulu-Natal",
        "Durban",
        "www.ukzn.ac.za",
        "031 260 1111",
        5,
        "",
      ],
      [
        "University of the Western Cape",
        "Western Cape",
        "Bellville, Cape Town",
        "www.uwc.ac.za",
        "021 959 2911",
        5,
        "",
      ],
      [
        "Cape Peninsula University of Technology",
        "Western Cape",
        "Cape Town",
        "www.cput.ac.za",
        "021 460 3000",
        5,
        "",
      ],
      [
        "University of the Witwatersrand",
        "Gauteng",
        "Johannesburg",
        "www.wits.ac.za",
        "011 717 1000",
        5,
        "",
      ],
      [
        "University of Johannesburg",
        "Gauteng",
        "Johannesburg",
        "www.uj.ac.za",
        "011 559 4555",
        5,
        "",
      ],
      [
        "University of South Africa",
        "Gauteng",
        "Pretoria",
        "www.unisa.ac.za",
        "012 429 3111",
        5,
        "",
      ],
      [
        "Tshwane University of Technology",
        "Gauteng",
        "Pretoria",
        "www.tut.ac.za",
        "012 382 5911",
        5,
        "",
      ],
      [
        "Vaal University of Technology",
        "Gauteng",
        "Vanderbijlpark",
        "www.vut.ac.za",
        "016 950 9000",
        5,
        "",
      ],
      [
        "Sefako Makgatho Health Sciences University",
        "Gauteng",
        "Ga-Rankuwa, Pretoria",
        "www.smu.ac.za",
        "012 521 4111",
        5,
        "",
      ],
      [
        "Durban University of Technology",
        "KwaZulu-Natal",
        "Durban",
        "www.dut.ac.za",
        "031 373 2000",
        5,
        "",
      ],
      [
        "Mangosuthu University of Technology",
        "KwaZulu-Natal",
        "Umlazi, Durban",
        "www.mut.ac.za",
        "031 907 7111",
        5,
        "",
      ],
      [
        "University of Zululand",
        "KwaZulu-Natal",
        "KwaDlangezwa",
        "www.unizulu.ac.za",
        "035 902 6000",
        5,
        "",
      ],
      [
        "University of the Free State",
        "Free State",
        "Bloemfontein",
        "www.ufs.ac.za",
        "051 401 9111",
        5,
        "",
      ],
      [
        "Central University of Technology",
        "Free State",
        "Bloemfontein",
        "www.cut.ac.za",
        "051 507 3911",
        5,
        "",
      ],
      [
        "Rhodes University",
        "Eastern Cape",
        "Makhanda (Grahamstown)",
        "www.ru.ac.za",
        "046 603 8111",
        5,
        "",
      ],
      [
        "Nelson Mandela University",
        "Eastern Cape",
        "Gqeberha",
        "www.mandela.ac.za",
        "041 504 1111",
        5,
        "",
      ],
      [
        "University of Fort Hare",
        "Eastern Cape",
        "Alice",
        "www.ufh.ac.za",
        "040 602 2011",
        5,
        "",
      ],
      [
        "Walter Sisulu University",
        "Eastern Cape",
        "Mthatha",
        "www.wsu.ac.za",
        "047 502 2000",
        5,
        "",
      ],
      [
        "North-West University",
        "North West",
        "Potchefstroom",
        "www.nwu.ac.za",
        "018 299 1111",
        5,
        "",
      ],
      [
        "University of Limpopo",
        "Limpopo",
        "Polokwane",
        "www.ul.ac.za",
        "015 268 9111",
        5,
        "",
      ],
      [
        "University of Venda",
        "Limpopo",
        "Thohoyandou",
        "www.univen.ac.za",
        "015 962 8000",
        5,
        "",
      ],
      [
        "University of Mpumalanga",
        "Mpumalanga",
        "Mbombela",
        "www.ump.ac.za",
        "013 002 0001",
        5,
        "",
      ],
      [
        "Sol Plaatje University",
        "Northern Cape",
        "Kimberley",
        "www.spu.ac.za",
        "053 491 0000",
        5,
        "",
      ],
    ];

    for (const uni of universities) {
      const [name, province, city, website, contact, minimum_aps, image_url] =
        uni;
      const existing = (await refDb.getAllAsync(
        "SELECT id, city FROM universities WHERE name = ?",
        [name],
      )) as any[];

      if (existing.length === 0) {
        // Not seeded yet — insert it (existing UCT/Pretoria/Stellenbosch/UKZN rows keep their original IDs
        // because they're found above and skip this branch, so course foreign keys stay intact)
        await refDb.runAsync(
          "INSERT INTO universities (name, province, city, website, contact, minimum_aps, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, province, city, website, contact, minimum_aps, image_url],
        );
      } else if (!existing[0].city) {
        // Already exists from an earlier seed run but is missing its city — fill it in
        await refDb.runAsync("UPDATE universities SET city = ? WHERE id = ?", [
          city,
          existing[0].id,
        ]);
      }
    }
    console.log("✅ Universities up to date (26 total, with cities)");

    // ===== COURSES (incl. per-institution seed files) =====
    

const existingUCT = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["University of Cape Town"],
);

if (existingUCT.length === 0) {
  await seedUCT(refDb);
}

const existingUKZN = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["University of KwaZulu-Natal"],
);

if (existingUKZN.length === 0) {
  await seedUKZN(refDb);
}

const existingWits = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["University of the Witwatersrand"],
);

if (existingWits.length === 0) {
  await seedWits(refDb);
}

const existingWSU = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["Walter Sisulu University"],
);

if (existingWSU.length === 0) {
  await seedWSU(refDb);
}

const existingUWC = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["University of the Western Cape"],
);

if (existingUWC.length === 0) {
  await seedUWC(refDb);
}

const existingTUT = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM universities
     WHERE name = ?
   )
   LIMIT 1`,
  ["Tshwane University of Technology"],
);

if (existingTUT.length === 0) {
  await seedTUT(refDb);
}


// ============================================================
// TVET COLLEGE COURSES
// ============================================================

const existingMthashana = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM tvet_colleges
     WHERE name = ?
   )
   LIMIT 1`,
  ["Mthashana TVET College"],
);

if (existingMthashana.length === 0) {
  await seedMthashana(refDb);
}


const existingPortElizabeth = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM tvet_colleges
     WHERE name = ?
   )
   LIMIT 1`,
  ["Port Elizabeth TVET College"],
);

if (existingPortElizabeth.length === 0) {
  await seedPortElizabeth(refDb);
}


const existingThekwini = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM tvet_colleges
     WHERE name = ?
   )
   LIMIT 1`,
  ["Thekwini TVET College"],
);

if (existingThekwini.length === 0) {
  await seedThekwini(refDb);
}


const existingVhembe = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM tvet_colleges
     WHERE name = ?
   )
   LIMIT 1`,
  ["Vhembe TVET College"],
);

if (existingVhembe.length === 0) {
  await seedVhembe(refDb);
}


const existingUmgungundlovu = await refDb.getAllAsync(
  `SELECT id FROM courses
   WHERE institution_id = (
     SELECT id FROM tvet_colleges
     WHERE name = ?
   )
   LIMIT 1`,
  ["Umgungundlovu TVET College"],
);

if (existingUmgungundlovu.length === 0) {
  await seedUmgungundlovu(refDb);
}


console.log(
  "✅ Seeded courses (UCT, UKZN, Wits, WSU, UWC, TUT and TVET colleges)"
);
    

    // ===== TVET COLLEGES =====
const tvetColleges = [
  // Eastern Cape
  [
    "Eastcape Midlands TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Buffalo City TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "King Sabata Dalindyebo TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "King Hintsa TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Lovedale TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Port Elizabeth TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Ikhala TVET College",
    "Eastern Cape",
    "",
    "",
    "Public",
    "",
  ],

  // Western Cape
  [
    "False Bay TVET College",
    "Western Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Northlink TVET College",
    "Western Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "South Cape TVET College",
    "Western Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "West Coast TVET College",
    "Western Cape",
    "",
    "",
    "Public",
    "",
  ],

  // KwaZulu-Natal
  [
    "Mnambithi TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "uMfolozi TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Mthashana TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Thekwini TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "uMgungundlovu TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Coastal KZN TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Elangeni TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Majuba TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Esayidi TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],

  // Gauteng
  [
    "Ekurhuleni East TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Ekurhuleni West TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "South West Gauteng TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Central Johannesburg TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Sedibeng TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Tshwane North TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Tshwane South TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Tshwane West TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Western TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],

  // Limpopo
  [
    "Capricorn TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Lephalale TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Mopani South East TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Letaba TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Vhembe TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Sekhukhune TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Waterberg TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Taletso TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Tshwane North TVET College",
    "Gauteng",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Mthashana TVET College",
    "KwaZulu-Natal",
    "",
    "",
    "Public",
    "",
  ],

  // Free State
  [
    "Flavius Mareka TVET College",
    "Free State",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Goldfields TVET College",
    "Free State",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Motheo TVET College",
    "Free State",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Maluti TVET College",
    "Free State",
    "",
    "",
    "Public",
    "",
  ],

  // Mpumalanga
  [
    "Ehlanzeni TVET College",
    "Mpumalanga",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Gert Sibande TVET College",
    "Mpumalanga",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Nkangala TVET College",
    "Mpumalanga",
    "",
    "",
    "Public",
    "",
  ],

  // North West
  [
    "Orbit TVET College",
    "North West",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Vuselela TVET College",
    "North West",
    "",
    "",
    "Public",
    "",
  ],

  // Northern Cape
  [
    "Northern Cape Urban TVET College",
    "Northern Cape",
    "",
    "",
    "Public",
    "",
  ],
  [
    "Northern Cape Rural TVET College",
    "Northern Cape",
    "",
    "",
    "Public",
    "",
  ],

  // Limpopo / Xitsonga
  [
    "Mopani South East TVET College",
    "Limpopo",
    "",
    "",
    "Public",
    "",
  ],

  // Eastern Cape / Xitsonga entry from supplied list
  [
    "West Coast TVET College",
    "Western Cape",
    "",
    "",
    "Public",
    "",
  ],
];

// Add colleges individually.
// This is important because the database may already contain
// Buffalo City and Port Elizabeth from an earlier seed.
for (const college of tvetColleges) {
  const existing = await refDb.getAllAsync(
    "SELECT id FROM tvet_colleges WHERE name = ?",
    [college[0]],
  );

  if (existing.length === 0) {
    await refDb.runAsync(
      `INSERT INTO tvet_colleges
       (name, province, website, contact, type, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      college,
    );
  }
}

console.log(
  `✅ TVET colleges up to date (${tvetColleges.length} colleges)`
);

    // ===== SCHOLARSHIPS =====
    const existingScholarships = await refDb.getAllAsync(
      "SELECT id FROM scholarships LIMIT 1",
    );
    if (existingScholarships.length === 0) {
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
      console.log("✅ Seeded scholarships");
    }

    // ===== MENTORS =====
    const existingMentors = await refDb.getAllAsync(
      "SELECT id FROM mentors LIMIT 1",
    );
    if (existingMentors.length === 0) {
      const mentors = [
        [
          "Ms Nadia Mavika",
          "Economic Management Sciences faculty - Bachelor of Accounting Sciences",
          "Student mentor",
          "062 889 9560",
          "nadiamavika663@gmail.com",
          "https://i.pravatar.cc/150?img=1(profile picture)",
          "Weekends",
        ],
        [
          "Mr Lesiba Pitseng",
          "Economic Management Sciences faculty-Bachelor of Accounting Sciences",
          "Student mentor",
          "071 299 4145",
          "u23752379@tuks.co.za",
          "https://i.pravatar.cc/150?img=2",
          "Weekdays",
        ],
        [
          "Mr Celukwanda Mtshali",
          "Education faculty- Senoir Phase and FET Phase",
          "student mentor",
          "063 810 9315",
          "u24828752@tuks.co.za",
          "https://i.pravatar.cc/150?img=3",
          "Evenings",
        ],

        [
          "Ms Morabusioluwa Abolarin",
          "Engineering, Built Environment and Information Technology faculty- Bachelor of Engineering in Mechanical Engineering",
          "Student mentor",
          " 061 187 9226",
          "abusi.abolarin@gmail.com",
          "https://i.pravatar.cc/150?img=4",
          "Weekends",
        ],

        [
          "Ms Nomzi Phosa",
          "Engineering, Built Environment and Information Technology faculty- Bachelor of Science in Computer Science",
          "Student mentor",
          "081 098 5238",
          "nomzimphosa@gmail.com",
          "https://i.pravatar.cc/150?img=5",
          "Weekdays",
        ],
        [
          "Silothabo Chimboza",
          "Health Sciences faculty- Human Physiology majoring in Phamacology",
          "Student mentor",
          " 062 977 2580",
          "silothabo.chimboza@gmail.com",
          "https://i.pravatar.cc/150?img=6",
          "Weekends", 
        ],

        [
          "Ms Kealeboga Moothai",
          "Health Sciences faculty- Bachelor of  ",
          "Student mentor",
          " 068 096 7003",
          "Moothaikealeboga@gmail.com",
          "https://i.pravatar.cc/150?img=7",
          "Weekdays",
        ],

        [
          ""
        ]

    

      ];
      for (const mentor of mentors) {
        await refDb.runAsync(
          "INSERT INTO mentors (name, field, bio, phone, email, profile_pic, availability) VALUES (?, ?, ?, ?, ?, ?, ?)",
          mentor,
        );
      }
      console.log("✅ Seeded mentors");
    }

    console.log("✅ Reference database seed check complete");
  } catch (error) {
    console.error("❌ Seed reference database error:", error);
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
    console.error("❌ Get mentor by ID error:", error);
    return null;
  }
};

export default refDb;


