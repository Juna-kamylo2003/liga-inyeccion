module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Ligas API',
    version: '1.0.0',
    description: 'API para gestión de ligas, equipos, jugadores, partidos y resultados.'
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local'
    }
  ]
};
