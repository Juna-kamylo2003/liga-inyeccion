const swaggerDef = require('./swaggerDef.js');
module.exports = {
  definition: { ...swaggerDef },
  apis: ['./swagger/*.swagger.js']
};
