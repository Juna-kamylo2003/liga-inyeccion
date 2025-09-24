require('dotenv').config();

// Detectar si estamos en AWS de forma más agresiva
const isAWS = !!(
  process.env.AWS_REGION || 
  process.env.AWS_DEFAULT_REGION || 
  process.env.AWS_EXECUTION_ENV || 
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  (process.env.DB_HOST && process.env.DB_HOST.includes('rds.amazonaws.com')) ||
  (process.env.DB_HOST && process.env.DB_HOST.includes('.amazonaws.com')) ||
  process.env.EB_NODE_COMMAND // Elastic Beanstalk específico
);

// Debug temporalmente desactivado para tests más rápidos
if (process.env.NODE_ENV !== 'test') {
  console.log('=== CONFIG DEBUG ===');
  console.log('AWS Detection Variables:');
  console.log('- AWS_REGION:', process.env.AWS_REGION || 'NOT_SET');
  console.log('- AWS_DEFAULT_REGION:', process.env.AWS_DEFAULT_REGION || 'NOT_SET');
  console.log('- AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV || 'NOT_SET');
  console.log('- DB_HOST:', process.env.DB_HOST || 'NOT_SET');
  console.log('- EB_NODE_COMMAND:', process.env.EB_NODE_COMMAND || 'NOT_SET');
  console.log('- Is AWS detected:', isAWS);
}

// Si estamos en AWS, SIEMPRE forzar production
if (isAWS) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('🚀 AWS environment detected, forcing production');
  }
  process.env.NODE_ENV = 'production';
}

const configs = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ligas_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || process.env.TEST_DB_NAME || "liga_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false
  },
  production: {
    username: process.env.DB_USER || process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "footballdb",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || "mariadb",
    logging: (msg) => console.log('🔵 Sequelize:', msg),
    dialectOptions: {
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
      multipleStatements: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Si detectamos AWS, forzar TODO a usar configuración de producción
if (isAWS) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('🔧 AWS Production Config Applied:');
    console.log('- Host:', configs.production.host);
    console.log('- User:', configs.production.username);
    console.log('- Database:', configs.production.database);
    console.log('- Port:', configs.production.port);
  }
  
  // Forzar TODAS las configuraciones a usar production
  const forcedConfig = {
    development: { ...configs.production },
    test: { ...configs.production },
    production: { ...configs.production }
  };
  
  if (process.env.NODE_ENV !== 'test') {
    console.log('📋 All environments forced to production config');
    console.log('==================');
  }
  
  module.exports = forcedConfig;
} else {
  if (process.env.NODE_ENV !== 'test') {
    console.log('📋 Using standard multi-environment config');
    console.log('==================');
  }
  module.exports = configs;
}