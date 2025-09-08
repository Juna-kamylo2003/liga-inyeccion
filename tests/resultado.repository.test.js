const ResultadoRepository = require('../src/repositories/resultado.repository');
const { Resultado } = require('../models');

jest.mock('../models', () => ({
  Resultado: {
    findAll: jest.fn(() => []),
    findByPk: jest.fn(() => ({ update: jest.fn(), destroy: jest.fn() })),
    create: jest.fn((data) => ({ id: 1, ...data })),
  }
}));

describe('ResultadoRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new ResultadoRepository(Resultado);
  });

  it('should create a resultado', async () => {
    const data = { partido_id: 1, goles_local: 2, goles_visitante: 1 };
    const resultado = await repo.create(data);
    expect(resultado).toHaveProperty('id');
  });

  it('should find all resultados', async () => {
    const resultados = await repo.findAll();
    expect(Array.isArray(resultados)).toBe(true);
  });
});