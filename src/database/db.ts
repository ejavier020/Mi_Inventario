import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('inventory.db');

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);
};

// CRUD Operations
export const addProduct = async (code: string, name: string, date: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO products (code, name, date) VALUES (?, ?, ?)',
      code,
      name,
      date
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, code: string, name: string, date: string) => {
  await db.runAsync(
    'UPDATE products SET code = ?, name = ?, date = ? WHERE id = ?',
    code,
    name,
    date,
    id
  );
};

export const deleteProduct = async (id: number) => {
  await db.runAsync('DELETE FROM products WHERE id = ?', id);
};

export const getAllProducts = async (search: string = '') => {
  let query = 'SELECT * FROM products';
  const params: string[] = [];
  if (search) {
    query += ' WHERE name LIKE ? OR code LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }
  query += ' ORDER BY id DESC';
  const result = await db.getAllAsync(query, ...params);
  return result as Product[];
};

export const getProductByCode = async (code: string) => {
  const result = await db.getFirstAsync('SELECT * FROM products WHERE code = ?', code);
  return result as Product | null;
};

// Tipo Product (ajústalo según tu interface)
export interface Product {
  id: number;      // SQLite usa number, no string
  code: string;
  name: string;
  date: string;
}