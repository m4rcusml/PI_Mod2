const CategoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.getById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Categoria nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await CategoryModel.create(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await CategoryModel.update(req.params.id, { name });
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Categoria nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.delete(req.params.id);
    if (deletedCategory) {
      res.status(200).json(deletedCategory);
    } else {
      res.status(404).json({ error: 'Categoria nao encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };