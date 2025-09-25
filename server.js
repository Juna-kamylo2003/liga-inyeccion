console.log('Starting Liga Inyección API...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

try {
  require('./src/app');
  console.log('Application started successfully');
} catch (error) {
  console.error('Failed to start application:', error);
  process.exit(1);
}