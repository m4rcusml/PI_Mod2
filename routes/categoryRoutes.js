const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Rota principal para buscar todas as categorias (usada pelo frontend)
router.get('/', categoryController.getAllCategories);

// Rotas alternativas para compatibilidade
router.get('/all', categoryController.getAllCategories);

// Rotas CRUD
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.post('/create', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

