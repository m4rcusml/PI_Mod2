const UserTaskModel = require('../models/userTaskModel');

const createUserTask = async (req, res) => {
  try {
    const { user_name, task_id } = req.body;
    
    if (!user_name || !task_id) {
      return res.status(400).json({ error: 'user_name e task_id são obrigatórios' });
    }

    const userTask = await UserTaskModel.create(user_name, task_id);
    res.status(201).json(userTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByUserName = async (req, res) => {
  try {
    const tasks = await UserTaskModel.getTasksByUserName(req.params.userName);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersByTaskId = async (req, res) => {
  try {
    const users = await UserTaskModel.getUsersByTaskId(req.params.taskId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserTask = async (req, res) => {
  try {
    const { user_name, task_id } = req.body;
    
    if (!user_name || !task_id) {
      return res.status(400).json({ error: 'user_name e task_id são obrigatórios' });
    }

    const deletedUserTask = await UserTaskModel.delete(user_name, task_id);
    if (deletedUserTask) {
      res.status(200).json(deletedUserTask);
    } else {
      res.status(404).json({ error: 'Associação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserTask,
  getTasksByUserName,
  getUsersByTaskId,
  deleteUserTask
};

