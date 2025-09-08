const TablaPosicioneRepository = require('../src/repositories/tablaposicione.repository');
const { TablaPosicione } = require('../models');

jest.mock('../models', () => ({
  TablaPosicione: {
    findAll: jest.fn(() => []),
    findByPk: jest.fn(() => ({ update: jest.fn(), destroy: jest.fn() })),
    create: jest.fn((data) => ({ id: 1, ...data })),
  }
}));

describe('TablaPosicioneRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new TablaPosicioneRepository(TablaPosicione);
  });

  it('should create a tablaPosicione', async () => {
    const data = { temporada_id: 1, equipo_id: 1, puntos: 3, goles_a_favor: 2, goles_en_contra: 1 };
    const tabla = await repo.create(data);
    expect(tabla).toHaveProperty('id');
  });

  it('should find all tablaPosiciones', async () => {
    const tablas = await repo.findAll();
    expect(Array.isArray(tablas)).toBe(true);
  });
});