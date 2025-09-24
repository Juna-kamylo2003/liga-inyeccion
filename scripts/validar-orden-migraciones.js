console.log('🔍 VALIDACIÓN DE ORDEN DE MIGRACIONES');
console.log('====================================\n');

const migrations = [
  { name: '20250907010524-create-liga.js', table: 'Ligas', dependencies: [] },
  { name: '20250907010537-create-temporada.js', table: 'Temporadas', dependencies: ['Ligas'] },
  { name: '20250907010545-create-equipo.js', table: 'Equipos', dependencies: ['Temporadas'] },
  { name: '20250907010553-create-jugador.js', table: 'Jugadors', dependencies: ['Equipos'] },
  { name: '20250907010600-create-partido.js', table: 'Partidos', dependencies: ['Equipos', 'Temporadas'] },
  { name: '20250907010607-create-resultado.js', table: 'Resultados', dependencies: ['Partidos'] },
  { name: '20250907010615-create-tabla-posicione.js', table: 'TablaPosiciones', dependencies: ['Temporadas', 'Equipos'] },
  { name: '20250907010625-create-usuario.js', table: 'Usuarios', dependencies: [] }
];

console.log('Orden de ejecución de migraciones:');
migrations.forEach((migration, index) => {
  console.log(`${index + 1}. ${migration.table}`);
  if (migration.dependencies.length > 0) {
    console.log(`   Depende de: ${migration.dependencies.join(', ')}`);
  } else {
    console.log(`   Sin dependencias`);
  }
});

console.log('\n✅ VALIDACIÓN DEL ORDEN');
console.log('----------------------');

let createdTables = [];
let isValid = true;

migrations.forEach((migration, index) => {
  const missingDeps = migration.dependencies.filter(dep => !createdTables.includes(dep));
  
  if (missingDeps.length > 0) {
    console.log(`❌ ${migration.table} - Faltan dependencias: ${missingDeps.join(', ')}`);
    isValid = false;
  } else {
    console.log(`✅ ${migration.table} - Orden correcto`);
  }
  
  createdTables.push(migration.table);
});

console.log(`\n${isValid ? '✅' : '❌'} RESULTADO: ${isValid ? 'ORDEN CORRECTO' : 'ORDEN INCORRECTO'}`);

if (isValid) {
  console.log('\n🚀 LAS MIGRACIONES SE EJECUTARÁN EN ORDEN CORRECTO');
} else {
  console.log('\n⚠️  NECESITA CORRECCIÓN DE ORDEN DE MIGRACIONES');
}