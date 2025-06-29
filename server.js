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
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Configuração do MIME type
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  }
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Rotas principais
app.use('/', routes);

// Rotas da API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/states', require('./routes/stateRoutes'));
app.use('/api/user-tasks', require('./routes/userTaskRoutes'));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

