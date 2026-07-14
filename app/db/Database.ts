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

      /* Table for schools */
      export const schools = [
  {
    id: 1,
    name: "Baleni Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Mthatha"
  },
  {
    id: 2,
    name: "Tyelimhlophe Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Butterworth"
  },
  {
    id: 3,
    name: "Toleni Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Ngqeleni"
  },
  {
    id: 4,
    name: "Bonxa High School",
    province: "Eastern Cape",
    type: "Public",
    location: "East London"
  },
  {
    id: 5,
    name: "Dumsi Senior Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Dutywa"
  },
  {
    id: 6,
    name: "Zibokwana High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Libode"
  },
  {
    id: 7,
    name: "Dangwana High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Qumbu"
  },
  {
    id: 8,
    name: "Zwelitsha High Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Zwelitsha"
  },
  {
    id: 9,
    name: "Mbodleli High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Mthatha"
  },
  {
    id: 10,
    name: "Mfazwe Tech High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Ngcobo"
  },
  {
    id: 11,
    name: "Mpondombini Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Flagstaff"
  },
  {
    id: 12,
    name: "Mvenyane High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Bizana"
  },
  {
    id: 13,
    name: "Nzululwazi High School",
    province: "Eastern Cape",
    type: "Public",
    location: "Lusikisiki"
  },
  {
    id: 14,
    name: "Nomaqwathekana Secondary School",
    province: "Eastern Cape",
    type: "Public",
    location: "Mount Frere"
  }
];



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
export const getSettings = async (userId: number) => {
  try {
    const result = await db.getAllAsync('SELECT * FROM settings WHERE user_id = ?', [userId]);
    if (result.length === 0) {
      // Create default settings if none exist
      await db.runAsync(
        'INSERT INTO settings (user_id, notifications_enabled, dark_mode) VALUES (?, ?, ?)',
        [userId, 1, 0]
      );
      return { notifications_enabled: 1, dark_mode: 0 };
    }
    return result[0];
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


// ==================== SCHOOLS CRUD ====================
export const getSchools = async () => {
  try {
    return await db.getAllAsync('SELECT * FROM schools ORDER BY name');
  } catch (error) {
    console.error('❌ Get schools error:', error);
    return [];
  }
};

export default db;