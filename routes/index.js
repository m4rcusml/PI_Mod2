const express = require('express');
const router = express.Router();
const path = require('path');

// Rota raiz redireciona para login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Rota de login
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../views/pages/login'));
});

// Rota home
router.get('/home', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Home',
    contentPage: path.join(__dirname, '../views/pages/home')
  });
});

router.get('/tasks/new', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Adicionar Tarefa',
    contentPage: path.join(__dirname, '../views/pages/new-task')
  });
});

router.get('/new-task', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Adicionar Tarefa',
    contentPage: path.join(__dirname, '../views/pages/new-task')
  });
});

router.get('/create-category', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Criar Categoria',
    contentPage: path.join(__dirname, '../views/pages/create-category')
  });
});

router.get('/create-status', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Criar Estado',
    contentPage: path.join(__dirname, '../views/pages/create-status')
  });
});

router.get('/kanban', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Kanban',
    contentPage: path.join(__dirname, '../views/pages/kanban')
  });
});

router.get('/tasks', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Tarefas',
    contentPage: path.join(__dirname, '../views/pages/tasks')
  });
});

router.get('/profile', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Perfil',
    contentPage: path.join(__dirname, '../views/pages/profile')
  });
});

router.get('/tasks/:id/edit', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Editar Tarefa',
    contentPage: path.join(__dirname, '../views/pages/edit-task')
  });
});

module.exports = router;

