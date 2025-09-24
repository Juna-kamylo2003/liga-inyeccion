const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Configuración directa para desarrollo y testing
const environment = process.env.NODE_ENV || 'development';

console.log(`🔄 EJECUTANDO MIGRACIONES EN: ${environment.toUpperCase()}`);
console.log('===========================================');

const dbConfigs = {
  development: {
    username: "root",
    password: "",
    database: "ligas_db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mariadb",
    logging: console.log
  },
  test: {
    username: "root",
    password: "",
    database: "ligas_db_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mariadb", 
    logging: console.log
  }
};

console.log('📋 Environment variable:', `"${environment}"`);
console.log('📋 Environment length:', environment.length);
console.log('📋 Available configs:', Object.keys(dbConfigs));

const dbConfig = dbConfigs[environment.trim()];

if (!dbConfig) {
  console.error(`❌ No se encontró configuración para ambiente: "${environment}"`);
  console.log('📋 Intentando con "development" directamente...');
  const dbConfig = dbConfigs['development'];
  if (dbConfig) {
    console.log('✅ Usando configuración de development directamente');
  } else {
    process.exit(1);
  }
}

console.log(`📋 Conectando a: ${dbConfig.database} en ${dbConfig.host}:${dbConfig.port}`);

async function runMigrations() {
  try {
    // Crear conexión a la base de datos
    const sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: console.log
      }
    );

    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    // Crear tabla de migraciones si no existe
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS SequelizeMeta (
        name VARCHAR(255) NOT NULL PRIMARY KEY
      )
    `);

    // Obtener migraciones ya ejecutadas
    const executedMigrations = await sequelize.query(
      'SELECT name FROM SequelizeMeta ORDER BY name',
      { type: sequelize.QueryTypes.SELECT }
    );
    
    const executedNames = (executedMigrations || []).map(m => m.name);
    console.log(`📋 Migraciones ya ejecutadas: ${executedNames.length}`);
    
    // Obtener todas las migraciones disponibles
    const migrationsPath = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsPath)
      .filter(file => file.endsWith('.js'))
      .sort();

    console.log(`📁 Migraciones disponibles: ${migrationFiles.length}`);

    // Ejecutar migraciones pendientes
    let migrationsRun = 0;
    for (const file of migrationFiles) {
      if (!executedNames.includes(file)) {
        console.log(`\n🔄 Ejecutando migración: ${file}`);
        
        // Cargar y ejecutar migración
        const migration = require(path.join(migrationsPath, file));
        await migration.up(sequelize.getQueryInterface(), Sequelize);
        
        // Marcar como ejecutada
        await sequelize.query(
          'INSERT INTO SequelizeMeta (name) VALUES (?)',
          { replacements: [file] }
        );
        
        console.log(`✅ Migración completada: ${file}`);
        migrationsRun++;
      } else {
        console.log(`⏭️  Saltando migración ya ejecutada: ${file}`);
      }
    }

    await sequelize.close();

    if (migrationsRun === 0) {
      console.log('\n✅ TODAS LAS MIGRACIONES YA ESTÁN EJECUTADAS');
    } else {
      console.log(`\n🎉 MIGRACIONES COMPLETADAS: ${migrationsRun} nuevas migraciones ejecutadas`);
    }

    console.log(`\n📊 RESUMEN FINAL:`);
    console.log(`- Base de datos: ${dbConfig.database}`);
    console.log(`- Host: ${dbConfig.host}`);
    console.log(`- Migraciones totales: ${migrationFiles.length}`);
    console.log(`- Migraciones ejecutadas hoy: ${migrationsRun}`);

  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    process.exit(1);
  }
}

runMigrations();