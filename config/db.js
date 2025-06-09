const { Pool } = require('pg');
require('dotenv').config();

const isSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

// Adicionar logs de conexão
pool.on('connect', () => {
  console.log('Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente do banco de dados:', err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    try {
      console.log('Executando query:', text);
      console.log('Parâmetros:', params);
      const result = await pool.query(text, params);
      console.log('Query executada com sucesso, linhas retornadas:', result.rowCount);
      return result;
    } catch (error) {
      console.error('Erro na execução da query:', error);
      throw error;
    }
  },
  connect: () => pool.connect(),
};
