const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da view engine  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuração para servir arquivos estáticos
app.use('/css', express.static(path.join(__dirname, 'views/css')));

// Configuração do MIME type (se ainda necessário)
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  }
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Rotas
app.use('/', routes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/states', require('./routes/stateRoutes'));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});