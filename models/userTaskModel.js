const db = require("../config/db");

class UserTask {
  static async create(userName, taskId) {
    const result = await db.query(
      "INSERT INTO user_tasks (user_name, task_id) VALUES ($1, $2) RETURNING *",
      [userName, taskId]
    );
    return result.rows[0];
  }

  static async getTasksByUserName(userName) {
    const result = await db.query(
      `SELECT t.*, c.name as category_name, s.name as state_name 
       FROM tasks t 
       JOIN user_tasks ut ON t.id = ut.task_id 
       JOIN categories c ON t.category_id = c.id 
       JOIN states s ON t.state_id = s.id 
       WHERE ut.user_name = $1
       ORDER BY t.created_at DESC`,
      [userName]
    );
    return result.rows;
  }

  static async getUsersByTaskId(taskId) {
    const result = await db.query(
      `SELECT u.* FROM users u 
       JOIN user_tasks ut ON u.name = ut.user_name 
       WHERE ut.task_id = $1`,
      [taskId]
    );
    return result.rows;
  }

  static async delete(userName, taskId) {
    const result = await db.query(
      "DELETE FROM user_tasks WHERE user_name = $1 AND task_id = $2 RETURNING *",
      [userName, taskId]
    );
    return result.rows[0];
  }

  static async deleteAllByTaskId(taskId) {
    const result = await db.query(
      "DELETE FROM user_tasks WHERE task_id = $1",
      [taskId]
    );
    return result.rowCount;
  }

  static async deleteAllByUserName(userName) {
    const result = await db.query(
      "DELETE FROM user_tasks WHERE user_name = $1",
      [userName]
    );
    return result.rowCount;
  }
}

module.exports = UserTask;

