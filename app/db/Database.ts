import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('ikamvahub.db');

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
        subjects_offered TEXT
      );

      -- SCHOOL CONTACTS TABLE
      DROP TABLE IF EXISTS school_details;
      CREATE TABLE IF NOT EXISTS school_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        school_id INTEGER,
        phone TEXT,
        address TEXT,
        email TEXT,
        website TEXT,
        FOREIGN KEY (school_id) REFERENCES schools (id) ON DELETE CASCADE
      );
    `);
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database init error:', error);
  }
};

// ==================== USER CRUD (Person 3) ====================
export const createUser = async (name: string, email: string, password?: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password || '']
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Create user error:', error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    return await db.getAllAsync('SELECT * FROM users');
  } catch (error) {
    console.error('❌ Get users error:', error);
    return [];
  }
};

export const getUserById = async (id: number) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM users WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('❌ Get user error:', error);
    return null;
  }
};

export const updateUser = async (id: number, name: string, email: string) => {
  try {
    await db.runAsync('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return true;
  } catch (error) {
    console.error('❌ Update user error:', error);
    return false;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('❌ Delete user error:', error);
    return false;
  }
};

// ==================== PROFILE CRUD (Person 4) ====================
export const createProfile = async (data: any) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO profiles (user_id, bio, profile_pic, phone, location) VALUES (?, ?, ?, ?, ?)',
      [data.user_id, data.bio || '', data.profile_pic || '', data.phone || '', data.location || '']
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Create profile error:', error);
    return null;
  }
};

export const getProfileByUserId = async (userId: number) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM profiles WHERE user_id = ?', [userId]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('❌ Get profile error:', error);
    return null;
  }
};

export const updateProfile = async (userId: number, data: any) => {
  try {
    await db.runAsync(
      'UPDATE profiles SET bio = ?, profile_pic = ?, phone = ?, location = ? WHERE user_id = ?',
      [data.bio, data.profile_pic, data.phone, data.location, userId]
    );
    return true;
  } catch (error) {
    console.error('❌ Update profile error:', error);
    return false;
  }
};

export const deleteProfile = async (userId: number) => {
  try {
    await db.runAsync('DELETE FROM profiles WHERE user_id = ?', [userId]);
    return true;
  } catch (error) {
    console.error('❌ Delete profile error:', error);
    return false;
  }
};

// ==================== TASK CRUD (Person 6) ====================
export const createTask = async (data: any) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO tasks (title, description, priority, status, due_date, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [data.title, data.description || '', data.priority || 'medium', data.status || 'pending', data.due_date || '', data.user_id]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Create task error:', error);
    return null;
  }
};

export const getTasksByUser = async (userId: number) => {
  try {
    return await db.getAllAsync('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  } catch (error) {
    console.error('❌ Get tasks error:', error);
    return [];
  }
};

export const updateTaskStatus = async (id: number, status: string) => {
  try {
    await db.runAsync('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    return true;
  } catch (error) {
    console.error('❌ Update task error:', error);
    return false;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('❌ Delete task error:', error);
    return false;
  }
};

// ==================== SETTINGS CRUD (Person 6) ====================
export const getSettings = async (userId: number): Promise<{ notifications_enabled: number; dark_mode: number }> => {
  try {
    const result = await db.getAllAsync('SELECT * FROM settings WHERE user_id = ?', [userId]);
    if (result.length === 0) {
      await db.runAsync(
        'INSERT INTO settings (user_id, notifications_enabled, dark_mode) VALUES (?, ?, ?)',
        [userId, 1, 0]
      );
      return { notifications_enabled: 1, dark_mode: 0 };
    }
    return result[0] as { notifications_enabled: number; dark_mode: number };
  } catch (error) {
    console.error('❌ Get settings error:', error);
    return { notifications_enabled: 1, dark_mode: 0 };
  }
};

export const updateSettings = async (userId: number, data: any) => {
  try {
    await db.runAsync(
      'UPDATE settings SET notifications_enabled = ?, dark_mode = ? WHERE user_id = ?',
      [data.notifications_enabled, data.dark_mode, userId]
    );
    return true;
  } catch (error) {
    console.error('❌ Update settings error:', error);
    return false;
  }
};

// ==================== NOTIFICATION CRUD (Person 6) ====================
export const createNotification = async (userId: number, title: string, message: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)',
      [userId, title, message]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Create notification error:', error);
    return null;
  }
};

export const getNotificationsByUser = async (userId: number) => {
  try {
    return await db.getAllAsync(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
  } catch (error) {
    console.error('❌ Get notifications error:', error);
    return [];
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    await db.runAsync('UPDATE notifications SET read = 1 WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('❌ Mark notification error:', error);
    return false;
  }
};

// ==================== SCHOOLS SEED DATA ====================
export const seedSchools = async () => {
  try {
    // Temporarily skip the check to force reseed
    // const existing = await db.getAllAsync('SELECT id FROM schools LIMIT 1');
    // if (existing.length > 0) {
    //   console.log('ℹ️ Schools already seeded, skipping');
    //   return;
    // }

    const schools = [
      ['Baleni Secondary School', 'Eastern Cape', 'Public', 'Bizana', '', ''],
      ['Tyelimhlophe Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Toleni Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Bonxa High School', 'Eastern Cape', 'Public', 'Tabankulu', '', ''],
      ['Dumsi Senior Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Zibokwana High School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Dangwana High School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Zwelitsha High Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Mbodleli High School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Mfazwe Tech High School', 'Eastern Cape', 'Public', 'Tabankulu', '', ''],
      ['Mpondombini Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Mvenyane High School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Nzululwazi High School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
      ['Nomaqwathekana Secondary School', 'Eastern Cape', 'Public', 'Mount Frere', '', ''],
    ];

    for (const school of schools) {
      await db.runAsync(
        'INSERT INTO schools (name, province, type, location, contact, email) VALUES (?, ?, ?, ?, ?, ?)',
        school
      );
    }

    // ===== SUBJECTS OFFERED (Languages, Subjects, Programs) =====
    const schoolSubjects = [
      ['Baleni Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Tyelimhlophe Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Agricultural Sciences, Agricultural Technology, Life Sciences, Geography\nPrograms: NSC CAPS curriculum with Agricultural specialisation (Gr 8-12)'],
      ['Toleni Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Bonxa High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Accounting, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum with Accounting (Gr 8-12)'],
      ['Dumsi Senior Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Zibokwana High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Dangwana High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Zwelitsha High Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Mbodleli High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Compulsory: Mathematics, Mathematical Literacy, Life Orientation. Optional (choose 3): Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences, Accounting, Business Studies, Economics, Tourism, Consumer Studies\nPrograms: NSC CAPS curriculum (Gr 10-12)'],
      ['Mfazwe Tech High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Civil Technology, Electrical Technology, Mechanical Technology, Engineering Graphics & Design (EGD), Technical Sciences\nPrograms: NSC CAPS curriculum with Comprehensive Technical specialisation (Gr 8-12)'],
      ['Mpondombini Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Mvenyane High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Nzululwazi High School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences\nPrograms: NSC CAPS curriculum (Gr 8-12)'],
      ['Nomaqwathekana Secondary School', 'Languages: isiXhosa (HL), English (FAL)\nSubjects: Mathematics, Mathematical Literacy, Life Orientation, and elective subjects per CAPS\nPrograms: NSC CAPS curriculum'],
    ];

    for (const [name, subjects] of schoolSubjects) {
      await db.runAsync(
        'UPDATE schools SET subjects_offered = ? WHERE name = ?',
        [subjects, name]
      );
    }

    console.log('✅ Schools seeded successfully');
  } catch (error) {
    console.error('❌ Seed schools error:', error);
  }
};

// ==================== SCHOOL FUNCTIONS ====================
export const getSchools = async () => {
  try {
    return await db.getAllAsync('SELECT * FROM schools');
  } catch (error) {
    console.error('❌ Get schools error:', error);
    return [];
  }
};

export const searchSchools = async (query: string) => {
  try {
    return await db.getAllAsync('SELECT * FROM schools WHERE name LIKE ?', [`%${query}%`]);
  } catch (error) {
    console.error('❌ Search schools error:', error);
    return [];
  }
};

export const filterSchools = async (province: string, type: string) => {
  try {
    return await db.getAllAsync(
      'SELECT * FROM schools WHERE province LIKE ? AND type LIKE ?',
      [`%${province}%`, `%${type}%`]
    );
  } catch (error) {
    console.error('❌ Filter schools error:', error);
    return [];
  }
};

export const getSchoolById = async (id: number) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM schools WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('❌ Get school by ID error:', error);
    return null;
  }
};

export const getSchoolContacts = async (schoolId: number) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM school_contacts WHERE school_id = ?', [schoolId]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('❌ Get school contacts error:', error);
    return null;
  }
};

export default db;