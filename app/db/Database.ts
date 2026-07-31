import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("ikamvahub.db");

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      -- USERS TABLE (Person 3)
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- PROFILES TABLE (Person 4)
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        bio TEXT,
        profile_pic TEXT,
        phone TEXT,
        location TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- TASKS TABLE (Person 6)
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'medium',
        status TEXT DEFAULT 'pending',
        due_date TEXT,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- SETTINGS TABLE (Person 6)
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        notifications_enabled INTEGER DEFAULT 1,
        dark_mode INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- NOTIFICATIONS TABLE (Person 6)
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- SCHOOLS TABLE
      DROP TABLE IF EXISTS schools;
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
      DROP TABLE IF EXISTS school_contacts;
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
      DROP TABLE IF EXISTS careers;
      CREATE TABLE IF NOT EXISTS careers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        field TEXT,
        description TEXT,
        subjects_needed TEXT,
        study_path TEXT,
        institutions TEXT,
        aps_minimum INTEGER,
        stream TEXT
      );

      -- CAREER-SUBJECT RELATIONSHIPS TABLE
      DROP TABLE IF EXISTS career_subjects;
      CREATE TABLE IF NOT EXISTS career_subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        career_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        FOREIGN KEY (career_id) REFERENCES careers (id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects (id) ON DELETE CASCADE
      );

      -- INDUSTRIES TABLE
      DROP TABLE IF EXISTS industries;
      CREATE TABLE IF NOT EXISTS industries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sector TEXT,
        location TEXT,
        specialization TEXT,
        jobs_available TEXT,
        factories TEXT
      );
      -- CAREER-SUBJECT RELATION TABLE
CREATE TABLE IF NOT EXISTS career_subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  career_id INTEGER,
  subject_id INTEGER,
  FOREIGN KEY (career_id) REFERENCES careers(id),
  FOREIGN KEY (subject_id) REFERENCES subjects(id)
);
    `);

    // ===== SEED DATA =====
    await clearDuplicateSchools();
    await seedSchools();
    await seedCareers();
    await seedIndustries();

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database init error:", error);
  }
};

// ==================== USER CRUD (Person 3) ====================
export const createUser = async (
  name: string,
  email: string,
  password?: string,
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password || ""],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Create user error:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM users");
  } catch (error) {
    console.error("❌ Get users error:", error);
    return [];
  }
};

export const getUserById = async (id: number) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get user error:", error);
    return null;
  }
};

export const updateUser = async (id: number, name: string, email: string) => {
  try {
    await db.runAsync("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);
    return true;
  } catch (error) {
    console.error("❌ Update user error:", error);
    return false;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("❌ Delete user error:", error);
    return false;
  }
};

// ==================== PROFILE CRUD (Person 4) ====================
export const createProfile = async (data: any) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO profiles (user_id, bio, profile_pic, phone, location) VALUES (?, ?, ?, ?, ?)",
      [
        data.user_id,
        data.bio || "",
        data.profile_pic || "",
        data.phone || "",
        data.location || "",
      ],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Create profile error:", error);
    return null;
  }
};

export const getProfileByUserId = async (userId: number) => {
  try {
    const result = await db.getAllAsync(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get profile error:", error);
    return null;
  }
};

export const updateProfile = async (userId: number, data: any) => {
  try {
    await db.runAsync(
      "UPDATE profiles SET bio = ?, profile_pic = ?, phone = ?, location = ? WHERE user_id = ?",
      [data.bio, data.profile_pic, data.phone, data.location, userId],
    );
    return true;
  } catch (error) {
    console.error("❌ Update profile error:", error);
    return false;
  }
};

export const deleteProfile = async (userId: number) => {
  try {
    await db.runAsync("DELETE FROM profiles WHERE user_id = ?", [userId]);
    return true;
  } catch (error) {
    console.error("❌ Delete profile error:", error);
    return false;
  }
};

// ==================== TASK CRUD (Person 6) ====================
export const createTask = async (data: any) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO tasks (title, description, priority, status, due_date, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.title,
        data.description || "",
        data.priority || "medium",
        data.status || "pending",
        data.due_date || "",
        data.user_id,
      ],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Create task error:", error);
    return null;
  }
};

export const getTasksByUser = async (userId: number) => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
  } catch (error) {
    console.error("❌ Get tasks error:", error);
    return [];
  }
};

export const updateTaskStatus = async (id: number, status: string) => {
  try {
    await db.runAsync("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
    return true;
  } catch (error) {
    console.error("❌ Update task error:", error);
    return false;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("❌ Delete task error:", error);
    return false;
  }
};

// ==================== SETTINGS CRUD (Person 6) ====================
export const getSettings = async (
  userId: number,
): Promise<{ notifications_enabled: number; dark_mode: number }> => {
  try {
    const result = await db.getAllAsync(
      "SELECT * FROM settings WHERE user_id = ?",
      [userId],
    );
    if (result.length === 0) {
      await db.runAsync(
        "INSERT INTO settings (user_id, notifications_enabled, dark_mode) VALUES (?, ?, ?)",
        [userId, 1, 0],
      );
      return { notifications_enabled: 1, dark_mode: 0 };
    }
    return result[0] as { notifications_enabled: number; dark_mode: number };
  } catch (error) {
    console.error("❌ Get settings error:", error);
    return { notifications_enabled: 1, dark_mode: 0 };
  }
};

export const updateSettings = async (userId: number, data: any) => {
  try {
    await db.runAsync(
      "UPDATE settings SET notifications_enabled = ?, dark_mode = ? WHERE user_id = ?",
      [data.notifications_enabled, data.dark_mode, userId],
    );
    return true;
  } catch (error) {
    console.error("❌ Update settings error:", error);
    return false;
  }
};

// ==================== NOTIFICATION CRUD (Person 6) ====================
export const createNotification = async (
  userId: number,
  title: string,
  message: string,
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
      [userId, title, message],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Create notification error:", error);
    return null;
  }
};

export const getNotificationsByUser = async (userId: number) => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
  } catch (error) {
    console.error("❌ Get notifications error:", error);
    return [];
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    await db.runAsync("UPDATE notifications SET read = 1 WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("❌ Mark notification error:", error);
    return false;
  }
};

export const clearDuplicateSchools = async () => {
  try {
    await db.runAsync("DELETE FROM schools");
    await db.runAsync("DELETE FROM sqlite_sequence WHERE name='schools'");
    console.log("✅ All schools cleared");
  } catch (error) {
    console.error("❌ Error clearing schools:", error);
  }
};

// ==================== SCHOOLS SEED DATA ====================
export const seedSchools = async () => {
  try {
    const existing = await db.getAllAsync("SELECT id FROM schools LIMIT 1");
    if (existing.length > 0) {
      console.log("ℹ️ Schools already seeded, skipping");
      return;
    }

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
      [
        "Zibokwana High School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      ["Dangwana High School", "Eastern Cape", "Public", "Mount Frere", "", ""],
      [
        "Zwelitsha High Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      ["Mbodleli High School", "Eastern Cape", "Public", "Mount Frere", "", ""],
      [
        "Mfazwe Tech High School",
        "Eastern Cape",
        "Public",
        "Tabankulu",
        "",
        "",
      ],
      [
        "Mpondombini Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      ["Mvenyane High School", "Eastern Cape", "Public", "Mount Frere", "", ""],
      [
        "Nzululwazi High School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
      [
        "Nomaqwathekana Secondary School",
        "Eastern Cape",
        "Public",
        "Mount Frere",
        "",
        "",
      ],
    ];

    for (const school of schools) {
      await db.runAsync(
        "INSERT INTO schools (name, province, type, location, contact, email) VALUES (?, ?, ?, ?, ?, ?)",
        school,
      );
    }

    // ===== SUBJECTS OFFERED (Languages, Subjects, Programs) =====
    const schoolSubjects = [
      [
        "Baleni Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Tyelimhlophe Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Agricultural Sciences, Agricultural Technology, Life Sciences, Geography\nPrograms: NSC CAPS curriculum with Agricultural specialisation (Gr 8-12)",
      ],
      [
        "Toleni Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Bonxa High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Accounting, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum with Accounting (Gr 8-12)",
      ],
      [
        "Dumsi Senior Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Zibokwana High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Dangwana High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Zwelitsha High Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Mbodleli High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Compulsory: Mathematics, Mathematical Literacy, Life Orientation. Optional (choose 3): Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences, Accounting, Business Studies, Economics, Tourism, Consumer Studies\nPrograms: NSC CAPS curriculum (Gr 10-12)",
      ],
      [
        "Mfazwe Tech High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Civil Technology, Electrical Technology, Mechanical Technology, Engineering Graphics & Design (EGD), Technical Sciences\nPrograms: NSC CAPS curriculum with Comprehensive Technical specialisation (Gr 8-12)",
      ],
      [
        "Mpondombini Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Mvenyane High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Nzululwazi High School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)",
      ],
      [
        "Nomaqwathekana Secondary School",
        "Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, and elective subjects per CAPS\nPrograms: NSC CAPS curriculum",
      ],
    ];

    for (const [name, subjects] of schoolSubjects) {
      await db.runAsync(
        "UPDATE schools SET subjects_offered = ? WHERE name = ?",
        [subjects, name],
      );
    }

    console.log("✅ Schools seeded successfully");
  } catch (error) {
    console.error("❌ Seed schools error:", error);
  }
};

export const seedCareers = async () => {
  try {
    // Delete all existing careers
    await db.runAsync("DELETE FROM careers");
    await db.runAsync("DELETE FROM sqlite_sequence WHERE name='careers'");

    const careers = [
      // ==================== SCIENCE & HEALTH SCIENCES ====================
      {
        name: "General Practitioner",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats common illnesses, provides general healthcare, and refers patients to specialists when needed.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Registration as a medical doctor",
        institutions:
          "University of Fort Hare, Walter Sisulu University, University of the Witwatersrand, University of Cape Town, Stellenbosch University",
        aps_minimum: 7,
      },
      {
        name: "Medical Doctor (Physician)",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats diseases, injuries, and other medical conditions.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Registration as a medical doctor",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 7,
      },
      {
        name: "Specialist Physician",
        field: "Science & Health Sciences",
        description:
          "Specialises in diagnosing and treating specific medical conditions.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Specialisation training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Surgeon",
        field: "Science & Health Sciences",
        description:
          "Performs surgical procedures to treat injuries, diseases, and deformities.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Surgical training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "General Surgeon",
        field: "Science & Health Sciences",
        description: "Performs a wide range of surgical procedures.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Surgical specialisation → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Orthopaedic Surgeon",
        field: "Science & Health Sciences",
        description:
          "Specialises in surgical treatment of the musculoskeletal system.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Orthopaedic training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Cardiothoracic Surgeon",
        field: "Science & Health Sciences",
        description:
          "Performs surgical procedures on the heart, lungs, and chest.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Cardiothoracic training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Neurosurgeon",
        field: "Science & Health Sciences",
        description:
          "Performs surgical procedures on the brain, spinal cord, and nervous system.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Neurosurgery training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Plastic and Reconstructive Surgeon",
        field: "Science & Health Sciences",
        description:
          "Performs surgeries to restore or improve appearance and function.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Plastic surgery training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Paediatrician",
        field: "Science & Health Sciences",
        description:
          "Specialises in medical care for infants, children, and adolescents.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Paediatric training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 7,
      },
      {
        name: "Gynaecologist",
        field: "Science & Health Sciences",
        description: "Specialises in women's reproductive health.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Gynaecology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 7,
      },
      {
        name: "Obstetrician",
        field: "Science & Health Sciences",
        description:
          "Specialises in pregnancy, childbirth, and postpartum care.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Obstetrics training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 7,
      },
      {
        name: "Dermatologist",
        field: "Science & Health Sciences",
        description: "Specialises in diagnosing and treating skin conditions.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Dermatology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Oncologist",
        field: "Science & Health Sciences",
        description: "Specialises in diagnosing and treating cancer.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Oncology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Radiologist",
        field: "Science & Health Sciences",
        description: "Uses medical imaging to diagnose and treat diseases.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Radiology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Anaesthesiologist",
        field: "Science & Health Sciences",
        description:
          "Administers anaesthesia and manages pain during surgical procedures.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Anaesthesia training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Psychiatrist",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats mental, emotional, and behavioral disorders.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Psychiatry training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Registered Nurse",
        field: "Science & Health Sciences",
        description:
          "Provides patient care, administers medication, and assists doctors in medical procedures.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Diploma in Nursing (3 years) → Registration with SANC",
        institutions:
          "University of Fort Hare, Walter Sisulu University, Nelson Mandela University, Various TVET Colleges",
        aps_minimum: 5,
      },
      {
        name: "Enrolled Nurse",
        field: "Science & Health Sciences",
        description:
          "Provides basic nursing care under the supervision of registered nurses.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Certificate in Nursing (2 years) → Registration with SANC",
        institutions: "Various TVET Colleges, Nursing Colleges",
        aps_minimum: 4,
      },
      {
        name: "Nurse Practitioner",
        field: "Science & Health Sciences",
        description:
          "Advanced practice nurse who can diagnose and treat certain conditions.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Post-graduate training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Clinical Nurse Specialist",
        field: "Science & Health Sciences",
        description:
          "Provides specialized nursing care in a specific area of practice.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Specialist training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Midwife",
        field: "Science & Health Sciences",
        description:
          "Provides care during pregnancy, childbirth, and postpartum.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Midwifery training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of KwaZulu-Natal",
        aps_minimum: 5,
      },
      {
        name: "Medical Laboratory Scientist",
        field: "Science & Health Sciences",
        description:
          "Analyses medical samples to diagnose diseases and conditions.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "Bachelor of Health Sciences in Medical Laboratory Science → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 6,
      },
      {
        name: "Medical Laboratory Technician",
        field: "Science & Health Sciences",
        description: "Performs laboratory tests on medical samples.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "National Diploma in Biomedical Technology (3 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Various TVET Colleges",
        aps_minimum: 5,
      },
      {
        name: "Pathologist",
        field: "Science & Health Sciences",
        description:
          "Studies diseases and diagnoses conditions through laboratory analysis.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Pathology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Pharmacist",
        field: "Science & Health Sciences",
        description:
          "Dispenses medications, advises patients on drug use, and manages pharmacy operations.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Pharmacy (BPharm) → Internship → Community Service → Registration",
        institutions:
          "Rhodes University, North-West University, University of the Western Cape, Tshwane University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Clinical Pharmacist",
        field: "Science & Health Sciences",
        description:
          "Works directly with patients and healthcare teams to optimize medication therapy.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Pharmacy (BPharm) → Clinical training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, Rhodes University",
        aps_minimum: 7,
      },
      {
        name: "Pharmacy Technician",
        field: "Science & Health Sciences",
        description:
          "Assists pharmacists with dispensing medications and managing inventory.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "National Certificate in Pharmacy (2 years) → Registration",
        institutions:
          "Various TVET Colleges, University of the Western Cape, Tshwane University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Dentist",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats dental issues, performs procedures like fillings and extractions.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Dental Surgery (BDS) → Internship → Community Service → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal, Sefako Makgatho Health Sciences University",
        aps_minimum: 7,
      },
      {
        name: "Orthodontist",
        field: "Science & Health Sciences",
        description:
          "Specialises in aligning teeth and jaws using braces and other appliances.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "BDS → Internship → Community Service → Orthodontic training → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 8,
      },
      {
        name: "Oral Surgeon",
        field: "Science & Health Sciences",
        description:
          "Performs surgical procedures on the mouth, jaws, and face.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "BDS → Internship → Community Service → Oral surgery training → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 8,
      },
      {
        name: "Dental Hygienist",
        field: "Science & Health Sciences",
        description:
          "Provides preventive dental care and educates patients on oral hygiene.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Diploma in Dental Hygiene (2-3 years) → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 5,
      },
      {
        name: "Clinical Psychologist",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats mental, emotional, and behavioral disorders through therapy.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Honours → Masters in Clinical Psychology → Internship → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Counselling Psychologist",
        field: "Science & Health Sciences",
        description:
          "Helps individuals manage personal, social, and emotional challenges.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Honours → Masters in Counselling Psychology → Internship → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Educational Psychologist",
        field: "Science & Health Sciences",
        description:
          "Supports the learning and development of students with special needs.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Honours → Masters in Educational Psychology → Internship → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Physiotherapist",
        field: "Science & Health Sciences",
        description:
          "Helps patients recover from injuries, surgeries, and physical conditions through exercise and therapy.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Physiotherapy (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Stellenbosch University, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Occupational Therapist",
        field: "Science & Health Sciences",
        description:
          "Helps patients perform daily activities and recover from physical or mental conditions.",
        subjects_needed: "Life Sciences, English, Mathematics",
        study_path:
          "Bachelor of Occupational Therapy (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Stellenbosch University, University of KwaZulu-Natal",
        aps_minimum: 6,
      },
      {
        name: "Speech-Language Therapist",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats speech, language, and communication disorders.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Speech-Language Pathology (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Audiologist",
        field: "Science & Health Sciences",
        description: "Diagnoses and treats hearing and balance disorders.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Audiology (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Dietitian",
        field: "Science & Health Sciences",
        description:
          "Advises on nutrition and food choices to promote health and manage diseases.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Dietetics (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Stellenbosch University, North-West University",
        aps_minimum: 5,
      },
      {
        name: "Nutritionist",
        field: "Science & Health Sciences",
        description:
          "Advises on food and nutrition to promote health and manage weight.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Bachelor of Nutrition (3-4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Radiographer",
        field: "Science & Health Sciences",
        description:
          "Uses imaging technology (X-ray, CT, MRI) to diagnose medical conditions.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Radiography (4 years) → Community Service → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Central University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Radiation Therapist",
        field: "Science & Health Sciences",
        description: "Administers radiation treatment for cancer patients.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Radiography in Radiation Therapy (4 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Emergency Medical Technician",
        field: "Science & Health Sciences",
        description:
          "Provides emergency medical care and transportation to patients.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "National Certificate in Emergency Medical Care (1-3 years) → Registration",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Johannesburg, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Paramedic",
        field: "Science & Health Sciences",
        description: "Provides advanced pre-hospital emergency medical care.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Emergency Medical Care (4 years) → Registration",
        institutions:
          "University of Cape Town, University of Johannesburg, Cape Peninsula University of Technology, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Public Health Specialist",
        field: "Science & Health Sciences",
        description:
          "Works to improve community health through disease prevention and health promotion.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Public Health (3 years) → Postgraduate training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Epidemiologist",
        field: "Science & Health Sciences",
        description:
          "Studies the patterns, causes, and effects of health and disease conditions in populations.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "Bachelor of Public Health (3 years) → Postgraduate training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },

      // ==================== ENGINEERING & TECHNOLOGY ====================
      {
        name: "Civil Engineer",
        field: "Engineering & Technology",
        description:
          "Designs, builds, and maintains infrastructure like roads, bridges, and buildings.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Mechanical Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops mechanical systems, from engines to industrial machinery.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, Vaal University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Electrical Engineer",
        field: "Engineering & Technology",
        description:
          "Designs, develops, and maintains electrical systems and power distribution.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Electronic Engineer",
        field: "Engineering & Technology",
        description: "Designs and develops electronic systems and devices.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Cape Peninsula University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Chemical Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops chemical processes for manufacturing and production.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of KwaZulu-Natal",
        aps_minimum: 6,
      },
      {
        name: "Industrial Engineer",
        field: "Engineering & Technology",
        description:
          "Optimises production processes, supply chains, and operational efficiency.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Software Engineer",
        field: "Engineering & Technology",
        description:
          "Designs, develops, and tests software applications and systems.",
        subjects_needed:
          "Mathematics, English, Information Technology (advantage)",
        study_path:
          "Bachelor of Computer Science / BEng Software Engineering (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Computer Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops computer hardware and software systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Network Engineer",
        field: "Engineering & Technology",
        description: "Designs, implements, and maintains computer networks.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Professional Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Systems Engineer",
        field: "Engineering & Technology",
        description: "Designs and manages complex systems and projects.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Aerospace Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops aircraft, spacecraft, and related systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 7,
      },
      {
        name: "Automotive Engineer",
        field: "Engineering & Technology",
        description: "Designs and develops vehicles and automotive systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, Vaal University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Structural Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and analyses structures like buildings and bridges.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Environmental Engineer",
        field: "Engineering & Technology",
        description:
          "Develops solutions to environmental problems and promotes sustainability.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Mechatronics Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops intelligent systems combining mechanical, electronic, and software engineering.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Robotics Engineer",
        field: "Engineering & Technology",
        description: "Designs, builds, and maintains robotic systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Geotechnical Engineer",
        field: "Engineering & Technology",
        description:
          "Studies soil and rock mechanics for construction projects.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Water Resources Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and manages water supply, treatment, and distribution systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },

      // ==================== COMMERCE & BUSINESS ====================
      {
        name: "Accountant",
        field: "Commerce & Business",
        description:
          "Manages financial records, prepares tax returns, and advises on financial decisions.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Accounting (3 years) → Honours → SAICA Qualifying Exam → Articles (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Fort Hare",
        aps_minimum: 6,
      },
      {
        name: "Chartered Accountant (CA)",
        field: "Commerce & Business",
        description:
          "High-level financial expert, involved in auditing, tax, and strategic financial management.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "BCom Accounting → Honours → SAICA Qualifying Exam → Articles (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, Rhodes University",
        aps_minimum: 7,
      },
      {
        name: "Financial Manager",
        field: "Commerce & Business",
        description:
          "Oversees the financial operations and planning of an organisation.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Finance (3 years) → Professional Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Financial Analyst",
        field: "Commerce & Business",
        description:
          "Evaluates financial data, market trends, and investment opportunities.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Finance (3 years) → Professional Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Investment Banker",
        field: "Commerce & Business",
        description:
          "Provides financial advisory services and raises capital for corporations.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Finance (3 years) → MBA or CFA → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 7,
      },
      {
        name: "Economist",
        field: "Commerce & Business",
        description:
          "Studies economic trends, markets, and policies to provide analysis and forecasts.",
        subjects_needed: "Mathematics, Economics, English",
        study_path:
          "Bachelor of Commerce in Economics (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Actuary",
        field: "Commerce & Business",
        description:
          "Analyses financial risks using mathematics and statistics.",
        subjects_needed: "Mathematics, Statistics, English",
        study_path:
          "Bachelor of Science in Actuarial Science (3-4 years) → Professional Exams",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, North-West University",
        aps_minimum: 7,
      },
      {
        name: "Marketing Manager",
        field: "Commerce & Business",
        description:
          "Oversees marketing strategies, campaigns, and brand development.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Marketing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Human Resources Manager",
        field: "Commerce & Business",
        description:
          "Manages employee relations, recruitment, training, and organisational development.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce in Human Resources Management (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Supply Chain Manager",
        field: "Commerce & Business",
        description:
          "Oversees logistics, procurement, and distribution of goods.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Supply Chain Management (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Logistics Manager",
        field: "Commerce & Business",
        description: "Manages the movement and storage of goods and materials.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Logistics (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Entrepreneur",
        field: "Commerce & Business",
        description:
          "Starts and runs a business, managing operations, finance, and strategy.",
        subjects_needed: "Mathematics, Business Studies, Economics, English",
        study_path:
          "Various — Degree in Business, Entrepreneurship programs, or direct experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },

      // ==================== ARTS & CREATIVE FIELDS ====================
      {
        name: "Graphic Designer",
        field: "Arts & Creative Fields",
        description:
          "Creates visual concepts using design software to communicate ideas and messages.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Visual Communication / Graphic Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Fashion Designer",
        field: "Arts & Creative Fields",
        description:
          "Designs clothing and accessories from concept to production.",
        subjects_needed: "Visual Arts, Design Studies, English",
        study_path: "BA in Fashion Design (3-4 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Interior Designer",
        field: "Arts & Creative Fields",
        description: "Designs interior spaces for homes and businesses.",
        subjects_needed: "Visual Arts, Design Studies, English",
        study_path: "BA in Interior Design (3-4 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Animator",
        field: "Arts & Creative Fields",
        description:
          "Creates moving images and visual effects for film, TV, games, and digital media.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Animation or Digital Arts (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Journalist",
        field: "Arts & Creative Fields",
        description:
          "Researches and reports news and stories across print, broadcast, and digital media.",
        subjects_needed: "English, History, Languages",
        study_path: "BA in Journalism / Media Studies (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Film Director",
        field: "Arts & Creative Fields",
        description:
          "Oversees the creative and technical aspects of film production.",
        subjects_needed: "Visual Arts, English, Drama",
        study_path: "BA in Film Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Photographer",
        field: "Arts & Creative Fields",
        description:
          "Captures and creates images for artistic, commercial, or journalistic purposes.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Photography (3 years) OR Diploma",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Musician",
        field: "Arts & Creative Fields",
        description:
          "Creates and performs music as a solo artist or as part of a group.",
        subjects_needed: "Music, English, Visual Arts",
        study_path: "BMus (3-4 years) OR Practical experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, Tshwane University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Actor",
        field: "Arts & Creative Fields",
        description:
          "Performs in film, television, theatre, and other productions.",
        subjects_needed: "Drama, English, Visual Arts",
        study_path: "BA in Dramatic Arts (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, Tshwane University of Technology",
        aps_minimum: 5,
      },

      // ==================== EDUCATION ====================
      {
        name: "Teacher (Secondary)",
        field: "Education",
        description:
          "Educates students in specific subject areas at secondary school level.",
        subjects_needed:
          "Depending on subject: Mathematics, English, Physical Sciences, Life Sciences, History, Geography",
        study_path:
          "Bachelor of Education (BEd) (4 years) OR PGCE after a degree (1 year) → Registration with SACE",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Fort Hare, Walter Sisulu University",
        aps_minimum: 5,
      },
      {
        name: "Primary School Teacher",
        field: "Education",
        description:
          "Educates learners in foundational subjects at primary school level.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path:
          "Bachelor of Education (Foundation Phase / Intermediate Phase) (4 years) → Registration with SACE",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Fort Hare, Walter Sisulu University",
        aps_minimum: 5,
      },
      {
        name: "Early Childhood Development Practitioner",
        field: "Education",
        description:
          "Works with young children to support their early learning and development.",
        subjects_needed: "English, Life Orientation",
        study_path:
          "National Certificate in Early Childhood Development (1-2 years) OR Diploma",
        institutions:
          "Various TVET Colleges, University of Cape Town, Stellenbosch University, UNISA, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "School Principal",
        field: "Education",
        description:
          "Oversees the operations, staff, and educational programs of a school.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path:
          "Bachelor of Education (BEd) → Teaching experience → Principal Training",
        institutions: "Various universities offering Education degrees",
        aps_minimum: 5,
      },
      {
        name: "Education Administrator",
        field: "Education",
        description:
          "Manages administrative functions in educational institutions.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Education (BEd) → Postgraduate Diploma in Education Management",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, UNISA",
        aps_minimum: 5,
      },
      {
        name: "Lecturer",
        field: "Education",
        description:
          "Teaches at tertiary institutions and contributes to research and academic development.",
        subjects_needed:
          "English, Mathematics, Life Sciences, Physical Sciences",
        study_path:
          "Bachelor of Arts / Science (3 years) → Honours → Masters → PhD",
        institutions: "All South African universities",
        aps_minimum: 6,
      },

      // ==================== HOSPITALITY & TOURISM ====================
      {
        name: "Hotel Manager",
        field: "Hospitality & Tourism",
        description:
          "Manages hotel operations, guest services, and staff to ensure a quality experience.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma or Degree in Hospitality Management (3-4 years)",
        institutions:
          "Stadio Higher Education, Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Walter Sisulu University",
        aps_minimum: 5,
      },
      {
        name: "Chef",
        field: "Hospitality & Tourism",
        description:
          "Prepares and creates dishes in restaurants, hotels, and other food establishments.",
        subjects_needed: "Hospitality Studies, English, Consumer Studies",
        study_path:
          "National Certificate in Food Preparation (2 years) OR Diploma in Culinary Arts",
        institutions:
          "Cape Peninsula University of Technology, Central University of Technology, Tshwane University of Technology, Boland TVET College, Buffalo City TVET College",
        aps_minimum: 4,
      },
      {
        name: "Tour Guide",
        field: "Hospitality & Tourism",
        description:
          "Leads groups through tourist attractions, explaining sites and cultural points of interest.",
        subjects_needed: "History, Geography, Languages, Tourism",
        study_path:
          "National Certificate in Tourism (1-2 years) OR Diploma in Tourism Management",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Boland TVET College, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Tourism Manager",
        field: "Hospitality & Tourism",
        description:
          "Manages tourism operations, marketing, and guest experiences.",
        subjects_needed: "Tourism, English, Business Studies",
        study_path: "Bachelor of Tourism Management (3-4 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Nelson Mandela University, University of Johannesburg, UNISA",
        aps_minimum: 5,
      },

      // ==================== TVET / SKILLED TRADES ====================
      {
        name: "Electrician",
        field: "TVET & Skilled Trades",
        description:
          "Installs, maintains, and repairs electrical wiring, systems, and equipment.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate (NCV) in Electrical Engineering (3 years) OR Apprenticeship",
        institutions:
          "Vaal University of Technology, Tshwane South TVET College, Ekurhuleni East TVET College, Port Elizabeth TVET College",
        aps_minimum: 4,
      },
      {
        name: "Welder",
        field: "TVET & Skilled Trades",
        description: "Joins metal parts together using heat and pressure.",
        subjects_needed:
          "Engineering Graphics and Design, Physical Sciences, Mathematics",
        study_path:
          "National Certificate in Welding (3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Buffalo City TVET College, Ekurhuleni East TVET College",
        aps_minimum: 3,
      },
      {
        name: "Plumber",
        field: "TVET & Skilled Trades",
        description:
          "Installs, maintains, and repairs water and drainage systems.",
        subjects_needed:
          "Mathematics, Engineering Graphics and Design, Physical Sciences",
        study_path:
          "National Certificate in Plumbing (3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Tshwane South TVET College, Port Elizabeth TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },
      {
        name: "Carpenter",
        field: "TVET & Skilled Trades",
        description:
          "Builds, installs, and repairs wooden structures, furniture, and fixtures.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Carpentry (3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Tshwane South TVET College, Port Elizabeth TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },
      {
        name: "Fitter and Turner",
        field: "TVET & Skilled Trades",
        description:
          "Manufactures and repairs metal components for machinery and equipment.",
        subjects_needed:
          "Mathematics, Physical Sciences, Engineering Graphics and Design",
        study_path:
          "National Certificate in Fitting and Turning (3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Ekurhuleni East TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },
      {
        name: "Boilermaker",
        field: "TVET & Skilled Trades",
        description:
          "Assembles, installs, and repairs boilers and pressure vessels.",
        subjects_needed:
          "Mathematics, Physical Sciences, Engineering Graphics and Design",
        study_path:
          "National Certificate in Boilermaking (3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Ekurhuleni East TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },

      // ==================== LAW & LEGAL STUDIES ====================
      {
        name: "Lawyer (Attorney)",
        field: "Law & Legal Studies",
        description:
          "Advises and represents clients in legal matters, drafts documents, and appears in court.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "BA Law (3 years) → LLB (2 years) → Articles of Clerkship (2 years) → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University, University of Fort Hare, Nelson Mandela University, UNISA",
        aps_minimum: 6,
      },
      {
        name: "Paralegal",
        field: "Law & Legal Studies",
        description:
          "Supports lawyers by conducting research, drafting documents, and organizing case files.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "National Certificate in Paralegal Studies (1-2 years) OR Diploma",
        institutions:
          "UNISA, Tshwane University of Technology, Cape Peninsula University of Technology, Various TVET Colleges",
        aps_minimum: 4,
      },

      // ==================== ICT & DIGITAL MEDIA ====================
      {
        name: "Software Developer",
        field: "ICT & Digital Media",
        description:
          "Designs and builds software applications for various platforms.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / BEng Software Engineering (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Web Developer",
        field: "ICT & Digital Media",
        description: "Designs and develops websites and web applications.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / Diploma in Web Development (3 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Cybersecurity Analyst",
        field: "ICT & Digital Media",
        description:
          "Protects computer systems and networks from cyber threats.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology in Cybersecurity (3 years) OR Certifications",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Network Administrator",
        field: "ICT & Digital Media",
        description: "Maintains and manages computer networks and systems.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) OR National Diploma in IT",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Data Analyst",
        field: "ICT & Digital Media",
        description:
          "Analyses data to inform business and operational decisions.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Science in Data Science / Statistics (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Data Scientist",
        field: "ICT & Digital Media",
        description:
          "Uses advanced analytics to extract insights from complex data.",
        subjects_needed:
          "Mathematics, Statistics, English, Information Technology",
        study_path:
          "Bachelor of Science in Data Science / Computer Science (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 7,
      },

      // ==================== AGRICULTURE & ENVIRONMENTAL STUDIES ====================
      {
        name: "Agricultural Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Researches and improves crop production, soil health, and farming practices.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, Agricultural Sciences",
        study_path: "Bachelor of Science in Agriculture (4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, University of Fort Hare, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Veterinarian",
        field: "Agriculture & Environmental Studies",
        description: "Diagnoses and treats animal illnesses and injuries.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "Bachelor of Veterinary Science (BVSc) (6 years) → Registration",
        institutions:
          "University of Pretoria, University of Cape Town (Postgrad), Sefako Makgatho Health Sciences University",
        aps_minimum: 7,
      },
      {
        name: "Environmental Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies environmental issues and develops solutions to protect ecosystems.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, Geography",
        study_path: "Bachelor of Science in Environmental Science (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, University of the Free State",
        aps_minimum: 5,
      },
      {
        name: "Conservation Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Works to protect and manage natural resources and wildlife.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path:
          "Bachelor of Science in Environmental Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Wildlife Biologist",
        field: "Agriculture & Environmental Studies",
        description: "Studies animals and their ecosystems.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path:
          "Bachelor of Science in Zoology / Wildlife Science (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },

      // ==================== BUILT ENVIRONMENT & CONSTRUCTION ====================
      {
        name: "Architect",
        field: "Built Environment & Construction",
        description:
          "Designs buildings and structures, considering aesthetics, function, and safety.",
        subjects_needed: "Mathematics, Physical Sciences, Visual Arts, English",
        study_path:
          "Bachelor of Architectural Studies (3 years) → Masters in Architecture (2 years) → Practical Training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, Tshwane University of Technology",
        aps_minimum: 6,
      },
      {
        name: "Quantity Surveyor",
        field: "Built Environment & Construction",
        description:
          "Manages the cost of construction projects, from budgeting to final accounts.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Quantity Surveying (3-4 years) → Practical Training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Construction Manager",
        field: "Built Environment & Construction",
        description:
          "Oversees construction projects, manages workers, and ensures deadlines and budgets are met.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "Bachelor of Construction Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Urban Planner",
        field: "Built Environment & Construction",
        description: "Plans land use and community development projects.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path: "Bachelor of Urban and Regional Planning (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },

      // ==================== TRANSPORT & LOGISTICS ====================
      {
        name: "Logistics Manager",
        field: "Transport & Logistics",
        description:
          "Oversees the movement of goods, supply chains, and distribution operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Logistics (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Supply Chain Manager",
        field: "Transport & Logistics",
        description:
          "Manages procurement, production, and distribution of goods and services.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Supply Chain Management (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Warehouse Manager",
        field: "Transport & Logistics",
        description: "Manages warehouse operations, inventory, and staff.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Supply Chain Management (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Fleet Manager",
        field: "Transport & Logistics",
        description: "Manages the vehicles and drivers of an organisation.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Transport Management (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
    ];

    for (const career of careers) {
      await db.runAsync(
        "INSERT INTO careers (name, field, description, subjects_needed, study_path, institutions, aps_minimum) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          career.name,
          career.field,
          career.description,
          career.subjects_needed,
          career.study_path,
          career.institutions,
          career.aps_minimum,
        ],
      );
    }

    console.log("✅ Careers seeded successfully");
  } catch (error) {
    console.error("❌ Seed careers error:", error);
  }
};

export const seedIndustries = async () => {
  try {
    const existing = await db.getAllAsync("SELECT id FROM industries LIMIT 1");
    if (existing.length > 0) {
      console.log("ℹ️ Industries already seeded, skipping");
      return;
    }

    const industries = [
      // ============ INDUSTRIES IN THE EASTERN CAPE ============
      {
        name: "Automotive Manufacturing",
        sector: "Manufacturing",
        location: "Gqeberha, Kariega, East London",
        specialization:
          "Vehicle assembly, car parts production, exports, logistics",
        jobs_available:
          "Mechanical Engineer, Automotive Technician, Welder, Machine Operator, Production Supervisor, Quality Controller, Logistics Coordinator",
        factories:
          "Volkswagen South Africa, Isuzu Motors South Africa, Mercedes-Benz South Africa",
      },
      {
        name: "Agriculture and Agro-processing",
        sector: "Agriculture",
        location: "Sundays River Valley, Mthatha, Komani, Cradock, Stutterheim",
        specialization:
          "Citrus farming, dairy, livestock, wool, maize, forestry, chicory, essential oils, mohair, macadamia",
        jobs_available:
          "Farm Manager, Agricultural Technician, Food Processing Worker, Veterinary Assistant, Dairy Technician, Agricultural Scientist, Packhouse Worker",
        factories:
          "Clover South Africa, Woodlands Dairy, Coega Dairy, SAB, PG Bison",
      },
      {
        name: "Tourism and Hospitality",
        sector: "Tourism",
        location:
          "Jeffreys Bay, Port St Johns, Addo, Coffee Bay, Tsitsikamma, Gqeberha",
        specialization:
          "Beach tourism, game reserves, cultural tourism, hotels, eco-tourism",
        jobs_available:
          "Tour Guide, Chef, Hotel Receptionist, Lodge Manager, Hospitality Worker, Game Ranger, Activities Coordinator",
        factories: "Various hotels and lodges",
      },
      {
        name: "Renewable Energy",
        sector: "Energy",
        location: "Cookhouse, Jeffreys Bay, Oyster Bay, Bedford, Coega SEZ",
        specialization:
          "Wind farms, solar energy projects, green energy infrastructure",
        jobs_available:
          "Wind Turbine Technician, Electrical Engineer, Solar Installer, Project Manager, Site Supervisor, Maintenance Technician",
        factories: "Various renewable energy projects (wind and solar farms)",
      },
      {
        name: "Business Process Outsourcing (BPO)",
        sector: "Services",
        location: "East London, Gqeberha, Bhisho",
        specialization:
          "Customer service, technical support, international call centres, IT support",
        jobs_available:
          "Call Centre Agent, Customer Service Consultant, IT Support Technician, Team Leader, Quality Assurance Analyst, Training Coordinator",
        factories: "Various BPO companies",
      },
      {
        name: "Manufacturing and Industrial Development",
        sector: "Manufacturing",
        location: "Coega SEZ, East London IDZ, Gqeberha, Kariega",
        specialization:
          "Steel, chemicals, electronics, textiles, plastics, industrial production",
        jobs_available:
          "Industrial Engineer, Factory Worker, Maintenance Technician, Quality Controller, Production Manager, Supply Chain Coordinator",
        factories: "Coega SEZ, East London IDZ, DFA Manufacturing",
      },
      {
        name: "Logistics and Transport",
        sector: "Logistics",
        location: "Ngqura Port, Gqeberha, East London Harbour, Coega SEZ",
        specialization:
          "Shipping, warehousing, ports, freight movement, storage and distribution",
        jobs_available:
          "Logistics Coordinator, Customs Officer, Warehouse Manager, Truck Driver, Shipping Clerk, Freight Forwarder, Port Operations Supervisor",
        factories: "Transnet, various logistics companies",
      },
      {
        name: "Information and Communication Technology (ICT)",
        sector: "Technology",
        location: "Gqeberha, East London, Makhanda",
        specialization:
          "Telecommunications, software support, digital services, network infrastructure",
        jobs_available:
          "Software Developer, Network Administrator, Data Analyst, Cybersecurity Technician, IT Support Specialist, Systems Engineer",
        factories: "Various ICT companies and startups",
      },
      {
        name: "Construction and Infrastructure",
        sector: "Construction",
        location: "Gqeberha, East London, Mthatha, Coega SEZ",
        specialization:
          "Roads, housing projects, public infrastructure, commercial buildings, industrial construction",
        jobs_available:
          "Civil Engineer, Architect, Electrician, Plumber, Quantity Surveyor, Construction Manager, Site Supervisor, Bricklayer",
        factories: "Various construction companies",
      },
      {
        name: "Healthcare and Social Services",
        sector: "Healthcare",
        location: "East London, Mthatha, Gqeberha, Bhisho",
        specialization:
          "Hospitals, clinics, healthcare services, pharmaceuticals, community health",
        jobs_available:
          "Nurse, Doctor, Pharmacist, Social Worker, Healthcare Administrator, Pharmacist Assistant, Laboratory Technician",
        factories: "Aspen Pharmacare, various hospitals and clinics",
      },
      {
        name: "Education and Training",
        sector: "Education",
        location: "Makhanda, Alice, Gqeberha, Mthatha, East London",
        specialization:
          "Schools, universities, vocational training colleges, ECD centres",
        jobs_available:
          "Teacher, Lecturer, Administrator, Education Consultant, School Principal, Curriculum Developer, ECD Practitioner",
        factories: "Various educational institutions",
      },
      {
        name: "Retail and Commerce",
        sector: "Retail",
        location: "East London, Gqeberha, Mthatha, Coega",
        specialization:
          "Shopping centres, wholesale, consumer goods, supermarkets, fashion, electronics",
        jobs_available:
          "Sales Assistant, Cashier, Merchandiser, Store Manager, Supply Chain Assistant, Buyer, Visual Merchandiser",
        factories: "Various retail stores and shopping malls",
      },
      {
        name: "Forestry and Timber Processing",
        sector: "Agriculture",
        location: "Mkhondo, Eastern Cape operations, Stutterheim, Tsitsikamma",
        specialization:
          "Forestry plantations, timber processing, wood panel manufacturing, pulp and paper",
        jobs_available:
          "Machine Operator, Carpenter, Maintenance Technician, Forester, Timber Harvester, Wood Panel Manufacturer",
        factories: "PG Bison, various sawmills and timber processors",
      },
      {
        name: "Plastics Manufacturing",
        sector: "Manufacturing",
        location: "Coega SEZ, Gqeberha, East London",
        specialization:
          "Plastic production, packaging materials, plastic components, recycling",
        jobs_available:
          "Machine Operator, Quality Controller, Production Planner, Maintenance Technician, Materials Handler, Packaging Specialist",
        factories: "Various plastics manufacturers",
      },
      {
        name: "Textile Manufacturing",
        sector: "Manufacturing",
        location: "Gqeberha, East London, Coega SEZ",
        specialization:
          "Fabric production, clothing, textiles, industrial fabrics, uniform manufacturing",
        jobs_available:
          "Textile Technician, Machine Operator, Quality Controller, Fashion Designer, Production Supervisor, Seamstress",
        factories: "Various textile manufacturers",
      },
    ];

    for (const industry of industries) {
      await db.runAsync(
        `INSERT INTO industries (name, sector, location, specialization, jobs_available, factories) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          industry.name,
          industry.sector,
          industry.location,
          industry.specialization,
          industry.jobs_available,
          industry.factories,
        ],
      );
    }

    console.log("✅ Industries seeded successfully");
  } catch (error) {
    console.error("❌ Seed industries error:", error);
  }
};
// ==================== SCHOOL FUNCTIONS ====================
export const getSchools = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM schools");
  } catch (error) {
    console.error("❌ Get schools error:", error);
    return [];
  }
};

export const searchSchools = async (query: string) => {
  try {
    return await db.getAllAsync("SELECT * FROM schools WHERE name LIKE ?", [
      `%${query}%`,
    ]);
  } catch (error) {
    console.error("❌ Search schools error:", error);
    return [];
  }
};

export const filterSchools = async (province: string, type: string) => {
  try {
    return await db.getAllAsync(
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
    const result = await db.getAllAsync("SELECT * FROM schools WHERE id = ?", [
      id,
    ]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get school by ID error:", error);
    return null;
  }
};

export const getSchoolContacts = async (schoolId: number) => {
  try {
    const result = await db.getAllAsync(
      "SELECT * FROM school_contacts WHERE school_id = ?",
      [schoolId],
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get school contacts error:", error);
    return null;
  }
};

// ==================== SUBJECT FUNCTIONS ====================
export const getSubjects = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM subjects");
  } catch (error) {
    console.error("❌ Get subjects error:", error);
    return [];
  }
};

export const getSubjectsByStream = async (stream: string) => {
  try {
    if (stream === "All") {
      return await getSubjects();
    }
    return await db.getAllAsync("SELECT * FROM subjects WHERE stream = ?", [
      stream,
    ]);
  } catch (error) {
    console.error("❌ Get subjects by stream error:", error);
    return [];
  }
};

export const getSubjectById = async (id: number) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM subjects WHERE id = ?", [
      id,
    ]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get subject error:", error);
    return null;
  }
};

// ==================== CAREER FUNCTIONS ====================
export const getCareers = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM careers ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get careers error:", error);
    return [];
  }
};

export const getCareerById = async (id: number) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM careers WHERE id = ?", [
      id,
    ]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ Get career by ID error:", error);
    return null;
  }
};

export const searchCareers = async (text: string) => {
  try {
    return await db.getAllAsync("SELECT * FROM careers WHERE name LIKE ?", [
      `%${text}%`,
    ]);
  } catch (error) {
    console.error("❌ Search careers error:", error);
    return [];
  }
};


export const getCareersByStream = async (stream: string) => {
  try {
    if (stream === "All") {
      return await getCareers();
    }
    return await db.getAllAsync("SELECT * FROM careers WHERE stream = ?", [
      stream,
    ]);
  } catch (error) {
    console.error("❌ Get careers by stream error:", error);
    return [];
  }
};// ================= APS FUNCTIONS =================

export const getApsPoints = (percentage: number): number => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
};

// ==================== INDUSTRY FUNCTIONS ====================
export const getIndustries = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM industries ORDER BY name ASC");
  } catch (error) {
    console.error("❌ Get industries error:", error);
    return [];
  }
};

export default db;
