const db = require("../config/db");

class Task {
  static async getAll(userName) {
    let query = `
      SELECT
        t.id,
        t.title,
        t.description,
        t.created_at,
        t.due_date,
        t.supertask_id,
        COALESCE(c.name, 'Sem categoria') as category_name,
        COALESCE(s.name, 'Sem estado') as state_name
      FROM tasks t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN states s ON t.state_id = s.id
    `;
    const params = [];

    if (userName) {
      query += ` JOIN user_tasks ut ON t.id = ut.task_id WHERE ut.user_name = $1`;
      params.push(userName);
    }

    query += ` ORDER BY t.created_at DESC`;

    console.log('Query SQL:', query);
    console.log('Parâmetros:', params);

    const result = await db.query(query, params);
    console.log('Resultado da query:', result.rows);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query(
      `SELECT
        t.id,
        t.title,
        t.description,
        t.created_at,
        t.due_date,
        t.supertask_id,
        COALESCE(c.name, 'Sem categoria') as category_name,
        COALESCE(s.name, 'Sem estado') as state_name
      FROM tasks t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN states s ON t.state_id = s.id
      WHERE t.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async markAsDone(id) {
    // Buscar o ID do estado "Concluído"
    const stateResult = await db.query("SELECT id FROM states WHERE name ILIKE '%concluí%'");
    const completedStateId = stateResult.rows[0]?.id || 3; // fallback para 3 se não encontrar
    
    const result = await db.query(
      'UPDATE tasks SET state_id = $1 WHERE id = $2 RETURNING *',
      [completedStateId, id]
    );
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO tasks (title, description, due_date, category_id, state_id, supertask_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.title,
        data.description,
        data.due_date,
        data.category_id,
        data.state_id || 1, // Default para "Pendente"
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

