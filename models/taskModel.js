const db = require('../config/db');

class Task {
  static async getAll() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO tasks (title, description, created_at, due_date, category_id, state_id, supertask_id)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6) RETURNING *`,
      [
        data.title,
        data.description,
        data.due_date,
        data.category_id,
        data.state_id,
        data.supertask_id
      ]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, category_id = $4, state_id = $5, supertask_id = $6 WHERE id = $7 RETURNING *',
      [
        data.title,
        data.description,
        data.due_date,
        data.category_id,
        data.state_id,
        data.supertask_id,
        id
      ]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Task;