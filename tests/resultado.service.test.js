const ResultadoService = require('../src/services/resultado.service');
const ResultadoRepository = require('../src/repositories/resultado.repository');
const { Resultado } = require('../models');

jest.mock('../models', () => ({
  Resultado: {
    findAll: jest.fn(() => []),
    findByPk: jest.fn(() => ({ update: jest.fn(), destroy: jest.fn() })),
    create: jest.fn((data) => ({ id: 1, ...data })),
  }
}));

describe('ResultadoService', () => {
  let repo;
  let service;
  beforeEach(() => {
    repo = new ResultadoRepository(Resultado);
    service = new ResultadoService(repo);
  });

  it('should create a resultado', async () => {
    const data = { partido_id: 1, goles_local: 2, goles_visitante: 1 };
    const resultado = await service.createResultado(data);
    expect(resultado).toHaveProperty('id');
  });

  it('should get all resultados', async () => {
    const resultados = await service.getAllResultados();
    expect(Array.isArray(resultados)).toBe(true);
  });
});