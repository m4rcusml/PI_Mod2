const express = require('express');
const path = require('path');
const app = express();

// --- View Engine Setup ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Example routes
app.get('/', (req, res) => {
  res.render('layout/main', { 
    pageTitle: 'Página Inicial', 
    contentPage: 'pages/page1' 
  });
});

app.get('/about', (req, res) => {
  res.render('layout/main', { 
    pageTitle: 'Sobre', 
    contentPage: 'pages/page2' 
  });
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
