const express = require('express');
const container = require('./config/dependency-injection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const routes = require('./routes/index');
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
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