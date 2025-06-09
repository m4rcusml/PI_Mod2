const db = require('../config/db');

class Category {
  static async getAll() {
    console.log('Executando query: SELECT * FROM categories');
    const result = await db.query('SELECT * FROM categories ORDER BY name');
    console.log('Resultado da query categories:', result.rows);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [data.name]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [data.name, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Category;

