-- init.sql - Refatorado para usar name como chave primária

-- Criar tabela de usuários com name como chave primária
CREATE TABLE IF NOT EXISTS users (
  name VARCHAR(100) PRIMARY KEY,
  photo VARCHAR(200)
);

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Criar tabela de estados
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE,
  category_id INTEGER,
  state_id INTEGER,
  supertask_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (state_id) REFERENCES states (id),
  FOREIGN KEY (supertask_id) REFERENCES tasks (id)
);

-- Criar tabela de relacionamento N:N entre usuários e tarefas
CREATE TABLE IF NOT EXISTS user_tasks (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks (id),
  FOREIGN KEY (user_name) REFERENCES users (name)
);

-- Inserir dados iniciais para categorias
INSERT INTO categories (name) VALUES 
  ('Trabalho'),
  ('Pessoal'),
  ('Estudos'),
  ('Casa')
ON CONFLICT DO NOTHING;

-- Inserir dados iniciais para estados
INSERT INTO states (name) VALUES 
  ('Pendente'),
  ('Em Andamento'),
  ('Concluído'),
  ('Cancelado')
ON CONFLICT DO NOTHING;

