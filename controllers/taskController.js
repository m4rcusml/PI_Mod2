const TaskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarefa nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, category_id, state_id, supertask_id, user_id } = req.body;
    const newTask = await TaskModel.create({
      title, description, due_date, category_id, state_id, supertask_id, user_id
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, due_date, category_id, state_id, supertask_id, user_id } = req.body;
    const updatedTask = await TaskModel.update(req.params.id, { title, description, due_date, category_id, state_id, supertask_id, user_id });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await TaskModel.delete(req.params.id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ error: 'Tarefa nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};