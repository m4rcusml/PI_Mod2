const TaskModel = require('../models/taskModel');
const UserTaskModel = require('../models/userTaskModel');

const markTaskAsDone = async (req, res) => {
  try {
    const task = await TaskModel.markAsDone(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao marcar tarefa como concluída:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userName = req.query.user_name;
    console.log('Buscando tarefas para o usuário:', userName);
    
    if (!userName) {
      console.log('Nenhum user_name fornecido, retornando todas as tarefas');
    }
    
    const tasks = await TaskModel.getAll(userName);
    console.log(`Encontradas ${tasks.length} tarefas para o usuário ${userName}`);
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    console.log('=== Controller.getTaskById ===');
    console.log('ID recebido:', req.params.id);
    console.log('Tipo do ID:', typeof req.params.id);
    console.log('URL completa:', req.originalUrl);
    console.log('Método HTTP:', req.method);
    
    // Validar se o ID é um número válido
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId) || taskId <= 0) {
      console.log('ID inválido:', req.params.id);
      return res.status(400).json({ error: 'ID da tarefa inválido' });
    }
    
    console.log('ID validado:', taskId);
    
    const task = await TaskModel.getById(taskId);
    console.log('Tarefa retornada do model:', task);
    
    if (task) {
      console.log('Tarefa encontrada, enviando resposta');
      res.status(200).json(task);
    } else {
      console.log('Tarefa não encontrada');
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('=== ERRO no Controller.getTaskById ===');
    console.error('Erro:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, due_date, category_id, state_id, supertask_id, user_name } = req.body;
    
    console.log('Dados recebidos para criar tarefa:', req.body);
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    if (!user_name || !user_name.trim()) {
      return res.status(400).json({ error: 'Nome do usuário é obrigatório' });
    }

    const newTask = await TaskModel.create({
      title: title.trim(), 
      description, 
      due_date, 
      category_id, 
      state_id, 
      supertask_id
    });
    
    console.log('Tarefa criada:', newTask);
    
    // Associar a tarefa ao usuário na tabela user_tasks
    if (newTask) {
      const userTask = await UserTaskModel.create(user_name.trim(), newTask.id);
      console.log('Associação user_task criada:', userTask);
    }
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, due_date, category_id, state_id, supertask_id } = req.body;
    const updatedTask = await TaskModel.update(req.params.id, { 
      title, description, due_date, category_id, state_id, supertask_id 
    });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    // Primeiro, remover todas as associações user_tasks
    await UserTaskModel.deleteAllByTaskId(req.params.id);
    
    // Depois, deletar a tarefa
    const deletedTask = await TaskModel.delete(req.params.id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  markTaskAsDone,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

