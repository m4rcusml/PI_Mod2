const CategoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
  try {
    console.log('Buscando todas as categorias...');
    const categories = await CategoryModel.getAll();
    console.log(`Encontradas ${categories.length} categorias:`, categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.getById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }

    const newCategory = await CategoryModel.create({ name: name.trim() });
    console.log('Categoria criada:', newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }

    const updatedCategory = await CategoryModel.update(req.params.id, { name: name.trim() });
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.delete(req.params.id);
    if (deletedCategory) {
      res.status(200).json(deletedCategory);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getAllCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
};

