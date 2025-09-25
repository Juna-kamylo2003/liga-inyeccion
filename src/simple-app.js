const express = require('express');

console.log('🚀 Iniciando aplicación simple...');

const app = express();
app.use(express.json());

// Endpoint de prueba básico
app.get('/simple-test', (req, res) => {
  console.log('🧪 Simple test endpoint llamado');
  res.json({ 
    message: 'Simple app funcionando', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'no-env',
    db_host: process.env.DB_HOST ? 'configured' : 'not-configured'
  });
});

// Test de configuración
app.get('/config-test', (req, res) => {
  console.log('⚙️ Config test endpoint llamado');
  try {
    const config = require('../config/config.js');
    res.json({ 
      success: true,
      environment: process.env.NODE_ENV || 'development',
      hasConfig: !!config,
      configKeys: Object.keys(config || {}),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Test de modelos
app.get('/models-test', (req, res) => {
  console.log('📁 Models test endpoint llamado');
  try {
    const models = require('../../models');
    res.json({ 
      success: true,
      hasModels: !!models,
      modelKeys: Object.keys(models || {}),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Simple app corriendo en puerto ${PORT}`);
});

module.exports = app;