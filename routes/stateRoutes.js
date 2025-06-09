const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

// Rota principal para buscar todos os estados (usada pelo frontend)
router.get('/', stateController.getAllStates);

// Rotas alternativas para compatibilidade
router.get('/all', stateController.getAllStates);

// Rotas CRUD
router.get('/:id', stateController.getStateById);
router.post('/', stateController.createState);
router.post('/create', stateController.createState);
router.put('/:id', stateController.updateState);
router.delete('/:id', stateController.deleteState);

module.exports = router;

