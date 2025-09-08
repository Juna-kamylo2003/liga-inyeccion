const UsuarioController = require('../src/controllers/usuario.controller');
const UsuarioService = require('../src/services/usuario.service');
const UsuarioRepository = require('../src/repositories/usuario.repository');
const { Usuario } = require('../models');

const httpMocks = require('node-mocks-http');

describe('UsuarioController', () => {
  const repo = new UsuarioRepository(Usuario);
  const service = new UsuarioService(repo);
  const controller = new UsuarioController(service);

  it('should return all users', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    await controller.getAll(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
