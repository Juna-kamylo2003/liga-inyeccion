// ...existing code...
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Debug: Log environment variables
if (process.env.NODE_ENV === 'test') {
  console.log('Database config debug:');
  console.log('DB_NAME:', process.env.DB_NAME || 'ligas_db');
  console.log('DB_USERNAME:', process.env.DB_USER || process.env.DB_USERNAME || 'root');
  console.log('DB_HOST:', process.env.DB_HOST || '127.0.0.1');
  console.log('DB_PORT:', process.env.DB_PORT || 3306);
  console.log('DB_DIALECT:', process.env.DB_DIALECT || 'mariadb');
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ligas_db',
  process.env.DB_USER || process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mariadb',
    logging: process.env.NODE_ENV === 'test' ? console.log : false,
  }
);

export default sequelize;
