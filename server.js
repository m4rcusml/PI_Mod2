const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');
const userRoutes = require('./routes/userRoutes'); // Adicione esta linha
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Configuração da view engine  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rotas
app.use('/', routes);
app.use('/users', userRoutes); // Adicione esta linha

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});