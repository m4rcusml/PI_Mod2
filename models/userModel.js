const db = require('../config/db');

class User {
  static async getAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async getByName(name) {
    const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async searchByName(name) {
    const result = await db.query('SELECT * FROM users WHERE name ILIKE $1', [`%${name}%`]);
    return result.rows;
  }

  static async authenticate(name) {
    // Busca exata por nome para login
    const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO users (name, photo) VALUES ($1, $2) RETURNING *',
      [data.name, data.photo]
    );
    return result.rows[0];
  }

  static async update(name, data) {
    const result = await db.query(
      'UPDATE users SET photo = $1 WHERE name = $2 RETURNING *',
      [data.photo, name]
    );
    return result.rows[0];
  }

  static async delete(name) {
    const result = await db.query('DELETE FROM users WHERE name = $1 RETURNING *', [name]);
    return result.rowCount > 0;
  }

  static async exists(name) {
    const result = await db.query('SELECT 1 FROM users WHERE name = $1', [name]);
    return result.rows.length > 0;
  }
}

module.exports = User;

