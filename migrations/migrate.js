const db = require('../config/db');

class Migration {
  async up() {
    try {
      // Criar tabela de controle de migrations
      await this.createMigrationsTable();

      // Criar tabelas do sistema
      await this.createUsersTable();
      await this.createCategoriesTable();
      await this.createStatesTable();
      await this.createTasksTable();
      await this.createUserTasksTable();

      // Registrar execução da migration
      await this.recordMigration('initial_schema');

      console.log('Migration executada com sucesso');
    } catch (error) {
      console.error('Erro na migration:', error);
      throw error;
    }
  }

  async down() {
    try {
      // Remover tabelas em ordem reversa
      await db.query('DROP TABLE IF EXISTS user_tasks CASCADE');
      await db.query('DROP TABLE IF EXISTS tasks CASCADE');
      await db.query('DROP TABLE IF EXISTS states CASCADE');
      await db.query('DROP TABLE IF EXISTS categories CASCADE');
      await db.query('DROP TABLE IF EXISTS users CASCADE');
      await db.query('DROP TABLE IF EXISTS migrations CASCADE');

      console.log('Rollback executado com sucesso');
    } catch (error) {
      console.error('Erro no rollback:', error);
      throw error;
    }
  }

  async createMigrationsTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async recordMigration(name) {
    await db.query('INSERT INTO migrations (name) VALUES ($1)', [name]);
  }

  async createUsersTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        photo VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async createCategoriesTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);
  }

  async createStatesTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS states (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);
  }

  async createTasksTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        due_date DATE,
        category_id INTEGER REFERENCES categories(id),
        state_id INTEGER REFERENCES states(id),
        supertask_id INTEGER REFERENCES tasks(id)
      );
    `);
  }

  async createUserTasksTable() {
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_tasks (
        id SERIAL PRIMARY KEY,
        task_id INTEGER REFERENCES tasks(id),
        user_id INTEGER REFERENCES users(id)
      );
    `);
  }
}

// Função para executar a migration
async function runMigration() {
  const migration = new Migration();

  const action = process.argv[2]; // Pegar argumento da linha de comando

  try {
    if (action === 'down') {
      await migration.down();
    } else {
      await migration.up();
    }
  } catch (error) {
    console.error('Erro ao executar migration:', error);
    process.exit(1);
  }
}

runMigration();