const express = require('express');
console.log('🚀 Iniciando aplicación...');

let container;
try {
  console.log('📦 Importando container...');
  const dependencyInjection = require('./config/dependency-injection');
  container = dependencyInjection.container;
  console.log('✅ Container importado exitosamente');
} catch (error) {
  console.error('❌ Error importando container:', error.message);
  console.error('❌ Stack trace:', error.stack);
}

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();
console.log('🌐 Express app creada');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const routes = require('./routes/index');
app.use('/api', routes);

// Simple test endpoint
app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint llamado');
  res.json({ message: 'App funcionando', timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Debug endpoint temporal
app.get('/debug-container', (req, res) => {
  try {
    const ligaController = container.get('LigaController');
    res.json({
      success: true,
      containerWorking: !!ligaController,
      environment: process.env.NODE_ENV,
      dbConfig: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      environment: process.env.NODE_ENV,
      dbConfig: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER
      }
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Liga API - Sistema de Gestión de Ligas Deportivas',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health',
    endpoints: {
      ligas: '/api/ligas',
      temporadas: '/api/temporadas', 
      equipos: '/api/equipos',
      jugadores: '/api/jugadores',
      partidos: '/api/partidos',
      resultados: '/api/resultados',
      usuarios: '/api/usuarios',
      'tabla-posiciones': '/api/tabla-posiciones'
    }
  });
});

// Endpoint temporal para ejecutar migraciones en la nueva base de datos
app.post('/run-migrations', async (req, res) => {
  try {
    const { execSync } = require('child_process');
    const sequelize = require('../models').sequelize;
    
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    
    // Verificar estado actual de la base de datos
    const tables = await sequelize.getQueryInterface().showAllTables();
    
    if (tables.length > 1) { // Solo SequelizeMeta debería existir
      return res.json({
        success: false,
        message: 'La base de datos no está limpia',
        existingTables: tables,
        recommendation: 'Usar endpoint /clean-production-db primero'
      });
    }
    
    // Ejecutar migraciones
    const result = execSync('npx sequelize-cli db:migrate', { 
      encoding: 'utf8',
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    // Verificar tablas creadas
    const tablesAfter = await sequelize.getQueryInterface().showAllTables();
    
    res.json({
      success: true,
      message: 'Migraciones ejecutadas correctamente en producción',
      migrationoutput: result,
      tablesCreated: tablesAfter,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    
    // Intento alternativo con sync
    try {
      console.log('🔄 Intentando con sequelize.sync...');
      const models = require('../models');
      
      // Verificar conexión
      await models.sequelize.authenticate();
      console.log('✅ Conexión a la base de datos exitosa');
      
      // Ejecutar migraciones usando sync
      await models.sequelize.sync({ force: false });
      console.log('✅ Tablas sincronizadas correctamente');
      
      // Verificar tablas creadas
      const tables = await models.sequelize.getQueryInterface().showAllTables();
      
      res.json({
        success: true,
        message: 'Migraciones ejecutadas exitosamente con sync',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        tablesCreated: tables,
        timestamp: new Date().toISOString()
      });
      
    } catch (syncError) {
      console.error('❌ Error con sync también:', syncError);
      res.status(500).json({
        success: false,
        error: syncError.message,
        originalError: error.message,
        message: 'Error ejecutando migraciones'
      });
    }
  }
});

// Endpoint para limpiar la base de datos de producción
app.post('/clean-production-db', async (req, res) => {
  try {
    const sequelize = require('../models').sequelize;
    
    // Verificar que estamos en producción
    if (process.env.NODE_ENV !== 'production') {
      return res.status(400).json({
        success: false,
        message: 'Este endpoint solo funciona en producción'
      });
    }
    
    // Desactivar verificación de claves foráneas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Obtener todas las tablas
    const tables = await sequelize.getQueryInterface().showAllTables();
    
    // Eliminar todas las tablas excepto SequelizeMeta (si existe)
    const tablesToDrop = tables.filter(table => table !== 'SequelizeMeta');
    
    for (const table of tablesToDrop) {
      await sequelize.query(`DROP TABLE IF EXISTS \`${table}\``);
    }
    
    // Reactivar verificación de claves foráneas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Verificar limpieza
    const remainingTables = await sequelize.getQueryInterface().showAllTables();
    
    res.json({
      success: true,
      message: 'Base de datos de producción limpiada exitosamente',
      tablesDropped: tablesToDrop,
      remainingTables: remainingTables,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error limpiando base de datos:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error limpiando base de datos de producción'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📚 Documentación: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;