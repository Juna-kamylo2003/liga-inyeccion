'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const allConfigs = require(__dirname + '/../config/config.js');

// Forzar configuración de producción si estamos en AWS
let config = allConfigs[env];
if (!config && (env === 'production' || process.env.DB_HOST && process.env.DB_HOST.includes('amazonaws.com'))) {
  console.log('🔧 Forcing production config for AWS environment');
  config = allConfigs.production;
}
const db = {};

// Debug logs para AWS (solo en desarrollo)
if (env !== 'test' && config) {
  console.log('=== DATABASE CONFIG DEBUG ===');
  console.log('NODE_ENV:', env);
  console.log('Available configs:', Object.keys(allConfigs));
  console.log('Using config:', {
    username: config.username,
    database: config.database,
    host: config.host,
    dialect: config.dialect
  });
  console.log('Environment variables:');
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('============================');
}

let sequelize;
if (config) {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
} else {
  // Fallback config for tests
  sequelize = new Sequelize('ligas_db_test', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    logging: false
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
