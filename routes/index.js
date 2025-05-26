const express = require('express');
const router = express.Router();
const path = require('path');

// Rotas
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Entrar',
    contentPage: path.join(__dirname, '../views/pages/create-user')
  });
});

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

router.get('/tasks/:id/edit', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Editar Tarefa',
    contentPage: path.join(__dirname, '../views/pages/edit-task')
  });
});

// Importante: Exportar o router para que server.js possa utilizá-lo
module.exports = router;