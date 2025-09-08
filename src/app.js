// ...existing code...

const express = require('express');
const { configureDependencies } = require('./config/dependency-injection');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();
app.use(express.json());

configureDependencies();

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
