const ResultadoController = require('../src/controllers/resultado.controller');
const ResultadoService = require('../src/services/resultado.service');
const ResultadoRepository = require('../src/repositories/resultado.repository');
const { Resultado } = require('../models');

const httpMocks = require('node-mocks-http');

describe('ResultadoController', () => {
  const repo = new ResultadoRepository(Resultado);
  const service = new ResultadoService(repo);
  const controller = new ResultadoController(service);

  it('should return all resultados', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    await controller.getAll(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
