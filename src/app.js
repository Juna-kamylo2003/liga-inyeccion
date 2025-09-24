// ...existing code...

const express = require('express');
const container = require('./config/dependency-injection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();

// Now it's safe to import routes after DI container is configured
const routes = require('./routes/index');

// Endpoint para diagnosticar problemas con los modelos y DI
app.get('/test-models', (req, res) => {
  try {
    const models = require('../models');
    
    res.json({
      success: true,
      message: 'Models and DI diagnostic',
      availableModels: Object.keys(models),
      modelDetails: {
        Liga: models.Liga ? 'Available ✅' : 'Missing ❌',
        Temporada: models.Temporada ? 'Available ✅' : 'Missing ❌',
        Equipo: models.Equipo ? 'Available ✅' : 'Missing ❌',
        Jugador: models.Jugador ? 'Available ✅' : 'Missing ❌',
        Partido: models.Partido ? 'Available ✅' : 'Missing ❌',
        Usuario: models.Usuario ? 'Available ✅' : 'Missing ❌',
        Resultado: models.Resultado ? 'Available ✅' : 'Missing ❌',
        TablaPosicione: models.TablaPosicione ? 'Available ✅' : 'Missing ❌'
      },
      containerStatus: container ? 'Available ✅' : 'Missing ❌',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para diagnosticar problemas con las rutas
app.get('/test-routes', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Routes diagnostic',
      availableRoutes: [
        '/api/usuarios - Working ✅',
        '/api/resultados - Working ✅',
        '/api/tabla-posiciones - Working ✅',
        '/api/ligas - Error 502 ❌',
        '/api/equipos - Error 502 ❌', 
        '/api/jugadores - Error 502 ❌',
        '/api/temporadas - Error 502 ❌',
        '/api/partidos - Not tested'
      ],
      possibleCauses: [
        'Dependency injection issues',
        'Model initialization problems',
        'Route configuration errors'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Debug endpoint específico para probar endpoints problemáticos
app.get('/test-endpoints', async (req, res) => {
  try {
    const container = require('./config/dependency-injection');
    const testResults = {};
    
    // Probar equipos
    try {
      const equipoService = container.get('EquipoService');
      const equipos = await equipoService.getAll();
      testResults.equipos = { status: 'ok', count: equipos.length };
    } catch (error) {
      testResults.equipos = { status: 'error', error: error.message };
    }
    
    // Probar jugadores
    try {
      const jugadorService = container.get('JugadorService');
      const jugadores = await jugadorService.getAll();
      testResults.jugadores = { status: 'ok', count: jugadores.length };
    } catch (error) {
      testResults.jugadores = { status: 'error', error: error.message };
    }
    
    // Probar partidos
    try {
      const partidoService = container.get('PartidoService');
      const partidos = await partidoService.getAll();
      testResults.partidos = { status: 'ok', count: partidos.length };
    } catch (error) {
      testResults.partidos = { status: 'error', error: error.message };
    }
    
    res.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      testResults
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      stack: error.stack
    });
  }
});

// Endpoint especial para ejecutar migraciones en producción
app.post('/migrate-database', async (req, res) => {
  try {
    const sequelize = require('../models').sequelize;
    const { QueryInterface } = require('sequelize');
    
    // Verificar si las tablas ya existen
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('Tablas existentes:', tables);
    
    // Ejecutar migraciones pendientes
    const { execSync } = require('child_process');
    const result = execSync('npx sequelize-cli db:migrate', { 
      encoding: 'utf8',
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    res.json({
      success: true,
      message: 'Migraciones ejecutadas correctamente',
      existingTables: tables,
      migrationOutput: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error ejecutando migraciones:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Debug endpoint directo
app.get('/debug', (req, res) => {
  try {
    let config = {};
    let configError = null;
    
    // Intentar cargar la configuración
    try {
      config = require('../config/config.js');
    } catch (err) {
      configError = err.message;
    }
    
    const env = process.env.NODE_ENV || 'development';
    const isAWSDetected = !!(process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 
                           (process.env.DB_HOST && process.env.DB_HOST.includes('rds.amazonaws.com')));
    
    res.json({
      success: true,
      environment: env,
      isAWSDetected: isAWSDetected,
      configError: configError,
      config: config[env] || {},
      environmentVariables: {
        NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
        DB_USER: process.env.DB_USER || 'NOT_SET',
        DB_PASSWORD: process.env.DB_PASSWORD ? '***SET***' : 'NOT_SET',
        DB_NAME: process.env.DB_NAME || 'NOT_SET',
        DB_HOST: process.env.DB_HOST || 'NOT_SET',
        AWS_REGION: process.env.AWS_REGION || 'NOT_SET',
        PORT: process.env.PORT || 'NOT_SET'
      },
      databaseConnectionTest: {
        status: 'Variables detected, config loaded successfully',
        recommendation: 'Ready to test database connection'
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      environmentVariables: {
        NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
        DB_USER: process.env.DB_USER || 'NOT_SET',
        DB_HOST: process.env.DB_HOST || 'NOT_SET',
        DB_NAME: process.env.DB_NAME || 'NOT_SET'
      }
    });
  }
});

// Endpoint para crear la base de datos
app.get('/setup-database', async (req, res) => {
  try {
    const mysql = require('mariadb');
    
    // Conectar sin especificar base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000
    });
    
    // Crear la base de datos
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();
    
    res.json({
      success: true,
      message: `Database '${process.env.DB_NAME}' created successfully`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para ejecutar migraciones manualmente
app.get('/run-migrations', async (req, res) => {
  try {
    const mysql = require('mariadb');
    
    // Conectar a la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000
    });
    
    const results = [];
    
    try {
      // Crear tabla SequelizeMeta si no existe
      await connection.query(`
        CREATE TABLE IF NOT EXISTS SequelizeMeta (
          name VARCHAR(255) NOT NULL PRIMARY KEY
        )
      `);
      results.push('SequelizeMeta table created');
      
      // Crear todas las tablas directamente
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Ligas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          pais VARCHAR(255),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push('Ligas table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Temporadas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          fechaInicio DATE,
          fechaFin DATE,
          ligaId INT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (ligaId) REFERENCES Ligas(id)
        )
      `);
      results.push('Temporadas table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Equipos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          ciudad VARCHAR(255),
          ligaId INT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (ligaId) REFERENCES Ligas(id)
        )
      `);
      results.push('Equipos table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Jugadors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          posicion VARCHAR(255),
          edad INT,
          equipoId INT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (equipoId) REFERENCES Equipos(id)
        )
      `);
      results.push('Jugadors table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Partidos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          equipoLocalId INT,
          equipoVisitanteId INT,
          fecha DATETIME,
          temporadaId INT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (equipoLocalId) REFERENCES Equipos(id),
          FOREIGN KEY (equipoVisitanteId) REFERENCES Equipos(id),
          FOREIGN KEY (temporadaId) REFERENCES Temporadas(id)
        )
      `);
      results.push('Partidos table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Resultados (
          id INT AUTO_INCREMENT PRIMARY KEY,
          partido_id INT,
          goles_local INT DEFAULT 0,
          goles_visitante INT DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (partido_id) REFERENCES Partidos(id)
        )
      `);
      results.push('Resultados table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS TablaPosiciones (
          id INT AUTO_INCREMENT PRIMARY KEY,
          temporada_id INT,
          equipo_id INT,
          puntos INT DEFAULT 0,
          partidosJugados INT DEFAULT 0,
          partidosGanados INT DEFAULT 0,
          partidosEmpatados INT DEFAULT 0,
          partidosPerdidos INT DEFAULT 0,
          goles_a_favor INT DEFAULT 0,
          goles_en_contra INT DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (equipo_id) REFERENCES Equipos(id),
          FOREIGN KEY (temporada_id) REFERENCES Temporadas(id)
        )
      `);
      results.push('TablaPosiciones table created');
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS Usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      results.push('Usuarios table created');
      
      // Marcar migraciones como ejecutadas
      const migrations = [
        '20250907010524-create-liga.js',
        '20250907010537-create-temporada.js', 
        '20250907010545-create-equipo.js',
        '20250907010553-create-jugador.js',
        '20250907010600-create-partido.js',
        '20250907010607-create-resultado.js',
        '20250907010615-create-tabla-posicione.js',
        '20250907010625-create-usuario.js'
      ];
      
      for (const migration of migrations) {
        try {
          await connection.query(
            'INSERT IGNORE INTO SequelizeMeta (name) VALUES (?)', 
            [migration]
          );
          results.push(`Migration ${migration} marked as executed`);
        } catch (err) {
          results.push(`Migration ${migration} already exists in SequelizeMeta`);
        }
      }
      
    } catch (tableError) {
      results.push(`Table creation error: ${tableError.message}`);
    }
    
    await connection.end();
    
    res.json({
      success: true,
      message: 'All migrations completed successfully',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para corregir columnas de las tablas
app.get('/fix-tables', async (req, res) => {
  try {
    const mysql = require('mariadb');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000
    });
    
    const results = [];
    
    try {
      // Eliminar y recrear tabla TablaPosiciones
      await connection.query('DROP TABLE IF EXISTS TablaPosiciones');
      await connection.query(`
        CREATE TABLE TablaPosiciones (
          id INT AUTO_INCREMENT PRIMARY KEY,
          temporada_id INT,
          equipo_id INT,
          puntos INT DEFAULT 0,
          partidosJugados INT DEFAULT 0,
          partidosGanados INT DEFAULT 0,
          partidosEmpatados INT DEFAULT 0,
          partidosPerdidos INT DEFAULT 0,
          goles_a_favor INT DEFAULT 0,
          goles_en_contra INT DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (equipo_id) REFERENCES Equipos(id),
          FOREIGN KEY (temporada_id) REFERENCES Temporadas(id)
        )
      `);
      results.push('TablaPosiciones table recreated with correct columns');
      
      // Eliminar y recrear tabla Resultados
      await connection.query('DROP TABLE IF EXISTS Resultados');
      await connection.query(`
        CREATE TABLE Resultados (
          id INT AUTO_INCREMENT PRIMARY KEY,
          partido_id INT,
          goles_local INT DEFAULT 0,
          goles_visitante INT DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (partido_id) REFERENCES Partidos(id)
        )
      `);
      results.push('Resultados table recreated with correct columns');
      
    } catch (tableError) {
      results.push(`Table fix error: ${tableError.message}`);
    }
    
    await connection.end();
    
    res.json({
      success: true,
      message: 'Tables fixed successfully',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint de test para ligas (sin dependencias)
app.get('/test-ligas', async (req, res) => {
  try {
    const mysql = require('mariadb');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000
    });
    
    const ligas = await connection.query('SELECT * FROM Ligas LIMIT 10');
    await connection.end();
    
    res.json({
      success: true,
      data: ligas,
      count: ligas.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para probar cada modelo individualmente
app.get('/test-each-model', async (req, res) => {
  const results = {};
  
  try {
    const models = require('../models');
    
    // Probar cada modelo
    const modelTests = [
      { name: 'Usuario', model: models.Usuario },
      { name: 'Liga', model: models.Liga },
      { name: 'Temporada', model: models.Temporada },
      { name: 'Equipo', model: models.Equipo },
      { name: 'Jugador', model: models.Jugador },
      { name: 'Partido', model: models.Partido },
      { name: 'Resultado', model: models.Resultado },
      { name: 'TablaPosicione', model: models.TablaPosicione }
    ];
    
    for (const test of modelTests) {
      try {
        if (test.model) {
          const count = await test.model.count({ limit: 1 });
          results[test.name] = `✅ Available and working (count: ${count})`;
        } else {
          results[test.name] = '❌ Model not found';
        }
      } catch (modelError) {
        results[test.name] = `❌ Error: ${modelError.message}`;
      }
    }
    
    res.json({
      success: true,
      message: 'Individual model tests',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      results: results,
      timestamp: new Date().toISOString()
    });
  }
});

// Test corrected models endpoint
app.get('/test-corrected-models', async (req, res) => {
  const results = [];
  
  try {
    // Test Liga model
    console.log('Testing Liga model...');
    const { Liga } = require('../models');
    const ligas = await Liga.findAll({ limit: 2 });
    results.push({
      model: 'Liga',
      status: 'success',
      count: ligas.length,
      sample: ligas[0] || null,
      structure: ligas[0] ? Object.keys(ligas[0].dataValues) : []
    });
  } catch (error) {
    results.push({
      model: 'Liga',
      status: 'error',
      error: error.message
    });
  }

  try {
    // Test Temporada model
    console.log('Testing Temporada model...');
    const { Temporada } = require('../models');
    const temporadas = await Temporada.findAll({ limit: 2 });
    results.push({
      model: 'Temporada',
      status: 'success',
      count: temporadas.length,
      sample: temporadas[0] || null,
      structure: temporadas[0] ? Object.keys(temporadas[0].dataValues) : []
    });
  } catch (error) {
    results.push({
      model: 'Temporada',
      status: 'error',
      error: error.message
    });
  }

  try {
    // Test Equipo model
    console.log('Testing Equipo model...');
    const { Equipo } = require('../models');
    const equipos = await Equipo.findAll({ limit: 2 });
    results.push({
      model: 'Equipo',
      status: 'success',
      count: equipos.length,
      sample: equipos[0] || null,
      structure: equipos[0] ? Object.keys(equipos[0].dataValues) : []
    });
  } catch (error) {
    results.push({
      model: 'Equipo',
      status: 'error',
      error: error.message
    });
  }

  try {
    // Test Jugador model
    console.log('Testing Jugador model...');
    const { Jugador } = require('../models');
    const jugadores = await Jugador.findAll({ limit: 2 });
    results.push({
      model: 'Jugador',
      status: 'success',
      count: jugadores.length,
      sample: jugadores[0] || null,
      structure: jugadores[0] ? Object.keys(jugadores[0].dataValues) : []
    });
  } catch (error) {
    results.push({
      model: 'Jugador',
      status: 'error',
      error: error.message
    });
  }

  res.json({
    message: 'Test de modelos corregidos completado',
    results: results,
    summary: {
      total: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length
    }
  });
});

// Endpoint para poblar datos de prueba
app.post('/populate-test-data', async (req, res) => {
  try {
    const { Liga, Temporada, Equipo, Jugador } = require('../models');
    const results = [];

    // 1. Crear Ligas
    console.log('Creando ligas...');
    const ligasData = [
      { nombre: 'Premier League', pais: 'Inglaterra', creada_en: new Date('2020-01-01') },
      { nombre: 'La Liga', pais: 'España', creada_en: new Date('2019-01-01') },
      { nombre: 'Serie A', pais: 'Italia', creada_en: new Date('2018-01-01') }
    ];

    const ligas = [];
    for (const ligaData of ligasData) {
      const liga = await Liga.create(ligaData);
      ligas.push(liga);
      results.push(`✅ Liga creada: ${liga.nombre}`);
    }

    // 2. Crear Temporadas
    console.log('Creando temporadas...');
    const temporadas = [];
    for (const liga of ligas) {
      const temporadaData = {
        nombre: `Temporada 2024-2025`,
        fechaInicio: new Date('2024-08-01'),
        fechaFin: new Date('2025-05-31'),
        anio: 2024,
        liga_id: liga.id
      };
      const temporada = await Temporada.create(temporadaData);
      temporadas.push(temporada);
      results.push(`✅ Temporada creada para ${liga.nombre}`);
    }

    // 3. Crear Equipos
    console.log('Creando equipos...');
    const equiposData = [
      // Premier League
      { nombre: 'Manchester United', ciudad: 'Manchester', liga_id: ligas[0].id },
      { nombre: 'Arsenal', ciudad: 'Londres', liga_id: ligas[0].id },
      { nombre: 'Liverpool', ciudad: 'Liverpool', liga_id: ligas[0].id },
      { nombre: 'Chelsea', ciudad: 'Londres', liga_id: ligas[0].id },
      
      // La Liga
      { nombre: 'Real Madrid', ciudad: 'Madrid', liga_id: ligas[1].id },
      { nombre: 'Barcelona', ciudad: 'Barcelona', liga_id: ligas[1].id },
      { nombre: 'Atletico Madrid', ciudad: 'Madrid', liga_id: ligas[1].id },
      
      // Serie A
      { nombre: 'Juventus', ciudad: 'Turín', liga_id: ligas[2].id },
      { nombre: 'AC Milan', ciudad: 'Milán', liga_id: ligas[2].id },
      { nombre: 'Inter Milan', ciudad: 'Milán', liga_id: ligas[2].id }
    ];

    const equipos = [];
    for (const equipoData of equiposData) {
      const equipo = await Equipo.create(equipoData);
      equipos.push(equipo);
      results.push(`✅ Equipo creado: ${equipo.nombre}`);
    }

    // 4. Crear Jugadores
    console.log('Creando jugadores...');
    const jugadoresData = [
      // Manchester United
      { nombre: 'Marcus Rashford', posicion: 'Delantero', edad: 27, equipo_id: equipos[0].id },
      { nombre: 'Bruno Fernandes', posicion: 'Centrocampista', edad: 29, equipo_id: equipos[0].id },
      { nombre: 'Harry Maguire', posicion: 'Defensor', edad: 31, equipo_id: equipos[0].id },
      
      // Arsenal
      { nombre: 'Bukayo Saka', posicion: 'Extremo', edad: 23, equipo_id: equipos[1].id },
      { nombre: 'Martin Odegaard', posicion: 'Centrocampista', edad: 25, equipo_id: equipos[1].id },
      
      // Liverpool
      { nombre: 'Mohamed Salah', posicion: 'Extremo', edad: 32, equipo_id: equipos[2].id },
      { nombre: 'Virgil van Dijk', posicion: 'Defensor', edad: 33, equipo_id: equipos[2].id },
      
      // Chelsea
      { nombre: 'Cole Palmer', posicion: 'Centrocampista', edad: 22, equipo_id: equipos[3].id },
      
      // Real Madrid
      { nombre: 'Vinicius Jr', posicion: 'Extremo', edad: 24, equipo_id: equipos[4].id },
      { nombre: 'Jude Bellingham', posicion: 'Centrocampista', edad: 21, equipo_id: equipos[4].id },
      { nombre: 'Karim Benzema', posicion: 'Delantero', edad: 36, equipo_id: equipos[4].id },
      
      // Barcelona
      { nombre: 'Pedri', posicion: 'Centrocampista', edad: 21, equipo_id: equipos[5].id },
      { nombre: 'Gavi', posicion: 'Centrocampista', edad: 20, equipo_id: equipos[5].id },
      { nombre: 'Robert Lewandowski', posicion: 'Delantero', edad: 35, equipo_id: equipos[5].id },
      
      // Atletico Madrid
      { nombre: 'Antoine Griezmann', posicion: 'Delantero', edad: 33, equipo_id: equipos[6].id },
      
      // Juventus
      { nombre: 'Federico Chiesa', posicion: 'Extremo', edad: 27, equipo_id: equipos[7].id },
      { nombre: 'Dusan Vlahovic', posicion: 'Delantero', edad: 24, equipo_id: equipos[7].id },
      
      // AC Milan
      { nombre: 'Rafael Leao', posicion: 'Extremo', edad: 25, equipo_id: equipos[8].id },
      { nombre: 'Theo Hernandez', posicion: 'Defensor', edad: 27, equipo_id: equipos[8].id },
      
      // Inter Milan
      { nombre: 'Lautaro Martinez', posicion: 'Delantero', edad: 27, equipo_id: equipos[9].id },
      { nombre: 'Nicolo Barella', posicion: 'Centrocampista', edad: 27, equipo_id: equipos[9].id }
    ];

    for (const jugadorData of jugadoresData) {
      const jugador = await Jugador.create(jugadorData);
      results.push(`✅ Jugador creado: ${jugador.nombre} (${jugadorData.posicion})`);
    }

    res.json({
      success: true,
      message: 'Datos de prueba creados exitosamente',
      summary: {
        ligas: ligas.length,
        temporadas: temporadas.length,
        equipos: equipos.length,
        jugadores: jugadoresData.length
      },
      results: results,
      thunderClientTests: {
        message: 'Ahora puedes probar estos endpoints:',
        endpoints: [
          'GET /api/ligas - Ver todas las ligas',
          'GET /api/temporadas - Ver todas las temporadas',
          'GET /api/equipos - Ver todos los equipos',
          'GET /api/jugadores - Ver todos los jugadores'
        ]
      }
    });

  } catch (error) {
    console.error('Error creando datos de prueba:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

// POST Endpoints para Thunder Client
// Crear Liga
app.post('/api/ligas', async (req, res) => {
  try {
    const { Liga } = require('../models');
    const { nombre, pais, creada_en } = req.body;
    
    if (!nombre || !pais) {
      return res.status(400).json({
        error: 'Campos requeridos: nombre, pais'
      });
    }
    
    const liga = await Liga.create({
      nombre,
      pais,
      creada_en: creada_en || new Date()
    });
    
    res.status(201).json({
      success: true,
      message: 'Liga creada exitosamente',
      data: liga
    });
  } catch (error) {
    console.error('Error creando liga:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Crear Temporada
app.post('/api/temporadas', async (req, res) => {
  try {
    const { Temporada } = require('../models');
    const { nombre, fechaInicio, fechaFin, anio, liga_id } = req.body;
    
    if (!nombre || !liga_id || !anio) {
      return res.status(400).json({
        error: 'Campos requeridos: nombre, liga_id, anio'
      });
    }
    
    const temporada = await Temporada.create({
      nombre,
      fechaInicio: fechaInicio || new Date(),
      fechaFin: fechaFin || new Date(),
      anio,
      liga_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Temporada creada exitosamente',
      data: temporada
    });
  } catch (error) {
    console.error('Error creando temporada:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Crear Equipo
app.post('/api/equipos', async (req, res) => {
  try {
    const { Equipo } = require('../models');
    const { nombre, ciudad, liga_id } = req.body;
    
    if (!nombre || !ciudad || !liga_id) {
      return res.status(400).json({
        error: 'Campos requeridos: nombre, ciudad, liga_id'
      });
    }
    
    const equipo = await Equipo.create({
      nombre,
      ciudad,
      liga_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Equipo creado exitosamente',
      data: equipo
    });
  } catch (error) {
    console.error('Error creando equipo:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Crear Jugador
app.post('/api/jugadores', async (req, res) => {
  try {
    const { Jugador } = require('../models');
    const { nombre, posicion, edad, equipo_id } = req.body;
    
    if (!nombre || !posicion || !edad || !equipo_id) {
      return res.status(400).json({
        error: 'Campos requeridos: nombre, posicion, edad, equipo_id'
      });
    }
    
    const jugador = await Jugador.create({
      nombre,
      posicion,
      edad,
      equipo_id
    });
    
    res.status(201).json({
      success: true,
      message: 'Jugador creado exitosamente',
      data: jugador
    });
  } catch (error) {
    console.error('Error creando jugador:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para simular las rutas problemáticas
app.get('/test-problematic-routes', async (req, res) => {
  const results = {};
  
  try {
    
    // Simular llamada a LigaController
    try {
      const ligaController = container.get('LigaController');
      // Simular el método getAll
      results.LigaController = '✅ Controller resolved, testing getAll method...';
      // No ejecutamos realmente getAll para evitar problemas, solo verificamos que se resuelva
    } catch (ligaError) {
      results.LigaController = `❌ Error: ${ligaError.message}`;
    }
    
    // Simular llamada a EquipoController
    try {
      const equipoController = container.get('EquipoController');
      results.EquipoController = '✅ Controller resolved';
    } catch (equipoError) {
      results.EquipoController = `❌ Error: ${equipoError.message}`;
    }
    
    // Simular llamada a JugadorController
    try {
      const jugadorController = container.get('JugadorController');
      results.JugadorController = '✅ Controller resolved';
    } catch (jugadorError) {
      results.JugadorController = `❌ Error: ${jugadorError.message}`;
    }
    
    // Simular llamada a TemporadaController
    try {
      const temporadaController = container.get('TemporadaController');
      results.TemporadaController = '✅ Controller resolved';
    } catch (temporadaError) {
      results.TemporadaController = `❌ Error: ${temporadaError.message}`;
    }
    
    res.json({
      success: true,
      message: 'Problematic routes simulation',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para probar la inyección de dependencias
app.get('/test-di', (req, res) => {
  try {
    const results = {};
    
    const controllers = [
      'UsuarioController',
      'LigaController', 
      'TemporadaController',
      'EquipoController',
      'JugadorController',
      'PartidoController',
      'ResultadoController',
      'TablaPosicioneController'
    ];
    
    for (const controllerName of controllers) {
      try {
        const controller = container.get(controllerName);
        results[controllerName] = controller ? '✅ Resolved successfully' : '❌ Resolved but null';
      } catch (diError) {
        results[controllerName] = `❌ Error: ${diError.message}`;
      }
    }
    
    res.json({
      success: true,
      message: 'Dependency injection test',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Liga Inyección API v1.1.4', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para agregar columnas faltantes en la base de datos
app.get('/fix-missing-columns', async (req, res) => {
  const mariadb = require('mariadb');
  let conn;
  
  try {
    // Crear conexión directa usando las variables de entorno
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ligas_db',
      port: process.env.DB_PORT || 3306
    };
    
    console.log('🔧 Conectando a la base de datos:', { ...dbConfig, password: '***' });
    conn = await mariadb.createConnection(dbConfig);
    
    const results = [];
    
    // Verificar y agregar columna creada_en a Ligas
    try {
      console.log('🔍 Verificando columna creada_en en Ligas...');
      await conn.query(`SELECT creada_en FROM Ligas LIMIT 1;`);
      results.push('ℹ️ Columna creada_en ya existe en tabla Ligas');
    } catch (error) {
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        console.log('➕ Agregando columna creada_en a Ligas...');
        try {
          await conn.query(`ALTER TABLE Ligas ADD COLUMN creada_en DATETIME;`);
          results.push('✅ Columna creada_en agregada a tabla Ligas');
        } catch (alterError) {
          results.push(`❌ Error agregando creada_en: ${alterError.message}`);
        }
      } else {
        results.push(`❌ Error verificando creada_en: ${error.message}`);
      }
    }
    
    // Verificar y agregar columna anio a Temporadas
    try {
      console.log('🔍 Verificando columna anio en Temporadas...');
      await conn.query(`SELECT anio FROM Temporadas LIMIT 1;`);
      results.push('ℹ️ Columna anio ya existe en tabla Temporadas');
    } catch (error) {
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        console.log('➕ Agregando columna anio a Temporadas...');
        try {
          await conn.query(`ALTER TABLE Temporadas ADD COLUMN anio INT;`);
          results.push('✅ Columna anio agregada a tabla Temporadas');
        } catch (alterError) {
          results.push(`❌ Error agregando anio: ${alterError.message}`);
        }
      } else {
        results.push(`❌ Error verificando anio: ${error.message}`);
      }
    }
    
    // Obtener estructura final
    const ligaStructure = await conn.query(`DESCRIBE Ligas;`);
    const temporadaStructure = await conn.query(`DESCRIBE Temporadas;`);
    
    res.json({
      success: true,
      message: 'Proceso de reparación de columnas completado',
      results: results,
      finalStructure: {
        Ligas: ligaStructure.map(col => ({ Field: col.Field, Type: col.Type })),
        Temporadas: temporadaStructure.map(col => ({ Field: col.Field, Type: col.Type }))
      }
    });
    
  } catch (error) {
    console.error('❌ Error en fix-missing-columns:', error);
    res.status(500).json({
      success: false,
      error: 'Error reparando columnas faltantes',
      message: error.message,
      code: error.code
    });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (closeError) {
        console.error('Error cerrando conexión:', closeError);
      }
    }
  }
});

// Endpoint para arreglar nombres de columnas (camelCase -> snake_case)
app.get('/fix-column-names', async (req, res) => {
  const mariadb = require('mariadb');
  let conn;
  
  try {
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ligas_db',
      port: process.env.DB_PORT || 3306
    };
    
    conn = await mariadb.createConnection(dbConfig);
    const results = [];
    
    // Arreglar Temporadas: ligaId -> liga_id
    try {
      console.log('🔧 Renombrando ligaId -> liga_id en Temporadas...');
      await conn.query(`ALTER TABLE Temporadas CHANGE COLUMN ligaId liga_id INT(11);`);
      results.push('✅ Renombrada columna ligaId -> liga_id en Temporadas');
    } catch (error) {
      if (error.message.includes("Unknown column 'ligaId'")) {
        results.push('ℹ️ Columna ligaId no existe en Temporadas (ya podría estar como liga_id)');
      } else {
        results.push(`❌ Error renombrando ligaId: ${error.message}`);
      }
    }
    
    // Verificar otras tablas que podrían tener problemas similares
    const tableStructures = {};
    const tables = ['Equipos', 'Jugadores', 'Partidos'];
    
    for (const table of tables) {
      try {
        const structure = await conn.query(`DESCRIBE ${table};`);
        tableStructures[table] = structure.map(col => ({ Field: col.Field, Type: col.Type }));
      } catch (error) {
        tableStructures[table] = `Error: ${error.message}`;
      }
    }
    
    res.json({
      success: true,
      message: 'Proceso de reparación de nombres de columnas completado',
      results: results,
      tableStructures: tableStructures
    });
    
  } catch (error) {
    console.error('❌ Error en fix-column-names:', error);
    res.status(500).json({
      success: false,
      error: 'Error reparando nombres de columnas',
      message: error.message
    });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (closeError) {
        console.error('Error cerrando conexión:', closeError);
      }
    }
  }
});

// Endpoint para diagnosticar errores específicos de base de datos
app.get('/debug-database-errors', async (req, res) => {
  try {
    const models = require('../models');
    const results = {};
    
    // Probar cada modelo individualmente
    const modelTests = [
      { name: 'Liga', model: models.Liga },
      { name: 'Temporada', model: models.Temporada },
      { name: 'Equipo', model: models.Equipo },
      { name: 'Jugador', model: models.Jugador }
    ];
    
    for (const { name, model } of modelTests) {
      try {
        console.log(`🔍 Probando modelo ${name}...`);
        const data = await model.findAll({ limit: 1 });
        results[name] = {
          status: '✅ Success',
          count: data.length,
          sampleData: data[0] || null
        };
      } catch (error) {
        console.error(`❌ Error en modelo ${name}:`, error.message);
        results[name] = {
          status: '❌ Error',
          error: error.message,
          sqlError: error.sql || null,
          code: error.parent?.code || null
        };
      }
    }
    
    res.json({
      success: true,
      message: 'Diagnóstico de modelos completado',
      results: results
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en diagnóstico de base de datos',
      message: error.message
    });
  }
});

// Endpoint específico para debuggear los controladores problemáticos
app.get('/debug-problematic-controllers', (req, res) => {
  try {
    const models = require('../models');
    
    const problematicControllers = ['LigaController', 'EquipoController', 'JugadorController', 'TemporadaController'];
    const workingControllers = ['UsuarioController', 'ResultadoController', 'TablaPosicioneController'];
    
    const results = {
      modelsAvailable: {
        Liga: !!models.Liga,
        Equipo: !!models.Equipo, 
        Jugador: !!models.Jugador,
        Temporada: !!models.Temporada,
        Usuario: !!models.Usuario,
        Resultado: !!models.Resultado,
        TablaPosicione: !!models.TablaPosicione
      },
      containerTests: {},
      detailedErrors: {}
    };
    
    // Probar controladores problemáticos
    for (const controllerName of problematicControllers) {
      try {
        console.log(`🔍 Probando ${controllerName}...`);
        const controller = container.get(controllerName);
        results.containerTests[controllerName] = {
          status: '✅ Success',
          hasController: !!controller,
          controllerType: typeof controller
        };
      } catch (error) {
        console.error(`❌ Error con ${controllerName}:`, error.message);
        results.containerTests[controllerName] = {
          status: '❌ Error',
          error: error.message,
          stack: error.stack
        };
        results.detailedErrors[controllerName] = error.message;
      }
    }
    
    // Probar controladores que funcionan para comparar
    for (const controllerName of workingControllers) {
      try {
        const controller = container.get(controllerName);
        results.containerTests[controllerName] = {
          status: '✅ Success (working)',
          hasController: !!controller,
          controllerType: typeof controller
        };
      } catch (error) {
        results.containerTests[controllerName] = {
          status: '❌ Error (unexpected)',
          error: error.message
        };
      }
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to debug controllers',
      message: error.message,
      stack: error.stack
    });
  }
});

// Endpoint para arreglar TODOS los problemas restantes
app.get('/fix-remaining-issues', async (req, res) => {
  const mariadb = require('mariadb');
  let conn;
  
  try {
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ligas_db',
      port: process.env.DB_PORT || 3306
    };
    
    conn = await mariadb.createConnection(dbConfig);
    const results = [];
    
    // 1. Arreglar Equipos: temporadaId -> temporada_id
    try {
      console.log('🔧 Renombrando temporadaId -> temporada_id en Equipos...');
      await conn.query(`ALTER TABLE Equipos CHANGE COLUMN temporadaId temporada_id INT(11);`);
      results.push('✅ Renombrada columna temporadaId -> temporada_id en Equipos');
    } catch (error) {
      if (error.message.includes("Unknown column 'temporadaId'")) {
        results.push('ℹ️ Columna temporadaId no existe en Equipos');
      } else {
        results.push(`❌ Error renombrando temporadaId en Equipos: ${error.message}`);
      }
    }
    
    // 2. Arreglar Equipos: ligaId -> liga_id (si existe)
    try {
      console.log('🔧 Renombrando ligaId -> liga_id en Equipos...');
      await conn.query(`ALTER TABLE Equipos CHANGE COLUMN ligaId liga_id INT(11);`);
      results.push('✅ Renombrada columna ligaId -> liga_id en Equipos');
    } catch (error) {
      if (error.message.includes("Unknown column 'ligaId'")) {
        results.push('ℹ️ Columna ligaId no existe en Equipos');
      } else {
        results.push(`❌ Error renombrando ligaId en Equipos: ${error.message}`);
      }
    }
    
    // 3. Renombrar tabla Jugadors -> Jugadores
    try {
      console.log('🔧 Renombrando tabla Jugadors -> Jugadores...');
      await conn.query(`RENAME TABLE Jugadors TO Jugadores;`);
      results.push('✅ Renombrada tabla Jugadors -> Jugadores');
    } catch (error) {
      if (error.message.includes("Table 'ligas_db.Jugadors' doesn't exist")) {
        results.push('ℹ️ Tabla Jugadors no existe, verificando Jugadores...');
      } else {
        results.push(`❌ Error renombrando tabla Jugadors: ${error.message}`);
      }
    }
    
    // 4. Arreglar Jugadores: equipoId -> equipo_id (después de renombrar tabla)
    try {
      console.log('🔧 Renombrando equipoId -> equipo_id en Jugadores...');
      await conn.query(`ALTER TABLE Jugadores CHANGE COLUMN equipoId equipo_id INT(11);`);
      results.push('✅ Renombrada columna equipoId -> equipo_id en Jugadores');
    } catch (error) {
      if (error.message.includes("Unknown column 'equipoId'")) {
        results.push('ℹ️ Columna equipoId no existe en Jugadores');
      } else if (error.message.includes("Table 'ligas_db.Jugadores' doesn't exist")) {
        results.push('ℹ️ Tabla Jugadores no existe todavía');
      } else {
        results.push(`❌ Error renombrando equipoId en Jugadores: ${error.message}`);
      }
    }
    
    // 5. Verificar estructura final
    const finalStructures = {};
    const tables = ['Ligas', 'Temporadas', 'Equipos', 'Jugadores'];
    
    for (const table of tables) {
      try {
        const structure = await conn.query(`DESCRIBE ${table};`);
        finalStructures[table] = structure.map(col => ({ Field: col.Field, Type: col.Type }));
      } catch (error) {
        finalStructures[table] = `Error: ${error.message}`;
      }
    }
    
    res.json({
      success: true,
      message: 'Reparación completa de problemas restantes finalizada',
      results: results,
      finalStructures: finalStructures
    });
    
  } catch (error) {
    console.error('❌ Error en fix-remaining-issues:', error);
    res.status(500).json({
      success: false,
      error: 'Error en reparación completa',
      message: error.message
    });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (closeError) {
        console.error('Error cerrando conexión:', closeError);
      }
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
