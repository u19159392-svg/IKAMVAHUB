import * as SQLite from 'expo-sqlite';

// Open the database (creates it if it doesn't exist)
const db = SQLite.openDatabaseSync('ikamvahub.db');

// Initialize tables
export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        bio TEXT,
        profile_pic TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database init error:', error);
  }
};

// User CRUD operations
export const createUser = async (name: string, email: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Create user error:', error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const users = await db.getAllAsync('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('❌ Get users error:', error);
    return [];
  }
};

export const updateUser = async (id: number, name: string, email: string) => {
  try {
    await db.runAsync(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
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

export default db;