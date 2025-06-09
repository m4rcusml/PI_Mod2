const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    let users;
    
    if (name) {
      users = await UserModel.searchByName(name);
    } else {
      users = await UserModel.getAll();
    }
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await UserModel.getByName(req.params.name);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const trimmedName = name.trim();
    const user = await UserModel.authenticate(trimmedName);
    
    if (user) {
      res.status(200).json({ 
        success: true, 
        user: { name: user.name, photo: user.photo }
      });
    } else {
      // Usuário não existe, criar automaticamente
      try {
        const newUser = await UserModel.create({ name: trimmedName, photo: null });
        res.status(201).json({ 
          success: true, 
          user: { name: newUser.name, photo: newUser.photo },
          created: true
        });
      } catch (createError) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, photo } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const trimmedName = name.trim();
    
    // Verificar se usuário já existe
    const existingUser = await UserModel.exists(trimmedName);
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    const newUser = await UserModel.create({ name: trimmedName, photo });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { photo } = req.body;
    const userName = req.params.name;
    
    const updatedUser = await UserModel.update(userName, { photo });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userName = req.params.name;
    const deleted = await UserModel.delete(userName);
    if (deleted) {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByName,
  login,
  createUser,
  updateUser,
  deleteUser
};

