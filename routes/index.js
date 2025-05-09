const express = require('express');
const router = express.Router();
const path = require('path');

// Configuração da view engine
router.use((req, res, next) => {
  res.locals.app = {
    views: path.join(__dirname, '../views')
  };
  next();
});

// Rotas
router.get('/', (req, res) => {
  res.render('layout/main', { 
    pageTitle: 'Página Inicial', 
    contentPage: '../pages/page1' 
  });
});

router.get('/about', (req, res) => {
  res.render('layout/main', { 
    pageTitle: 'Sobre', 
    contentPage: '../pages/page2' 
  });
});

// Importante: Exportar o router para que server.js possa utilizá-lo
module.exports = router;