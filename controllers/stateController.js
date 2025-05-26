const StateModel = require('../models/stateModel');

async function getAllStates(req, res) {
  try {
    const states = await StateModel.getAll();
    res.status(200).json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getStateById(req, res) {
  try {
    const state = await StateModel.getById(req.params.id);
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ error: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createState(req, res) {
  try {
    const { name } = req.body;
    const newState = await StateModel.create(name);
    res.status(201).json(newState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateState(req, res) {
  try {
    const { name } = req.body;
    const updatedState = await StateModel.update(req.params.id, { name });
    if (updatedState) {
      res.status(200).json(updatedState);
    } else {
      res.status(404).json({ error: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteState(req, res) {
  try {
    const deletedState = await StateModel.delete(req.params.id);
    if (deletedState) {
      res.status(200).json(deletedState);
    } else {
      res.status(404).json({ error: 'State not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
};