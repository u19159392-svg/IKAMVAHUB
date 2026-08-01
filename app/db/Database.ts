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
   DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER NOT NULL,
 age TEXT,
 gender TEXT,
 school TEXT,
 grade TEXT,
 career_interest TEXT,
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
    const existingUser = await db.getAllAsync(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    console.log("Existing users:", existingUser);

    if (existingUser.length > 0) {
      console.log("ℹ️ User already exists");
      return (existingUser[0] as any).id;
    }

    const result = await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password || ""],
    );

    console.log("✅ User created");
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
      `
      INSERT INTO profiles 
      (
        user_id,
        age,
        gender,
        school,
        grade,
        career_interest,
        bio,
        profile_pic,
        phone,
        location
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.user_id,
        data.age || "",
        data.gender || "",
        data.school || "",
        data.grade || "",
        data.career_interest || "",
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
      // ==================== SCIENCE & HEALTH SCIENCES (150+) ====================
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
        study_path: "MBChB → Internship → Community Service → Registration",
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
        name: "Emergency Medicine Physician",
        field: "Science & Health Sciences",
        description:
          "Provides emergency medical care in hospital emergency departments.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Emergency Medicine training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 7,
      },
      {
        name: "Registered Nurse",
        field: "Science & Health Sciences",
        description:
          "Provides patient care, administers medication, and assists doctors.",
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
        name: "Critical Care Nurse",
        field: "Science & Health Sciences",
        description:
          "Provides specialized care to critically ill patients in ICUs.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Critical Care training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Paediatric Nurse",
        field: "Science & Health Sciences",
        description:
          "Specialises in nursing care for infants, children, and adolescents.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Paediatric Nursing training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
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
        name: "Community Health Nurse",
        field: "Science & Health Sciences",
        description: "Provides healthcare services in community settings.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Community Health training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
      },
      {
        name: "Psychiatric Nurse",
        field: "Science & Health Sciences",
        description: "Specialises in mental health nursing care.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Psychiatric Nursing training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
      },
      {
        name: "Operating Theatre Nurse",
        field: "Science & Health Sciences",
        description:
          "Assists in surgical operations and manages operating theatre equipment.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Operating Theatre training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
      },
      {
        name: "Geriatric Nurse",
        field: "Science & Health Sciences",
        description: "Specialises in nursing care for elderly patients.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Geriatric Nursing training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
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
        name: "Haematologist",
        field: "Science & Health Sciences",
        description: "Specialises in blood disorders and diseases.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "MBChB → Internship → Community Service → Haematology training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 8,
      },
      {
        name: "Microbiologist",
        field: "Science & Health Sciences",
        description: "Studies microorganisms and their effects on humans.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Microbiology (3 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Virologist",
        field: "Science & Health Sciences",
        description: "Studies viruses and viral diseases.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Virology (3 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Immunologist",
        field: "Science & Health Sciences",
        description: "Studies the immune system and immune responses.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Immunology (3 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Biochemist (Medical focus)",
        field: "Science & Health Sciences",
        description:
          "Studies chemical processes in living organisms related to medicine.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Biochemistry (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Histotechnologist",
        field: "Science & Health Sciences",
        description: "Prepares tissue samples for microscopic examination.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "National Diploma in Biomedical Technology (3 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Various TVET Colleges",
        aps_minimum: 5,
      },
      {
        name: "Cytotechnologist",
        field: "Science & Health Sciences",
        description: "Examines cells for abnormalities and diseases.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "National Diploma in Biomedical Technology (3 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Various TVET Colleges",
        aps_minimum: 5,
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
        name: "Periodontist",
        field: "Science & Health Sciences",
        description: "Specialises in the treatment of gum diseases.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "BDS → Internship → Community Service → Periodontology training → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 8,
      },
      {
        name: "Prosthodontist",
        field: "Science & Health Sciences",
        description:
          "Specialises in dental prosthetics like crowns, bridges, and dentures.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "BDS → Internship → Community Service → Prosthodontics training → Registration",
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
        name: "Dental Therapist",
        field: "Science & Health Sciences",
        description: "Provides basic dental care and treatment to patients.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Diploma in Dental Therapy (2-3 years) → Registration",
        institutions:
          "University of the Western Cape, University of Pretoria, University of KwaZulu-Natal",
        aps_minimum: 5,
      },
      {
        name: "Dental Assistant",
        field: "Science & Health Sciences",
        description:
          "Assists dentists in clinical procedures and patient care.",
        subjects_needed: "Mathematics, English",
        study_path:
          "Certificate in Dental Assisting (1-2 years) → Registration",
        institutions:
          "Various TVET Colleges, University of the Western Cape, University of Pretoria",
        aps_minimum: 4,
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
        name: "Mental Health Nurse",
        field: "Science & Health Sciences",
        description:
          "Provides nursing care to patients with mental health conditions.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Psychiatric training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
      },
      {
        name: "Addiction Counsellor",
        field: "Science & Health Sciences",
        description:
          "Supports individuals struggling with substance abuse and addiction.",
        subjects_needed: "Psychology, Life Orientation, English",
        study_path: "Diploma in Addiction Counselling (1-2 years)",
        institutions:
          "Various TVET Colleges, UNISA, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Psychotherapist",
        field: "Science & Health Sciences",
        description: "Provides therapy to individuals, couples, and groups.",
        subjects_needed: "Psychology, English, Life Orientation",
        study_path:
          "BA Psychology (3 years) → Honours → Masters in Psychotherapy → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Behavioural Therapist",
        field: "Science & Health Sciences",
        description:
          "Uses behavior modification techniques to treat mental health conditions.",
        subjects_needed: "Psychology, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Behavioural Therapy training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 6,
      },
      {
        name: "Physiotherapist",
        field: "Science & Health Sciences",
        description:
          "Helps patients recover from injuries, surgeries, and physical conditions.",
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
        name: "Prosthetist and Orthotist",
        field: "Science & Health Sciences",
        description: "Designs and fits prostheses and orthoses for patients.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "Bachelor of Prosthetics and Orthotics (4 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Respiratory Therapist",
        field: "Science & Health Sciences",
        description:
          "Provides respiratory care and therapy to patients with breathing difficulties.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "Bachelor of Respiratory Therapy (4 years) → Registration",
        institutions:
          "University of Cape Town, University of the Witwatersrand, University of Pretoria, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Chiropractor",
        field: "Science & Health Sciences",
        description:
          "Diagnoses and treats musculoskeletal conditions through spinal manipulation.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "Bachelor of Chiropractic (5-6 years) → Registration",
        institutions:
          "University of Johannesburg, Durban University of Technology",
        aps_minimum: 6,
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
      {
        name: "Health Promotion Officer",
        field: "Science & Health Sciences",
        description:
          "Promotes health and wellness in communities through education and outreach.",
        subjects_needed: "Life Orientation, English, Life Sciences",
        study_path: "Certificate/Diploma in Health Promotion (1-3 years)",
        institutions:
          "Various TVET Colleges, University of Cape Town, Stellenbosch University, University of Pretoria",
        aps_minimum: 4,
      },
      {
        name: "Environmental Health Practitioner",
        field: "Science & Health Sciences",
        description:
          "Protects public health by monitoring and improving environmental conditions.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "Bachelor of Environmental Health (4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Occupational Health Specialist",
        field: "Science & Health Sciences",
        description: "Promotes health and safety in the workplace.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Bachelor of Occupational Health (4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Health Data Scientist",
        field: "Science & Health Sciences",
        description:
          "Analyses health data to improve patient outcomes and healthcare systems.",
        subjects_needed: "Mathematics, Statistics, English",
        study_path:
          "BSc Data Science / Health Informatics (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Biostatistician",
        field: "Science & Health Sciences",
        description:
          "Applies statistical methods to biological and health data.",
        subjects_needed: "Mathematics, Statistics, Life Sciences, English",
        study_path: "BSc Biostatistics (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Health Policy Analyst",
        field: "Science & Health Sciences",
        description: "Analyses health policies and recommends improvements.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "Bachelor of Public Health (3 years) → Postgraduate training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Infection Control Specialist",
        field: "Science & Health Sciences",
        description:
          "Prevents and controls the spread of infections in healthcare settings.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Nursing (4 years) → Infection Control training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Community Health Worker",
        field: "Science & Health Sciences",
        description:
          "Provides basic healthcare education and support in communities.",
        subjects_needed: "Life Orientation, English",
        study_path: "Certificate in Community Health Work (1-2 years)",
        institutions: "Various TVET Colleges, NGOs",
        aps_minimum: 3,
      },
      {
        name: "Biomedical Scientist",
        field: "Science & Health Sciences",
        description:
          "Researches biological processes and diseases at the molecular level.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Biomedical Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Biomedical Engineer",
        field: "Science & Health Sciences",
        description: "Designs and develops medical devices and equipment.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path: "BSc Biomedical Engineering (4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Clinical Research Coordinator",
        field: "Science & Health Sciences",
        description:
          "Manages clinical research studies and ensures compliance with regulations.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Health Sciences (3 years) → Clinical Research training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Medical Research Scientist",
        field: "Science & Health Sciences",
        description:
          "Conducts research to advance medical knowledge and treatments.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "BSc Medical Research (3-4 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Pharmacologist",
        field: "Science & Health Sciences",
        description:
          "Studies the effects of drugs and chemicals on the human body.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Pharmacology (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Toxicologist",
        field: "Science & Health Sciences",
        description:
          "Studies the harmful effects of chemicals and toxins on living organisms.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Toxicology (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Geneticist",
        field: "Science & Health Sciences",
        description: "Studies genes, heredity, and genetic disorders.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Genetics (3-4 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Molecular Biologist",
        field: "Science & Health Sciences",
        description: "Studies biological processes at the molecular level.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "BSc Molecular Biology (3-4 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Stem Cell Researcher",
        field: "Science & Health Sciences",
        description:
          "Conducts research on stem cells and their potential for treating diseases.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "BSc Biomedical Science (3-4 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Drug Development Scientist",
        field: "Science & Health Sciences",
        description: "Researches and develops new pharmaceutical drugs.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path:
          "BSc Pharmaceutical Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Clinical Trial Scientist",
        field: "Science & Health Sciences",
        description:
          "Designs and manages clinical trials for new drugs and treatments.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Health Sciences (3 years) → Clinical Research training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
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
        name: "Hospital Pharmacist",
        field: "Science & Health Sciences",
        description: "Manages pharmaceutical services in hospitals.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Pharmacy (BPharm) → Internship → Community Service → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Industrial Pharmacist",
        field: "Science & Health Sciences",
        description:
          "Works in the pharmaceutical industry in research, development, and quality assurance.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "Bachelor of Pharmacy (BPharm) → Industrial training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Pharmaceutical Scientist",
        field: "Science & Health Sciences",
        description:
          "Conducts research to develop new pharmaceuticals and improve existing ones.",
        subjects_needed:
          "Mathematics, Physical Sciences, Life Sciences, English",
        study_path:
          "BSc Pharmaceutical Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
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
        name: "Pharmaceutical Sales Representative",
        field: "Science & Health Sciences",
        description:
          "Promotes and sells pharmaceutical products to healthcare professionals.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path: "Bachelor of Pharmacy/BSc (3-4 years) → Sales training",
        institutions: "Various universities and training institutions",
        aps_minimum: 5,
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
        name: "Emergency Care Practitioner",
        field: "Science & Health Sciences",
        description:
          "Provides advanced emergency medical care in pre-hospital settings.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Bachelor of Emergency Medical Care (4 years) → Registration",
        institutions:
          "University of Cape Town, University of Johannesburg, Cape Peninsula University of Technology, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Advanced Life Support Paramedic",
        field: "Science & Health Sciences",
        description: "Provides advanced life support in emergency situations.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma in Emergency Medical Care (3 years) → Advanced training → Registration",
        institutions:
          "Cape Peninsula University of Technology, Central University of Technology, University of Johannesburg",
        aps_minimum: 4,
      },
      {
        name: "Ambulance Emergency Assistant",
        field: "Science & Health Sciences",
        description: "Provides basic emergency care and assists paramedics.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "National Certificate in Emergency Care (1-2 years) → Registration",
        institutions:
          "Various TVET Colleges, Cape Peninsula University of Technology, Central University of Technology",
        aps_minimum: 3,
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
        name: "Trauma Nurse",
        field: "Science & Health Sciences",
        description: "Provides specialized nursing care to trauma patients.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Nursing → Trauma Nursing training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
      },
      {
        name: "Disaster Response Medic",
        field: "Science & Health Sciences",
        description:
          "Provides emergency medical care during disasters and mass casualty events.",
        subjects_needed: "Mathematics, Life Sciences, English",
        study_path:
          "Diploma/Bachelor in Emergency Care (3-4 years) → Disaster training → Registration",
        institutions:
          "University of Cape Town, University of Johannesburg, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },

      // ==================== ENGINEERING & TECHNOLOGY (80+) ====================
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
        name: "Mining Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and manages mining operations and mineral extraction.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of KwaZulu-Natal",
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
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
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
        name: "Computer Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops computer hardware and software systems.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
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
        name: "Telecommunications Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and maintains telecommunications systems and networks.",
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
        name: "Artificial Intelligence Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and develops AI systems and machine learning models.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Bachelor of Computer Science / AI Engineering (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Machine Learning Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and implements machine learning algorithms and models.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / Data Science (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Cybersecurity Analyst / Engineer",
        field: "Engineering & Technology",
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
        name: "Data Engineer",
        field: "Engineering & Technology",
        description: "Designs and builds data pipelines and infrastructure.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / Data Engineering (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Cloud Engineer",
        field: "Engineering & Technology",
        description: "Designs and manages cloud computing infrastructure.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Cloud Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "DevOps Engineer",
        field: "Engineering & Technology",
        description: "Manages software development and deployment processes.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → DevOps training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Information Technology Specialist",
        field: "Engineering & Technology",
        description: "Manages and supports IT systems and infrastructure.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) OR National Diploma in IT",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Computer Technician",
        field: "Engineering & Technology",
        description: "Repairs and maintains computer hardware and software.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Certificate/Diploma in Computer Technology (1-3 years)",
        institutions:
          "Various TVET Colleges, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Game Developer",
        field: "Engineering & Technology",
        description: "Designs and develops video games for various platforms.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Bachelor of Computer Science / Game Design (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Web Developer",
        field: "Engineering & Technology",
        description: "Designs and develops websites and web applications.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / Diploma in Web Development (3 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "App Developer",
        field: "Engineering & Technology",
        description:
          "Designs and develops mobile applications for Android and iOS.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / App Development (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "UX/UI Designer",
        field: "Engineering & Technology",
        description:
          "Designs user interfaces and user experiences for digital products.",
        subjects_needed: "Visual Arts, English, Information Technology",
        study_path: "BA in Digital Design / UX Design (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Database Administrator",
        field: "Engineering & Technology",
        description: "Manages and maintains database systems.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Database Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Systems Analyst",
        field: "Engineering & Technology",
        description:
          "Analyses and designs information systems to solve business problems.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Bachelor of Information Technology (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
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
      {
        name: "Transportation Engineer",
        field: "Engineering & Technology",
        description:
          "Designs and manages transportation systems and infrastructure.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Science in Engineering (BSc Eng) (4 years) → Practical Training → Registration with ECSA",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },

      // ==================== COMMERCE & BUSINESS (70+) ====================
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
        name: "Auditor",
        field: "Commerce & Business",
        description: "Reviews and verifies financial records and statements.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Accounting (3 years) → Honours → SAICA Qualifying Exam → Articles (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
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
        name: "Banker",
        field: "Commerce & Business",
        description:
          "Manages financial transactions, accounts, and banking services.",
        subjects_needed: "Mathematics, English, Accounting",
        study_path: "Bachelor of Commerce (3 years) → Banking training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
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
        name: "Insurance Broker",
        field: "Commerce & Business",
        description:
          "Advises clients on insurance policies and manages insurance portfolios.",
        subjects_needed: "Mathematics, English, Accounting",
        study_path: "Bachelor of Commerce (3 years) → Insurance training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Risk Manager",
        field: "Commerce & Business",
        description: "Identifies and manages risks in organisations.",
        subjects_needed: "Mathematics, English, Accounting",
        study_path: "Bachelor of Commerce (3 years) → Risk Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Tax Consultant",
        field: "Commerce & Business",
        description:
          "Advises clients on tax planning, compliance, and tax strategies.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path:
          "Bachelor of Commerce in Accounting (3 years) → Honours → Tax training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Business Analyst",
        field: "Commerce & Business",
        description:
          "Analyses business processes and identifies improvement opportunities.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce (3 years) → Business Analysis training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Management Consultant",
        field: "Commerce & Business",
        description:
          "Advises organisations on management, strategy, and operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → MBA → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Human Resource Manager",
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
        name: "Digital Marketer",
        field: "Commerce & Business",
        description: "Develops and implements digital marketing strategies.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce in Marketing (3 years) → Digital Marketing training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Sales Manager",
        field: "Commerce & Business",
        description: "Oversees sales teams and develops sales strategies.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce (3 years) → Sales Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Brand Manager",
        field: "Commerce & Business",
        description:
          "Manages brand strategy, positioning, and marketing campaigns.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Marketing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Supply Chain Manager",
        field: "Commerce & Business",
        description:
          "Oversees logistics, procurement, and distribution of goods and services.",
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
        name: "Operations Manager",
        field: "Commerce & Business",
        description: "Manages day-to-day operations and ensures efficiency.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce (3 years) → Operations Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Project Manager",
        field: "Commerce & Business",
        description: "Manages projects from initiation to completion.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce (3 years) → Project Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
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
      {
        name: "Business Owner",
        field: "Commerce & Business",
        description:
          "Owns and operates a business, managing all aspects of operations.",
        subjects_needed: "Mathematics, Business Studies, Economics, English",
        study_path:
          "Various — Degree in Business, Entrepreneurship programs, or direct experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Retail Manager",
        field: "Commerce & Business",
        description:
          "Manages retail store operations, staff, and customer service.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce (3 years) → Retail Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Procurement Officer",
        field: "Commerce & Business",
        description:
          "Manages the procurement of goods and services for organisations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Procurement training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Public Relations Officer",
        field: "Commerce & Business",
        description:
          "Manages the public image and communications of organisations.",
        subjects_needed: "English, Business Studies, Mathematics",
        study_path: "Bachelor of Arts in Public Relations (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Corporate Lawyer",
        field: "Commerce & Business",
        description:
          "Advises on corporate law, mergers, acquisitions, and business transactions.",
        subjects_needed: "English, History, Mathematics",
        study_path: "BA Law (3 years) → LLB (2 years) → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Compliance Officer",
        field: "Commerce & Business",
        description:
          "Ensures organisations comply with legal and regulatory requirements.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Compliance training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },

      // ==================== HUMANITIES & SOCIAL SCIENCES ====================
      {
        name: "Sociologist",
        field: "Humanities & Social Sciences",
        description: "Studies society, human behavior, and social structures.",
        subjects_needed: "English, History, Geography",
        study_path: "BA Sociology (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Anthropologist",
        field: "Humanities & Social Sciences",
        description: "Studies human cultures, societies, and evolution.",
        subjects_needed: "English, History, Geography",
        study_path: "BA Anthropology (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Psychologist",
        field: "Humanities & Social Sciences",
        description: "Studies human behavior, thoughts, and emotions.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Honours → Masters → Internship → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, University of Fort Hare",
        aps_minimum: 6,
      },
      {
        name: "Social Worker",
        field: "Humanities & Social Sciences",
        description:
          "Supports individuals and communities in need of social services.",
        subjects_needed: "English, Life Orientation, History",
        study_path:
          "Bachelor of Social Work (4 years) → Registration with SACSSP",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University, University of Fort Hare",
        aps_minimum: 5,
      },
      {
        name: "Criminologist",
        field: "Humanities & Social Sciences",
        description: "Studies crime, criminal behavior, and justice systems.",
        subjects_needed: "English, History, Mathematics",
        study_path: "BA Criminology (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Political Scientist",
        field: "Humanities & Social Sciences",
        description:
          "Studies political systems, governance, and political behavior.",
        subjects_needed: "English, History, Mathematics",
        study_path: "BA Political Science (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "International Relations Specialist",
        field: "Humanities & Social Sciences",
        description:
          "Studies international relations, diplomacy, and global politics.",
        subjects_needed: "English, History, Geography",
        study_path: "BA International Relations (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Historian",
        field: "Humanities & Social Sciences",
        description: "Studies and interprets historical events and documents.",
        subjects_needed: "History, English, Geography",
        study_path: "BA History (3 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Archaeologist",
        field: "Humanities & Social Sciences",
        description: "Studies human history through excavation and artifacts.",
        subjects_needed: "History, Geography, English",
        study_path: "BA Archaeology (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Geographer",
        field: "Humanities & Social Sciences",
        description: "Studies the Earth's physical and human geography.",
        subjects_needed: "Geography, Mathematics, English",
        study_path: "BA Geography (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Development Studies Specialist",
        field: "Humanities & Social Sciences",
        description:
          "Studies development, poverty, and social change in developing countries.",
        subjects_needed: "Geography, English, History",
        study_path: "BA Development Studies (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Philosopher",
        field: "Humanities & Social Sciences",
        description:
          "Studies fundamental questions about existence, knowledge, and ethics.",
        subjects_needed: "English, History, Mathematics",
        study_path: "BA Philosophy (3 years) → Honours → Masters → PhD",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Linguist",
        field: "Humanities & Social Sciences",
        description: "Studies language structure, meaning, and usage.",
        subjects_needed: "English, Languages, History",
        study_path: "BA Linguistics (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Language Translator / Interpreter",
        field: "Humanities & Social Sciences",
        description: "Translates and interprets written and spoken language.",
        subjects_needed: "Languages, English, History",
        study_path: "BA Translation Studies (3 years) → Professional training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Journalist",
        field: "Humanities & Social Sciences",
        description:
          "Researches and reports news and stories across print, broadcast, and digital media.",
        subjects_needed: "English, History, Languages",
        study_path: "BA in Journalism / Media Studies (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Reporter",
        field: "Humanities & Social Sciences",
        description: "Investigates and reports news stories for media outlets.",
        subjects_needed: "English, History, Languages",
        study_path: "BA in Journalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Editor",
        field: "Humanities & Social Sciences",
        description: "Reviews and edits written content for publication.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English / Journalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Content Writer",
        field: "Humanities & Social Sciences",
        description:
          "Writes content for websites, blogs, and marketing materials.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English / Creative Writing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Rhodes University, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Copywriter",
        field: "Humanities & Social Sciences",
        description: "Writes persuasive copy for advertising and marketing.",
        subjects_needed: "English, Languages, Business Studies",
        study_path: "BA English / Marketing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Rhodes University, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Public Relations Specialist",
        field: "Humanities & Social Sciences",
        description:
          "Manages public relations and communications for organisations.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Public Relations (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Human Rights Advocate",
        field: "Humanities & Social Sciences",
        description: "Promotes and defends human rights.",
        subjects_needed: "English, History, Law",
        study_path: "BA Law (3 years) → LLB (2 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Community Development Practitioner",
        field: "Humanities & Social Sciences",
        description:
          "Works with communities to improve living conditions and social well-being.",
        subjects_needed: "English, Life Orientation, Geography",
        study_path: "BA Community Development (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, University of Fort Hare",
        aps_minimum: 5,
      },
      {
        name: "Counsellor",
        field: "Humanities & Social Sciences",
        description:
          "Provides counselling and emotional support to individuals and groups.",
        subjects_needed: "English, Life Sciences, Psychology",
        study_path:
          "BA Psychology (3 years) → Honours → Counselling training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Fort Hare",
        aps_minimum: 5,
      },

      // ==================== ARTS & CREATIVE FIELDS (60+) ====================
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
          "Designs clothing and accessories, from concept to production.",
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
        name: "Industrial Designer",
        field: "Arts & Creative Fields",
        description:
          "Designs products and industrial equipment for manufacturing.",
        subjects_needed: "Visual Arts, Design Studies, Mathematics",
        study_path: "BA in Industrial Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
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
        name: "Illustrator",
        field: "Arts & Creative Fields",
        description:
          "Creates illustrations for books, magazines, and digital media.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Illustration (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Fine Artist",
        field: "Arts & Creative Fields",
        description:
          "Creates visual art such as painting, sculpture, and mixed media.",
        subjects_needed: "Visual Arts, English, History",
        study_path: "BA in Fine Arts (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Painter",
        field: "Arts & Creative Fields",
        description: "Creates artworks using paint and other media.",
        subjects_needed: "Visual Arts, English, History",
        study_path: "BA in Fine Arts (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Sculptor",
        field: "Arts & Creative Fields",
        description: "Creates three-dimensional artworks in various materials.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Fine Arts (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
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
        name: "Videographer",
        field: "Arts & Creative Fields",
        description: "Captures video content for various media and purposes.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Film / Video Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
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
        name: "Film Producer",
        field: "Arts & Creative Fields",
        description: "Manages film production, budgets, and project logistics.",
        subjects_needed: "English, Business Studies, Visual Arts",
        study_path: "BA in Film Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Screenwriter",
        field: "Arts & Creative Fields",
        description: "Writes screenplays for film and television.",
        subjects_needed: "English, Drama, Visual Arts",
        study_path: "BA in Screenwriting (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
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
      {
        name: "Voice Actor",
        field: "Arts & Creative Fields",
        description:
          "Performs voiceovers for animated characters, commercials, and audio productions.",
        subjects_needed: "Drama, English, Languages",
        study_path: "BA in Dramatic Arts (3-4 years) → Voice training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria",
        aps_minimum: 5,
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
        name: "Singer",
        field: "Arts & Creative Fields",
        description: "Performs vocal music as a soloist or in groups.",
        subjects_needed: "Music, English, Drama",
        study_path: "BMus (3-4 years) OR Practical experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, Tshwane University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Composer",
        field: "Arts & Creative Fields",
        description: "Creates and composes music for various purposes.",
        subjects_needed: "Music, English, Mathematics",
        study_path: "BMus (3-4 years) → Composition training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of the Witwatersrand, University of Pretoria, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Music Producer",
        field: "Arts & Creative Fields",
        description: "Oversees music production, recording, and mixing.",
        subjects_needed: "Music, English, Technology",
        study_path: "BMus (3-4 years) → Production training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Sound Engineer",
        field: "Arts & Creative Fields",
        description: "Manages sound and audio for live events and recordings.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "Diploma in Sound Engineering (2-3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, University of Johannesburg, Central University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Dancer",
        field: "Arts & Creative Fields",
        description: "Performs dance in various styles and settings.",
        subjects_needed: "Drama, Visual Arts, English",
        study_path: "BA in Dance (3-4 years) OR Practical experience",
        institutions:
          "University of Cape Town, Stellenbosch University, Tshwane University of Technology, Cape Peninsula University of Technology, University of Johannesburg",
        aps_minimum: 4,
      },
      {
        name: "Choreographer",
        field: "Arts & Creative Fields",
        description: "Creates and directs dance performances.",
        subjects_needed: "Drama, Visual Arts, English",
        study_path: "BA in Dance (3-4 years) → Choreography training",
        institutions:
          "University of Cape Town, Stellenbosch University, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Makeup Artist",
        field: "Arts & Creative Fields",
        description:
          "Creates makeup looks for film, television, fashion, and special events.",
        subjects_needed: "Visual Arts, Design Studies, English",
        study_path: "Certificate/Diploma in Makeup Artistry (1-2 years)",
        institutions:
          "Various training institutions, Cape Peninsula University of Technology, University of Johannesburg",
        aps_minimum: 4,
      },
      {
        name: "Set Designer",
        field: "Arts & Creative Fields",
        description:
          "Designs sets for theatre, film, and television productions.",
        subjects_needed: "Visual Arts, Design Studies, Drama",
        study_path: "BA in Theatre Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, Tshwane University of Technology, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Costume Designer",
        field: "Arts & Creative Fields",
        description:
          "Designs costumes for theatre, film, and television productions.",
        subjects_needed: "Visual Arts, Design Studies, Drama",
        study_path: "BA in Costume Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, Tshwane University of Technology, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Art Director",
        field: "Arts & Creative Fields",
        description:
          "Oversees the visual and artistic elements of productions.",
        subjects_needed: "Visual Arts, Design Studies, English",
        study_path: "BA in Art Direction / Visual Arts (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Creative Director",
        field: "Arts & Creative Fields",
        description: "Leads creative teams and oversees creative projects.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA in Design / Fine Arts (3-4 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Game Designer",
        field: "Arts & Creative Fields",
        description:
          "Designs game mechanics, levels, and gameplay experiences.",
        subjects_needed: "Visual Arts, English, Information Technology",
        study_path: "BA in Game Design (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Game Artist",
        field: "Arts & Creative Fields",
        description: "Creates visual art and assets for video games.",
        subjects_needed: "Visual Arts, English, Information Technology",
        study_path: "BA in Game Art / Digital Arts (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology, Nelson Mandela University",
        aps_minimum: 5,
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
        name: "Agronomist",
        field: "Agriculture & Environmental Studies",
        description: "Studies and manages crop production and soil management.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, Agricultural Sciences",
        study_path: "Bachelor of Science in Agriculture (4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, University of Fort Hare, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Crop Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Research and develop improved crop varieties and farming methods.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, Agricultural Sciences",
        study_path:
          "Bachelor of Science in Agriculture (4 years) → Honours → Masters",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, University of Fort Hare",
        aps_minimum: 5,
      },
      {
        name: "Soil Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies soil properties and their impact on agriculture and the environment.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, Geography",
        study_path: "BSc Soil Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, University of Fort Hare",
        aps_minimum: 5,
      },
      {
        name: "Animal Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies animal biology, nutrition, and livestock production.",
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
        name: "Agricultural Engineer",
        field: "Agriculture & Environmental Studies",
        description: "Designs and develops agricultural machinery and systems.",
        subjects_needed:
          "Mathematics, Physical Sciences, Agricultural Sciences, English",
        study_path: "BSc Agricultural Engineering (4 years) → Registration",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State",
        aps_minimum: 6,
      },
      {
        name: "Irrigation Engineer",
        field: "Agriculture & Environmental Studies",
        description: "Designs and manages irrigation systems for agriculture.",
        subjects_needed:
          "Mathematics, Physical Sciences, Agricultural Sciences, English",
        study_path:
          "BSc Agricultural Engineering (4 years) → Irrigation training",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State",
        aps_minimum: 6,
      },
      {
        name: "Horticulturist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies and cultivates fruits, vegetables, and ornamental plants.",
        subjects_needed:
          "Life Sciences, Agricultural Sciences, Mathematics, English",
        study_path: "BSc Horticulture (3-4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Viticulturist",
        field: "Agriculture & Environmental Studies",
        description: "Studies and cultivates grapes for winemaking.",
        subjects_needed:
          "Life Sciences, Agricultural Sciences, Mathematics, English",
        study_path: "BSc Viticulture (3-4 years)",
        institutions:
          "Stellenbosch University, University of Pretoria, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Forester",
        field: "Agriculture & Environmental Studies",
        description: "Manages forests and timber production.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Forestry (3-4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, Nelson Mandela University, University of the Free State",
        aps_minimum: 5,
      },
      {
        name: "Fisheries Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies fish populations and manages fisheries resources.",
        subjects_needed:
          "Life Sciences, Mathematics, Physical Sciences, English",
        study_path: "BSc Fisheries Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Aquaculture Specialist",
        field: "Agriculture & Environmental Studies",
        description: "Manages fish and shellfish farming operations.",
        subjects_needed:
          "Life Sciences, Mathematics, Physical Sciences, English",
        study_path: "BSc Aquaculture (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
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
        name: "Environmental Consultant",
        field: "Agriculture & Environmental Studies",
        description:
          "Advises businesses and governments on environmental issues.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Environmental Science (3-4 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Ecologist",
        field: "Agriculture & Environmental Studies",
        description:
          "Studies ecosystems and the interactions between organisms and their environment.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Ecology (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Conservation Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Works to protect and manage natural resources and wildlife.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Environmental Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Wildlife Biologist",
        field: "Agriculture & Environmental Studies",
        description: "Studies animals and their ecosystems.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Zoology / Wildlife Science (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Rhodes University",
        aps_minimum: 5,
      },
      {
        name: "Park Ranger",
        field: "Agriculture & Environmental Studies",
        description:
          "Manages and protects national parks and wildlife reserves.",
        subjects_needed: "Life Sciences, Geography, Life Orientation, English",
        study_path:
          "National Certificate in Nature Conservation (2-3 years) OR BSc",
        institutions:
          "Various TVET Colleges, University of Cape Town, Stellenbosch University, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Climate Scientist",
        field: "Agriculture & Environmental Studies",
        description: "Studies climate patterns and climate change.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path: "BSc Climate Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Water Resource Scientist",
        field: "Agriculture & Environmental Studies",
        description: "Studies and manages water resources.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path:
          "BSc Water Resource Science (3-4 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Environmental Health Officer",
        field: "Agriculture & Environmental Studies",
        description:
          "Protects public health by monitoring environmental conditions.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "Bachelor of Environmental Health (4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Sustainability Specialist",
        field: "Agriculture & Environmental Studies",
        description:
          "Develops and implements sustainability strategies for organisations.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Sustainability / Environmental Science (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Waste Management Specialist",
        field: "Agriculture & Environmental Studies",
        description: "Manages waste disposal and recycling operations.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path:
          "BSc Environmental Science (3-4 years) → Waste management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Land Rehabilitation Specialist",
        field: "Agriculture & Environmental Studies",
        description: "Restores degraded land and ecosystems.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path:
          "BSc Environmental Science (3-4 years) → Rehabilitation training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Natural Resource Manager",
        field: "Agriculture & Environmental Studies",
        description:
          "Manages natural resources like forests, water, and minerals.",
        subjects_needed: "Life Sciences, Geography, Mathematics, English",
        study_path: "BSc Natural Resource Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Food Scientist",
        field: "Agriculture & Environmental Studies",
        description:
          "Researches and develops food products and production processes.",
        subjects_needed:
          "Mathematics, Life Sciences, Physical Sciences, English",
        study_path: "BSc Food Science (3-4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, University of Cape Town, North-West University",
        aps_minimum: 5,
      },
      {
        name: "Agri-Business Manager",
        field: "Agriculture & Environmental Studies",
        description:
          "Manages agricultural businesses and agribusiness operations.",
        subjects_needed:
          "Mathematics, Agricultural Sciences, Business Studies, English",
        study_path: "Bachelor of Agriculture / Agri-Business (3-4 years)",
        institutions:
          "University of Pretoria, Stellenbosch University, University of the Free State, Nelson Mandela University",
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
        name: "Special Needs Education Teacher",
        field: "Education",
        description: "Educates students with special educational needs.",
        subjects_needed: "English, Life Orientation, Mathematics",
        study_path:
          "BEd (Special Needs Education) (4 years) → Registration with SACE",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Subject Specialist Teacher",
        field: "Education",
        description: "Specialises in teaching a specific subject area.",
        subjects_needed:
          "Depending on subject: Mathematics, English, Physical Sciences, Life Sciences, History, Geography",
        study_path:
          "BEd (4 years) → Subject specialisation → Registration with SACE",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "School Principal",
        field: "Education",
        description:
          "Oversees the operations, staff, and educational programs of a school.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "BEd (4 years) → Teaching experience → Principal Training",
        institutions: "Various universities offering Education degrees",
        aps_minimum: 5,
      },
      {
        name: "Deputy Principal",
        field: "Education",
        description: "Supports the principal in managing school operations.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "BEd (4 years) → Teaching experience → Management training",
        institutions: "Various universities offering Education degrees",
        aps_minimum: 5,
      },
      {
        name: "Head of Department (HOD)",
        field: "Education",
        description: "Manages a subject department within a school.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path:
          "BEd (4 years) → Teaching experience → Departmental leadership",
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
          "BEd (4 years) → Postgraduate Diploma in Education Management",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, UNISA",
        aps_minimum: 5,
      },
      {
        name: "Education Policy Analyst",
        field: "Education",
        description: "Analyses and develops education policies.",
        subjects_needed: "Mathematics, English, History",
        study_path: "BA Education (3 years) → Postgraduate training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Curriculum Developer",
        field: "Education",
        description: "Develops educational curricula and learning materials.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "BEd (4 years) → Curriculum development training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Instructional Designer",
        field: "Education",
        description:
          "Designs and develops instructional materials and programs.",
        subjects_needed: "English, Mathematics, Information Technology",
        study_path: "BEd / BA Instructional Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Education Consultant",
        field: "Education",
        description: "Advises schools and organisations on educational issues.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "BEd (4 years) → Experience → Consulting",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "School Counsellor",
        field: "Education",
        description: "Provides counselling and support services to students.",
        subjects_needed: "English, Life Orientation, Psychology",
        study_path: "BA Psychology (3 years) → Honours → Counselling training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Education Psychologist",
        field: "Education",
        description:
          "Supports the psychological and educational development of students.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "BA Psychology (3 years) → Honours → Masters in Educational Psychology → Internship → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Lecturer",
        field: "Education",
        description:
          "Teaches at tertiary institutions and contributes to research.",
        subjects_needed:
          "English, Mathematics, Life Sciences, Physical Sciences",
        study_path:
          "Bachelor of Arts / Science (3 years) → Honours → Masters → PhD",
        institutions: "All South African universities",
        aps_minimum: 6,
      },
      {
        name: "University Professor",
        field: "Education",
        description: "Teaches and conducts research at university level.",
        subjects_needed:
          "English, Mathematics, Life Sciences, Physical Sciences",
        study_path:
          "Bachelor of Arts / Science (3 years) → Honours → Masters → PhD → Academic experience",
        institutions: "All South African universities",
        aps_minimum: 7,
      },
      {
        name: "Researcher",
        field: "Education",
        description: "Conducts research in educational and academic fields.",
        subjects_needed: "Mathematics, English, Life Sciences",
        study_path:
          "Bachelor of Arts / Science (3 years) → Honours → Masters → PhD",
        institutions: "All South African universities, research institutes",
        aps_minimum: 6,
      },
      {
        name: "Academic Advisor",
        field: "Education",
        description: "Advises students on academic courses and study pathways.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "BA / BEd (3-4 years) → Academic advising training",
        institutions: "All South African universities",
        aps_minimum: 5,
      },
      {
        name: "Librarian",
        field: "Education",
        description: "Manages and provides access to library resources.",
        subjects_needed: "English, Mathematics, Information Technology",
        study_path: "Bachelor of Library and Information Science (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "School Librarian",
        field: "Education",
        description: "Manages school libraries and supports learning.",
        subjects_needed: "English, Mathematics, Information Technology",
        study_path: "Bachelor of Library and Information Science (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Education Technology Specialist",
        field: "Education",
        description: "Integrates technology into educational settings.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "BEd / BA Education Technology (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Training and Development Officer",
        field: "Education",
        description: "Designs and delivers training programs for employees.",
        subjects_needed: "English, Business Studies, Mathematics",
        study_path:
          "Bachelor of Commerce (3 years) → Training and Development training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Corporate Trainer",
        field: "Education",
        description:
          "Delivers training programs within corporate organisations.",
        subjects_needed: "English, Business Studies, Mathematics",
        study_path:
          "Bachelor of Commerce (3 years) → Training and Development training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Adult Education Facilitator",
        field: "Education",
        description: "Educates adults in various educational settings.",
        subjects_needed: "English, Life Orientation, Mathematics",
        study_path:
          "BEd / BA Adult Education (3-4 years) → Registration with SACE",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, UNISA",
        aps_minimum: 5,
      },

      // ==================== HOSPITALITY & TOURISM ====================
      {
        name: "Hotel Manager",
        field: "Hospitality & Tourism",
        description: "Manages hotel operations, guest services, and staff.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma or Degree in Hospitality Management (3-4 years)",
        institutions:
          "Stadio Higher Education, Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Walter Sisulu University",
        aps_minimum: 5,
      },
      {
        name: "Front Office Manager",
        field: "Hospitality & Tourism",
        description: "Manages front desk operations and guest services.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Walter Sisulu University",
        aps_minimum: 5,
      },
      {
        name: "Guest Relations Manager",
        field: "Hospitality & Tourism",
        description: "Ensures guest satisfaction and resolves complaints.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
        aps_minimum: 5,
      },
      {
        name: "Concierge",
        field: "Hospitality & Tourism",
        description: "Provides guest services and assistance at hotels.",
        subjects_needed: "Hospitality Studies, English, Tourism",
        study_path: "Certificate/Diploma in Hospitality (1-3 years)",
        institutions:
          "Various TVET Colleges, Cape Peninsula University of Technology, Central University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Housekeeping Manager",
        field: "Hospitality & Tourism",
        description: "Manages housekeeping operations in hotels.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Restaurant Manager",
        field: "Hospitality & Tourism",
        description: "Manages restaurant operations and staff.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Food and Beverage Manager",
        field: "Hospitality & Tourism",
        description: "Manages food and beverage operations.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
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
        name: "Sous Chef",
        field: "Hospitality & Tourism",
        description: "Assists the executive chef in kitchen operations.",
        subjects_needed: "Hospitality Studies, English, Consumer Studies",
        study_path: "Diploma in Culinary Arts (2-3 years) → Experience",
        institutions:
          "Cape Peninsula University of Technology, Central University of Technology, Tshwane University of Technology, Boland TVET College",
        aps_minimum: 4,
      },
      {
        name: "Pastry Chef",
        field: "Hospitality & Tourism",
        description: "Specialises in desserts and baked goods.",
        subjects_needed: "Hospitality Studies, English, Consumer Studies",
        study_path: "Diploma in Culinary Arts / Pastry (2-3 years)",
        institutions:
          "Cape Peninsula University of Technology, Central University of Technology, Tshwane University of Technology, Boland TVET College",
        aps_minimum: 4,
      },
      {
        name: "Catering Manager",
        field: "Hospitality & Tourism",
        description: "Manages catering operations and events.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma in Hospitality Management (3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
        aps_minimum: 5,
      },
      {
        name: "Event Planner",
        field: "Hospitality & Tourism",
        description: "Organises and manages events and functions.",
        subjects_needed: "Hospitality Studies, English, Business Studies",
        study_path: "Diploma in Events Management (2-3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
        aps_minimum: 5,
      },
      {
        name: "Wedding Planner",
        field: "Hospitality & Tourism",
        description: "Organises and manages wedding ceremonies and receptions.",
        subjects_needed: "Hospitality Studies, English, Business Studies",
        study_path: "Diploma in Events Management (2-3 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 5,
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
        name: "Travel Consultant",
        field: "Hospitality & Tourism",
        description: "Provides travel advice and booking services to clients.",
        subjects_needed: "Tourism, English, Geography",
        study_path:
          "National Certificate in Travel and Tourism (1-2 years) OR Diploma",
        institutions:
          "Various TVET Colleges, Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Travel Agent",
        field: "Hospitality & Tourism",
        description: "Sells and arranges travel and holiday packages.",
        subjects_needed: "Tourism, English, Business Studies",
        study_path:
          "National Certificate in Travel and Tourism (1-2 years) OR Diploma",
        institutions:
          "Various TVET Colleges, Cape Peninsula University of Technology, Tshwane University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Airline Cabin Crew",
        field: "Hospitality & Tourism",
        description: "Provides service and safety on flights.",
        subjects_needed: "English, Tourism, Life Orientation",
        study_path:
          "National Certificate in Aviation (1-2 years) → In-house training",
        institutions:
          "Various aviation training institutions, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Flight Attendant",
        field: "Hospitality & Tourism",
        description: "Ensures passenger comfort and safety during flights.",
        subjects_needed: "English, Tourism, Life Orientation",
        study_path:
          "National Certificate in Aviation (1-2 years) → In-house training",
        institutions:
          "Various aviation training institutions, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Resort Manager",
        field: "Hospitality & Tourism",
        description: "Manages resort operations and guest experiences.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma or Degree in Hospitality Management (3-4 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
        aps_minimum: 5,
      },
      {
        name: "Spa Manager",
        field: "Hospitality & Tourism",
        description: "Manages spa operations and wellness services.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path:
          "Diploma in Hospitality Management (3 years) → Spa training",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Hospitality Operations Manager",
        field: "Hospitality & Tourism",
        description: "Manages hospitality operations and service delivery.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path: "Diploma or Degree in Hospitality Management (3-4 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology, Stadio Higher Education",
        aps_minimum: 5,
      },
      {
        name: "Sommelier",
        field: "Hospitality & Tourism",
        description: "Expert in wine and beverage service.",
        subjects_needed: "Hospitality Studies, English, Consumer Studies",
        study_path:
          "Diploma in Hospitality Management (3 years) → Sommelier training",
        institutions:
          "Cape Peninsula University of Technology, Central University of Technology, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Bar Manager",
        field: "Hospitality & Tourism",
        description: "Manages bar operations and beverage services.",
        subjects_needed: "Hospitality Studies, English, Accounting",
        study_path:
          "Diploma in Hospitality Management (3 years) → Bar management training",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Bartender",
        field: "Hospitality & Tourism",
        description: "Serves drinks and beverages in bars and restaurants.",
        subjects_needed: "Hospitality Studies, English",
        study_path: "Certificate in Bar Service (1 year)",
        institutions:
          "Various TVET Colleges, Cape Peninsula University of Technology",
        aps_minimum: 3,
      },
      {
        name: "Food Service Supervisor",
        field: "Hospitality & Tourism",
        description: "Supervises food service operations in restaurants.",
        subjects_needed: "Hospitality Studies, English",
        study_path: "Diploma in Hospitality Management (3 years) OR Experience",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Central University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Tourism Marketing Specialist",
        field: "Hospitality & Tourism",
        description: "Markets tourism products and destinations.",
        subjects_needed: "Tourism, English, Business Studies",
        study_path: "Bachelor of Tourism Management (3-4 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Nelson Mandela University, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Destination Manager",
        field: "Hospitality & Tourism",
        description: "Manages tourism destination development and promotion.",
        subjects_needed: "Tourism, English, Business Studies",
        study_path: "Bachelor of Tourism Management (3-4 years)",
        institutions:
          "Cape Peninsula University of Technology, Tshwane University of Technology, Nelson Mandela University, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Heritage Site Manager",
        field: "Hospitality & Tourism",
        description: "Manages and preserves heritage and cultural sites.",
        subjects_needed: "History, Tourism, Geography, English",
        study_path: "BA Heritage Studies / Tourism Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, Nelson Mandela University, Rhodes University",
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
      {
        name: "Steel Fixer",
        field: "TVET & Skilled Trades",
        description: "Installs steel reinforcement in concrete structures.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Steel Fixing (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Ekurhuleni East TVET College",
        aps_minimum: 3,
      },
      {
        name: "Bricklayer",
        field: "TVET & Skilled Trades",
        description: "Builds walls and structures using bricks and mortar.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Bricklaying (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },
      {
        name: "Plasterer",
        field: "TVET & Skilled Trades",
        description: "Applies plaster and render to walls and ceilings.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Plastering (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Tiler",
        field: "TVET & Skilled Trades",
        description: "Installs tiles on walls and floors.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Tiling (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College, Buffalo City TVET College",
        aps_minimum: 3,
      },
      {
        name: "Painter and Decorator",
        field: "TVET & Skilled Trades",
        description: "Applies paint and finishes to buildings and structures.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Painting and Decorating (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Glazier",
        field: "TVET & Skilled Trades",
        description: "Installs glass in buildings and windows.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Glazing (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Roofer",
        field: "TVET & Skilled Trades",
        description: "Installs and repairs roofs on buildings.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Roofing (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Flooring Installer",
        field: "TVET & Skilled Trades",
        description:
          "Installs flooring materials like carpet, wood, and tiles.",
        subjects_needed: "Mathematics, Engineering Graphics and Design",
        study_path:
          "National Certificate in Flooring (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Scaffolder",
        field: "TVET & Skilled Trades",
        description:
          "Erects and dismantles scaffolding for construction projects.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate in Scaffolding (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Crane Operator",
        field: "TVET & Skilled Trades",
        description: "Operates cranes to lift and move heavy materials.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate in Crane Operation (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
        aps_minimum: 3,
      },
      {
        name: "Heavy Equipment Operator",
        field: "TVET & Skilled Trades",
        description:
          "Operates heavy construction equipment like bulldozers and excavators.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate in Heavy Equipment Operation (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, Port Elizabeth TVET College, Tshwane South TVET College",
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
        name: "Advocate",
        field: "Law & Legal Studies",
        description:
          "Specialises in court proceedings and litigation, provides legal opinions.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Pupillage → Admission as Advocate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Legal Advisor",
        field: "Law & Legal Studies",
        description: "Provides legal advice and guidance to organisations.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Experience in legal advisory",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Corporate Lawyer",
        field: "Law & Legal Studies",
        description:
          "Advises on corporate law, mergers, acquisitions, and business transactions.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Corporate Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 6,
      },
      {
        name: "Criminal Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in criminal law and defence in court.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Criminal Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Civil Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in civil law and dispute resolution.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Civil Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Constitutional Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in constitutional law and human rights.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Constitutional Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Human Rights Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in human rights law and advocacy.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Human Rights training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Family Lawyer",
        field: "Law & Legal Studies",
        description:
          "Specialises in family law including divorce and child custody.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Family Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Labour Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in labour law and employment disputes.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Labour Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Tax Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in tax law and dispute resolution.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Tax Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Environmental Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in environmental law and compliance.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Environmental Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Immigration Lawyer",
        field: "Law & Legal Studies",
        description: "Specialises in immigration law and applications.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Immigration Law training → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Legal Consultant",
        field: "Law & Legal Studies",
        description: "Provides legal advice and consulting services.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Experience in legal consulting",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
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
      {
        name: "Legal Assistant",
        field: "Law & Legal Studies",
        description: "Supports lawyers with administrative and clerical tasks.",
        subjects_needed: "English, History, Mathematics",
        study_path: "Certificate in Legal Assistance (1-2 years)",
        institutions:
          "Various TVET Colleges, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Court Clerk",
        field: "Law & Legal Studies",
        description: "Manages court records and assists in court proceedings.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "Certificate in Court Administration (1-2 years) → Experience",
        institutions:
          "Various TVET Colleges, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Magistrate",
        field: "Law & Legal Studies",
        description: "Presides over court cases and makes legal decisions.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Legal experience → Appointment as Magistrate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Judge",
        field: "Law & Legal Studies",
        description:
          "Presides over high court cases and makes legal decisions.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Legal experience → Appointment as Judge",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 7,
      },
      {
        name: "Prosecutor",
        field: "Law & Legal Studies",
        description:
          "Presents criminal cases against accused persons in court.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Experience → Appointment as Prosecutor",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "State Attorney",
        field: "Law & Legal Studies",
        description: "Represents the state in legal matters and proceedings.",
        subjects_needed: "English, History, Mathematics",
        study_path:
          "LLB (4 years) → Experience → Appointment as State Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Legal Aid Practitioner",
        field: "Law & Legal Studies",
        description: "Provides legal representation to indigent clients.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Experience → Admission as Attorney",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
      },
      {
        name: "Compliance Officer",
        field: "Law & Legal Studies",
        description:
          "Ensures organisations comply with legal and regulatory requirements.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Compliance training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Legal Researcher",
        field: "Law & Legal Studies",
        description: "Conducts legal research and analysis.",
        subjects_needed: "English, History, Mathematics",
        study_path: "LLB (4 years) → Research training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Rhodes University",
        aps_minimum: 6,
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
      {
        name: "Machine Learning Engineer",
        field: "ICT & Digital Media",
        description:
          "Designs and implements machine learning algorithms and models.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Computer Science / Data Science (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "AI Engineer",
        field: "ICT & Digital Media",
        description: "Designs and develops AI systems and models.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Bachelor of Computer Science / AI Engineering (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, University of Johannesburg",
        aps_minimum: 6,
      },
      {
        name: "Business Intelligence Analyst",
        field: "ICT & Digital Media",
        description: "Uses data to support business decision-making.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology / Data Analytics (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "IT Project Manager",
        field: "ICT & Digital Media",
        description: "Manages IT projects from initiation to completion.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Project Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Systems Administrator",
        field: "ICT & Digital Media",
        description: "Manages and maintains IT systems and servers.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) OR National Diploma in IT",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Database Administrator",
        field: "ICT & Digital Media",
        description: "Manages and maintains database systems.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Database Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Cloud Engineer",
        field: "ICT & Digital Media",
        description: "Designs and manages cloud computing infrastructure.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Cloud Certifications",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "DevOps Engineer",
        field: "ICT & Digital Media",
        description: "Manages software development and deployment processes.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → DevOps training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Ethical Hacker (Penetration Tester)",
        field: "ICT & Digital Media",
        description: "Identifies security vulnerabilities in systems.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Cybersecurity Certifications",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Information Security Specialist",
        field: "ICT & Digital Media",
        description: "Protects information systems from threats.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path:
          "Bachelor of Information Technology (3 years) → Cybersecurity Certifications",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "IT Support Technician",
        field: "ICT & Digital Media",
        description: "Provides technical support to computer users.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "Certificate/Diploma in IT Support (1-3 years)",
        institutions:
          "Various TVET Colleges, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 4,
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
        name: "Urban Planner",
        field: "Built Environment & Construction",
        description: "Plans land use and community development projects.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path: "Bachelor of Urban and Regional Planning (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Town Planner",
        field: "Built Environment & Construction",
        description: "Develops town planning strategies and land use plans.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path: "Bachelor of Urban and Regional Planning (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
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
        name: "Site Manager",
        field: "Built Environment & Construction",
        description: "Manages day-to-day operations on construction sites.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Construction Management (3-4 years) OR Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Project Manager (Construction)",
        field: "Built Environment & Construction",
        description:
          "Manages construction projects from planning to completion.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "Bachelor of Construction Management (3-4 years) → Project Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Building Surveyor",
        field: "Built Environment & Construction",
        description: "Inspects buildings for safety and compliance.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "Bachelor of Building Surveying (3-4 years) → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Land Surveyor",
        field: "Built Environment & Construction",
        description: "Surveys land for construction and development.",
        subjects_needed: "Mathematics, Physical Sciences, Geography, English",
        study_path:
          "Bachelor of Surveying (3-4 years) → Practical Training → Registration",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Cartographer",
        field: "Built Environment & Construction",
        description: "Creates maps and geographic data visualisations.",
        subjects_needed: "Geography, Mathematics, English",
        study_path: "BSc Geography / Cartography (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Property Developer",
        field: "Built Environment & Construction",
        description: "Develops and manages real estate projects.",
        subjects_needed: "Mathematics, Business Studies, English",
        study_path: "Bachelor of Commerce / Property Development (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Real Estate Developer",
        field: "Built Environment & Construction",
        description: "Develops and sells real estate properties.",
        subjects_needed: "Mathematics, Business Studies, English",
        study_path: "Bachelor of Commerce / Property Development (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Facilities Manager",
        field: "Built Environment & Construction",
        description: "Manages facilities and building operations.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "Bachelor of Facilities Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Property Manager",
        field: "Built Environment & Construction",
        description: "Manages properties for owners and investors.",
        subjects_needed: "Mathematics, Business Studies, English",
        study_path: "Bachelor of Commerce / Property Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Construction Foreman",
        field: "Built Environment & Construction",
        description: "Supervises construction workers and daily activities.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate in Construction (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Site Supervisor",
        field: "Built Environment & Construction",
        description: "Supervises construction activities and workers.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path:
          "National Certificate in Construction (2-3 years) OR Apprenticeship",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Building Inspector",
        field: "Built Environment & Construction",
        description:
          "Inspects buildings to ensure compliance with regulations.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "National Certificate in Building Inspection (2-3 years)",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Health and Safety Officer (Construction)",
        field: "Built Environment & Construction",
        description: "Ensures health and safety on construction sites.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "National Certificate in Health and Safety (2-3 years)",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Civil Draughtsperson",
        field: "Built Environment & Construction",
        description:
          "Creates technical drawings for civil engineering projects.",
        subjects_needed:
          "Mathematics, Physical Sciences, Engineering Graphics and Design, English",
        study_path: "National Diploma in Civil Drafting (3 years)",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Architectural Draughtsperson",
        field: "Built Environment & Construction",
        description: "Creates technical drawings for architectural projects.",
        subjects_needed:
          "Mathematics, Physical Sciences, Engineering Graphics and Design, Visual Arts",
        study_path: "National Diploma in Architectural Drafting (3 years)",
        institutions:
          "Various TVET Colleges, University of Cape Town, University of Pretoria, Nelson Mandela University",
        aps_minimum: 4,
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
          "Manages procurement, production, and distribution of goods.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Supply Chain Management (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Transport Manager",
        field: "Transport & Logistics",
        description: "Manages transportation operations and fleets.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Bachelor of Commerce in Logistics / Transport Management (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Fleet Manager",
        field: "Transport & Logistics",
        description: "Manages vehicles and drivers of an organisation.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Transport Management (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
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
        name: "Distribution Manager",
        field: "Transport & Logistics",
        description: "Manages distribution and delivery operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce in Logistics (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Procurement Officer",
        field: "Transport & Logistics",
        description: "Manages the procurement of goods and services.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Procurement training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Purchasing Manager",
        field: "Transport & Logistics",
        description:
          "Manages purchasing operations and supplier relationships.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Purchasing training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Inventory Manager",
        field: "Transport & Logistics",
        description: "Manages inventory levels and stock control.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Supply Chain Management (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Stock Controller",
        field: "Transport & Logistics",
        description: "Controls inventory levels and stock movement.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Certificate/Diploma in Logistics (1-3 years)",
        institutions:
          "Various TVET Colleges, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 3,
      },
      {
        name: "Warehouse Supervisor",
        field: "Transport & Logistics",
        description: "Supervises warehouse operations and staff.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path:
          "Certificate/Diploma in Logistics (1-3 years) OR Experience",
        institutions:
          "Various TVET Colleges, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 3,
      },
      {
        name: "Truck Driver",
        field: "Transport & Logistics",
        description: "Operates heavy vehicles to transport goods.",
        subjects_needed: "Mathematics, English",
        study_path:
          "Code 10 or Code 14 Driver's License → Professional Driving Permit (PrDP)",
        institutions: "Various accredited driving schools",
        aps_minimum: 3,
      },
      {
        name: "Delivery Driver",
        field: "Transport & Logistics",
        description: "Delivers goods to customers and businesses.",
        subjects_needed: "Mathematics, English",
        study_path:
          "Code 8 or Code 10 Driver's License → Professional Driving Permit (PrDP)",
        institutions: "Various accredited driving schools",
        aps_minimum: 3,
      },
      {
        name: "Courier",
        field: "Transport & Logistics",
        description: "Delivers documents and parcels to clients.",
        subjects_needed: "Mathematics, English",
        study_path: "Code 8 Driver's License → Experience",
        institutions: "Various accredited driving schools",
        aps_minimum: 3,
      },
      {
        name: "Shipping Coordinator",
        field: "Transport & Logistics",
        description: "Coordinates shipping and freight movements.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Shipping (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Freight Forwarder",
        field: "Transport & Logistics",
        description: "Arranges the shipment of goods on behalf of clients.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Freight Forwarding (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Customs Broker",
        field: "Transport & Logistics",
        description: "Manages customs clearance of imported goods.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Customs (3 years) → Accreditation",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Import and Export Specialist",
        field: "Transport & Logistics",
        description: "Manages import and export operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce (3 years) → Import/Export training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Air Cargo Agent",
        field: "Transport & Logistics",
        description: "Manages air cargo and freight operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Diploma in Logistics / Air Cargo (3 years)",
        institutions:
          "University of Johannesburg, Tshwane University of Technology, Nelson Mandela University, Cape Peninsula University of Technology",
        aps_minimum: 4,
      },
      {
        name: "Port Operations Manager",
        field: "Transport & Logistics",
        description: "Manages port and harbour operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce / Port Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Maritime Logistics Officer",
        field: "Transport & Logistics",
        description: "Manages maritime logistics and shipping operations.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "Bachelor of Commerce / Maritime Studies (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Ship Captain",
        field: "Transport & Logistics",
        description: "Commands and navigates ships and vessels.",
        subjects_needed: "Mathematics, Physical Sciences, English",
        study_path: "Bachelor of Maritime Studies (4 years) → Certification",
        institutions:
          "University of Cape Town, Stellenbosch University, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },

      // ==================== MEDIA & COMMUNICATIONS ====================
      {
        name: "Journalist",
        field: "Media & Communications",
        description: "Researches and reports news and stories.",
        subjects_needed: "English, History, Languages",
        study_path: "BA in Journalism / Media Studies (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Reporter",
        field: "Media & Communications",
        description: "Investigates and reports news stories.",
        subjects_needed: "English, History, Languages",
        study_path: "BA in Journalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "News Anchor",
        field: "Media & Communications",
        description: "Presents news on television or radio.",
        subjects_needed: "English, Drama, History",
        study_path: "BA in Journalism / Broadcast (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "News Editor",
        field: "Media & Communications",
        description: "Manages and edits news content.",
        subjects_needed: "English, Languages, History",
        study_path: "BA in Journalism (3 years) → Experience",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Broadcast Journalist",
        field: "Media & Communications",
        description: "Reports news for radio and television.",
        subjects_needed: "English, Drama, History",
        study_path: "BA in Journalism / Broadcast (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Radio Presenter",
        field: "Media & Communications",
        description: "Presents and hosts radio programs.",
        subjects_needed: "English, Drama, Languages",
        study_path: "BA in Media Studies / Radio (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Radio Producer",
        field: "Media & Communications",
        description: "Produces radio programs and content.",
        subjects_needed: "English, Drama, Music",
        study_path: "BA in Media Studies (3 years) → Experience",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Television Presenter",
        field: "Media & Communications",
        description: "Presents television programs.",
        subjects_needed: "English, Drama, Visual Arts",
        study_path: "BA in Media Studies / Broadcasting (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Television Producer",
        field: "Media & Communications",
        description: "Produces television programs and content.",
        subjects_needed: "English, Drama, Visual Arts",
        study_path: "BA in Media Studies (3 years) → Experience",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Film Producer",
        field: "Media & Communications",
        description: "Manages film production and logistics.",
        subjects_needed: "English, Business Studies, Visual Arts",
        study_path: "BA in Film Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Film Director",
        field: "Media & Communications",
        description:
          "Oversees creative and technical aspects of film production.",
        subjects_needed: "Visual Arts, English, Drama",
        study_path: "BA in Film Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Screenwriter",
        field: "Media & Communications",
        description: "Writes screenplays for film and television.",
        subjects_needed: "English, Drama, Visual Arts",
        study_path: "BA in Screenwriting (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Copywriter",
        field: "Media & Communications",
        description: "Writes persuasive copy for advertising and marketing.",
        subjects_needed: "English, Languages, Business Studies",
        study_path: "BA English / Marketing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Rhodes University, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Content Writer",
        field: "Media & Communications",
        description: "Writes content for websites, blogs, and marketing.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English / Creative Writing (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Rhodes University, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Editor",
        field: "Media & Communications",
        description: "Reviews and edits written content.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English / Journalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Sub-Editor",
        field: "Media & Communications",
        description: "Reviews and sub-edits written content.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English / Journalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Proofreader",
        field: "Media & Communications",
        description: "Checks written content for errors.",
        subjects_needed: "English, Languages, History",
        study_path: "BA English (3 years) OR Training",
        institutions:
          "Rhodes University, University of Cape Town, Stellenbosch University, University of Johannesburg",
        aps_minimum: 5,
      },
      {
        name: "Public Relations Officer",
        field: "Media & Communications",
        description: "Manages public image and communications.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Public Relations (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Public Relations Manager",
        field: "Media & Communications",
        description: "Manages PR strategies and campaigns.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Public Relations (3 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Corporate Communications Specialist",
        field: "Media & Communications",
        description: "Manages corporate communications and messaging.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Corporate Communications (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Communications Manager",
        field: "Media & Communications",
        description: "Manages communications and media relations.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Communications (3 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Social Media Manager",
        field: "Media & Communications",
        description: "Manages social media strategy and content.",
        subjects_needed: "English, Business Studies, Information Technology",
        study_path: "BA Marketing / Communications (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Digital Content Creator",
        field: "Media & Communications",
        description: "Creates digital content for various platforms.",
        subjects_needed: "Visual Arts, English, Information Technology",
        study_path: "BA Digital Media / Content Creation (3 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Influencer Marketing Manager",
        field: "Media & Communications",
        description: "Manages influencer marketing campaigns.",
        subjects_needed: "English, Business Studies, Information Technology",
        study_path: "BA Marketing (3 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Brand Communications Specialist",
        field: "Media & Communications",
        description: "Manages brand communications and messaging.",
        subjects_needed: "English, Business Studies, Marketing",
        study_path: "BA Marketing / Communications (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Media Planner",
        field: "Media & Communications",
        description: "Plans media strategy and placements.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "BA Marketing / Media Studies (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Media Buyer",
        field: "Media & Communications",
        description: "Purchases media advertising space.",
        subjects_needed: "Mathematics, English, Business Studies",
        study_path: "BA Marketing / Media Studies (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Advertising Account Executive",
        field: "Media & Communications",
        description: "Manages advertising accounts and client relationships.",
        subjects_needed: "English, Business Studies, Mathematics",
        study_path: "BA Marketing / Advertising (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Advertising Copywriter",
        field: "Media & Communications",
        description: "Writes copy for advertising campaigns.",
        subjects_needed: "English, Languages, Visual Arts",
        study_path: "BA Advertising (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Art Director",
        field: "Media & Communications",
        description: "Oversees visual direction in advertising and media.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA Art Direction / Design (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Creative Director",
        field: "Media & Communications",
        description: "Leads creative teams and projects.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA Design / Fine Arts (3-4 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Photojournalist",
        field: "Media & Communications",
        description: "Uses photography to tell news stories.",
        subjects_needed: "Visual Arts, English, History",
        study_path: "BA Photojournalism (3 years)",
        institutions:
          "Rhodes University, University of Cape Town, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Videographer",
        field: "Media & Communications",
        description: "Captures video content for various media.",
        subjects_needed: "Visual Arts, English, Design Studies",
        study_path: "BA Film / Video Production (3-4 years)",
        institutions:
          "University of Cape Town, University of Johannesburg, Tshwane University of Technology, Cape Peninsula University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Podcaster",
        field: "Media & Communications",
        description: "Creates and produces podcast content.",
        subjects_needed: "English, Drama, Languages",
        study_path: "BA Media Studies (3 years) OR Experience",
        institutions: "Various universities, practical experience",
        aps_minimum: 4,
      },
      {
        name: "Podcast Producer",
        field: "Media & Communications",
        description: "Produces and manages podcast production.",
        subjects_needed: "English, Drama, Information Technology",
        study_path: "BA Media Studies (3 years) → Experience",
        institutions: "Various universities, practical experience",
        aps_minimum: 4,
      },
      {
        name: "Media Analyst",
        field: "Media & Communications",
        description: "Analyses media performance and trends.",
        subjects_needed: "Mathematics, English, Information Technology",
        study_path: "BA Media Studies (3 years) → Data analysis training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Rhodes University",
        aps_minimum: 5,
      },

      // ==================== PUBLIC ADMINISTRATION & GOVERNMENT ====================
      {
        name: "Public Administrator",
        field: "Public Administration & Government",
        description: "Manages public services and government administration.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Government Official",
        field: "Public Administration & Government",
        description: "Works in government departments and agencies.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Civil Servant",
        field: "Public Administration & Government",
        description: "Works in the public service sector.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Policy Analyst",
        field: "Public Administration & Government",
        description: "Analyses and develops government policies.",
        subjects_needed: "English, Mathematics, History",
        study_path:
          "Bachelor of Public Administration (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Policy Advisor",
        field: "Public Administration & Government",
        description: "Advises on policy development and implementation.",
        subjects_needed: "English, Mathematics, History",
        study_path:
          "Bachelor of Public Administration (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Legislative Assistant",
        field: "Public Administration & Government",
        description: "Assists legislators in research and administration.",
        subjects_needed: "English, History, Law",
        study_path: "BA Public Administration (3 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Parliamentary Officer",
        field: "Public Administration & Government",
        description: "Supports parliamentary and legislative functions.",
        subjects_needed: "English, History, Law",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Municipal Manager",
        field: "Public Administration & Government",
        description: "Manages municipal operations and services.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Public Administration / Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "City Manager",
        field: "Public Administration & Government",
        description: "Manages city government operations and services.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Public Administration / Management (3-4 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Mayor",
        field: "Public Administration & Government",
        description: "Leads municipal government as elected official.",
        subjects_needed: "English, History, Life Orientation",
        study_path: "Various — Elected position",
        institutions: "Elected through political process",
        aps_minimum: 4,
      },
      {
        name: "Councillor",
        field: "Public Administration & Government",
        description: "Serves as an elected municipal representative.",
        subjects_needed: "English, History, Life Orientation",
        study_path: "Various — Elected position",
        institutions: "Elected through political process",
        aps_minimum: 4,
      },
      {
        name: "Provincial Administrator",
        field: "Public Administration & Government",
        description: "Manages provincial government operations.",
        subjects_needed: "English, Mathematics, History",
        study_path:
          "Bachelor of Public Administration (3-4 years) → Experience",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "District Administrator",
        field: "Public Administration & Government",
        description: "Manages district administration and services.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Township Manager",
        field: "Public Administration & Government",
        description: "Manages township administration and services.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Public Affairs Officer",
        field: "Public Administration & Government",
        description: "Manages public affairs and communications.",
        subjects_needed: "English, History, Business Studies",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Government Communications Officer",
        field: "Public Administration & Government",
        description: "Manages government communications and media relations.",
        subjects_needed: "English, Business Studies, History",
        study_path: "BA Public Relations / Communications (3 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Johannesburg, Tshwane University of Technology",
        aps_minimum: 5,
      },
      {
        name: "Diplomat",
        field: "Public Administration & Government",
        description: "Represents South Africa in international relations.",
        subjects_needed: "English, History, Languages",
        study_path:
          "BA International Relations (3 years) → Postgraduate → Diplomatic training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Foreign Service Officer",
        field: "Public Administration & Government",
        description: "Works in diplomatic service and foreign affairs.",
        subjects_needed: "English, History, Languages",
        study_path:
          "BA International Relations (3 years) → Diplomatic training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Consular Officer",
        field: "Public Administration & Government",
        description: "Manages consular services and support abroad.",
        subjects_needed: "English, History, Languages",
        study_path:
          "BA International Relations (3 years) → Diplomatic training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Ambassador",
        field: "Public Administration & Government",
        description: "Represents South Africa as head of diplomatic mission.",
        subjects_needed: "English, History, Languages",
        study_path:
          "BA International Relations (3 years) → Diplomatic service → Appointment",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 6,
      },
      {
        name: "Political Analyst",
        field: "Public Administration & Government",
        description: "Analyses political trends and developments.",
        subjects_needed: "History, English, Mathematics",
        study_path: "BA Political Science (3 years) → Honours → Masters",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Governance Specialist",
        field: "Public Administration & Government",
        description: "Develops and improves governance systems.",
        subjects_needed: "English, Mathematics, History",
        study_path:
          "Bachelor of Public Administration (3-4 years) → Postgraduate",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Public Sector Manager",
        field: "Public Administration & Government",
        description: "Manages public sector operations and programmes.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Public Administration / Management (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Programme Manager (Government)",
        field: "Public Administration & Government",
        description: "Manages government programmes and projects.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Public Administration / Management (3-4 years) → Project Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Project Manager (Public Sector)",
        field: "Public Administration & Government",
        description: "Manages public sector projects.",
        subjects_needed: "English, Mathematics, Business Studies",
        study_path:
          "Bachelor of Public Administration / Management (3-4 years) → Project Management training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Budget Analyst",
        field: "Public Administration & Government",
        description: "Analyses and manages government budgets.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path: "Bachelor of Commerce (3 years) → Budget analysis training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Treasury Analyst",
        field: "Public Administration & Government",
        description: "Manages treasury and financial operations.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path: "Bachelor of Commerce (3 years) → Treasury training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Revenue Officer",
        field: "Public Administration & Government",
        description: "Manages revenue collection and administration.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path: "Bachelor of Commerce (3 years) → Revenue training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Tax Administrator",
        field: "Public Administration & Government",
        description: "Manages tax administration and compliance.",
        subjects_needed: "Mathematics, Accounting, English",
        study_path: "Bachelor of Commerce (3 years) → Tax training",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Customs Officer",
        field: "Public Administration & Government",
        description: "Enforces customs regulations and manages imports.",
        subjects_needed: "Mathematics, English, Law",
        study_path: "Certificate/Diploma in Customs (1-3 years) → Experience",
        institutions:
          "Various TVET Colleges, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Immigration Officer",
        field: "Public Administration & Government",
        description: "Manages immigration and border control.",
        subjects_needed: "English, Law, History",
        study_path:
          "Certificate/Diploma in Immigration (1-3 years) → Experience",
        institutions:
          "Various TVET Colleges, University of Johannesburg, Nelson Mandela University",
        aps_minimum: 4,
      },
      {
        name: "Social Services Administrator",
        field: "Public Administration & Government",
        description: "Manages social services programmes.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Public Health Administrator",
        field: "Public Administration & Government",
        description: "Manages public health programmes and services.",
        subjects_needed: "English, Mathematics, Life Sciences",
        study_path:
          "Bachelor of Public Administration / Health Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand",
        aps_minimum: 5,
      },
      {
        name: "Education Administrator",
        field: "Public Administration & Government",
        description: "Manages education programmes and administration.",
        subjects_needed: "English, Mathematics, Life Orientation",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Urban Planner",
        field: "Public Administration & Government",
        description: "Plans urban development and land use.",
        subjects_needed: "Geography, Mathematics, English",
        study_path: "Bachelor of Urban and Regional Planning (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Local Government Official",
        field: "Public Administration & Government",
        description: "Works in local government administration.",
        subjects_needed: "English, Mathematics, History",
        study_path: "Bachelor of Public Administration (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, Nelson Mandela University",
        aps_minimum: 5,
      },
      {
        name: "Development Planner",
        field: "Public Administration & Government",
        description: "Plans community and economic development.",
        subjects_needed: "Geography, Mathematics, English",
        study_path: "Bachelor of Urban and Regional Planning (3-4 years)",
        institutions:
          "University of Cape Town, Stellenbosch University, University of Pretoria, University of the Witwatersrand, Nelson Mandela University",
        aps_minimum: 5,
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

    console.log(`✅ ${careers.length} careers seeded successfully`);
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

};
// ================= APS FUNCTIONS =================

export const getApsPoints = (percentage: number): number => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
};
// ================= UNIVERSITIES & COLLEGES =================

// Get all universities
export const getUniversities = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM universities");
  } catch (error) {
    console.error("❌ Get universities error:", error);
    return [];
  }
};

// Get all colleges (TVET)
export const getColleges = async () => {
  try {
    return await db.getAllAsync("SELECT * FROM colleges");
  } catch (error) {
    console.error("❌ Get colleges error:", error);
    return [];
  }
};

// Get courses for a specific institution
export const getCoursesByInstitution = async (
  institutionId: number,
  type: string
) => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM courses WHERE institution_id = ? AND institution_type = ?",
      [institutionId, type]
    );
  } catch (error) {
    console.error("❌ Get courses error:", error);
    return [];
  }
};

// Filter institutions by APS
export const filterInstitutionsByAps = async (aps: number) => {
  try {
    return await db.getAllAsync(
      `
      SELECT * FROM universities WHERE minimum_aps <= ?
      UNION
      SELECT * FROM colleges WHERE minimum_aps <= ?
      `,
      [aps, aps]
    );
  } catch (error) {
    console.error("❌ APS filter error:", error);
    return [];
  }
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
