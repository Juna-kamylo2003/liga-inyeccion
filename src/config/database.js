// ...existing code...
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ligas_db',
  process.env.DB_USER || process.env.DB_USERNAME || (process.env.NODE_ENV === 'production' ? 'admin' : 'root'),
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || (process.env.NODE_ENV === 'production' ? 'mysql' : 'mariadb'),
    logging: false,
  }
);

module.exports = sequelize;
