console.log('Starting Liga Inyección API...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

try {
  // Usar aplicación simple para debug
  console.log('🔧 Loading simple app for debugging...');
  require('./src/simple-app');
  console.log('✅ Simple application started successfully');
} catch (error) {
  console.error('❌ Failed to start simple application:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
}