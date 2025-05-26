-- init.sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários com UUID como chave primária
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  photo VARCHAR(200)
);

-- Criar tabela de categorias com UUID como chave primária
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL
);

-- Criar tabela de estados com UUID como chave primária
CREATE TABLE IF NOT EXISTS states (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL
);

-- Criar tabela de tarefas com UUID como chave primária
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE,
  category_id UUID,
  state_id UUID,
  supertask_id UUID,
  user_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (state_id) REFERENCES states (id),
  FOREIGN KEY (supertask_id) REFERENCES tasks (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Criar tabela de relacionamento N:N entre usuários e tarefas
CREATE TABLE IF NOT EXISTS user_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL,
  user_id UUID NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);