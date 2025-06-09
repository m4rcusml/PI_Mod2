const StateModel = require('../models/stateModel');

const getAllStates = async (req, res) => {
  try {
    console.log('Buscando todos os estados...');
    const states = await StateModel.getAll();
    console.log(`Encontrados ${states.length} estados:`, states);
    res.status(200).json(states);
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    res.status(500).json({ error: error.message });
  }
};

const getStateById = async (req, res) => {
  try {
    const state = await StateModel.getById(req.params.id);
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ error: 'Estado não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar estado por ID:', error);
    res.status(500).json({ error: error.message });
  }
};

const createState = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome do estado é obrigatório' });
    }

    const newState = await StateModel.create({ name: name.trim() });
    console.log('Estado criado:', newState);
    res.status(201).json(newState);
  } catch (error) {
    console.error('Erro ao criar estado:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateState = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome do estado é obrigatório' });
    }

    const updatedState = await StateModel.update(req.params.id, { name: name.trim() });
    if (updatedState) {
      res.status(200).json(updatedState);
    } else {
      res.status(404).json({ error: 'Estado não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteState = async (req, res) => {
  try {
    const deletedState = await StateModel.delete(req.params.id);
    if (deletedState) {
      res.status(200).json(deletedState);
    } else {
      res.status(404).json({ error: 'Estado não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar estado:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
};

