// Detectar automáticamente la URL del servidor
const getServerUrl = () => {
  // En producción (AWS)
  if (process.env.NODE_ENV === 'production' || process.env.DB_HOST?.includes('amazonaws.com')) {
    return 'http://liga-inyeccion-env.eba-p3jydbcq.us-east-1.elasticbeanstalk.com/api';
  }
  // En desarrollo local
  return 'http://localhost:3000/api';
};

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Ligas API',
    version: '1.0.0',
    description: 'API para gestión de ligas, equipos, jugadores, partidos y resultados.'
  },
  servers: [
    {
      url: getServerUrl(),
      description: process.env.NODE_ENV === 'production' ? 'Servidor de producción (AWS)' : 'Servidor local'
    }
  ]
};
