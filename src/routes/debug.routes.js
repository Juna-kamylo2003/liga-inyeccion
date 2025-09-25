const express = require('express');
const router = express.Router();

// Endpoint para debug en producción
router.get('/debug', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(403).json({ error: 'Debug endpoint only available in production' });
  }
  
  const config = require('../config/config.js');
  const env = process.env.NODE_ENV || 'development';
  
  res.json({
    environment: env,
    isAWSDetected: !!(process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 
                     (process.env.DB_HOST && process.env.DB_HOST.includes('rds.amazonaws.com'))),
    config: {
      username: config[env]?.username || 'NOT_SET',
      database: config[env]?.database || 'NOT_SET',
      host: config[env]?.host || 'NOT_SET',
      dialect: config[env]?.dialect || 'NOT_SET'
    },
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV,
      DB_USER: process.env.DB_USER ? '***SET***' : 'NOT_SET',
      DB_PASSWORD: process.env.DB_PASSWORD ? '***SET***' : 'NOT_SET',
      DB_NAME: process.env.DB_NAME || 'NOT_SET',
      DB_HOST: process.env.DB_HOST || 'NOT_SET',
      AWS_REGION: process.env.AWS_REGION || 'NOT_SET'
    }
  });
});

module.exports = router;