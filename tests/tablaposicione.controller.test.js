const TablaPosicioneController = require('../src/controllers/tablaposicione.controller');
const TablaPosicioneService = require('../src/services/tablaposicione.service');
const TablaPosicioneRepository = require('../src/repositories/tablaposicione.repository');
const { TablaPosicione } = require('../models');

const httpMocks = require('node-mocks-http');

describe('TablaPosicioneController', () => {
  const repo = new TablaPosicioneRepository(TablaPosicione);
  const service = new TablaPosicioneService(repo);
  const controller = new TablaPosicioneController(service);

  it('should return all tablaPosiciones', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    await controller.getAll(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
