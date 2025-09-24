/**
 * SCRIPT PARA SINCRONIZAR TODAS LAS BASES DE DATOS
 * Ejecuta migraciones en desarrollo, testing y producción
 */

const { execSync } = require('child_process');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, env = 'development') {
  try {
    log(`\n🔄 Ejecutando: ${command}`, colors.blue);
    const result = execSync(command, { 
      encoding: 'utf8',
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: env }
    });
    log(`✅ Éxito en ${env}:`, colors.green);
    console.log(result);
    return true;
  } catch (error) {
    log(`❌ Error en ${env}:`, colors.red);
    console.log(error.message);
    return false;
  }
}

async function sincronizarBases() {
  log('🚀 INICIANDO SINCRONIZACIÓN DE BASES DE DATOS', colors.bright);
  
  // 1. DESARROLLO
  log('\n📋 PASO 1: MIGRACIONES EN DESARROLLO', colors.yellow);
  if (!execCommand('npx sequelize-cli db:migrate', 'development')) {
    log('❌ Error en desarrollo. Abortando...', colors.red);
    return;
  }
  
  // 2. TESTING
  log('\n📋 PASO 2: MIGRACIONES EN TESTING', colors.yellow);
  if (!execCommand('npx sequelize-cli db:migrate', 'test')) {
    log('❌ Error en testing. Abortando...', colors.red);
    return;
  }
  
  // 3. PRODUCCIÓN
  log('\n📋 PASO 3: MIGRACIONES EN PRODUCCIÓN', colors.yellow);
  log('⚠️  Para producción, se ejecutará mediante endpoint HTTP', colors.yellow);
  
  // 4. VERIFICAR TESTS
  log('\n📋 PASO 4: EJECUTAR TESTS', colors.yellow);
  if (!execCommand('npm test', 'test')) {
    log('❌ Algunos tests fallaron. Revisar...', colors.red);
  } else {
    log('✅ Todos los tests pasaron correctamente', colors.green);
  }
  
  log('\n🎉 SINCRONIZACIÓN COMPLETADA', colors.bright);
  log('✅ Desarrollo: Migrado', colors.green);
  log('✅ Testing: Migrado', colors.green);
  log('⏳ Producción: Pendiente (ejecutar endpoint)', colors.yellow);
}

// Ejecutar
sincronizarBases().catch(error => {
  log(`❌ Error general: ${error.message}`, colors.red);
  process.exit(1);
});