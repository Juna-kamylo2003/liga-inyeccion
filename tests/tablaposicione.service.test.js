const TablaPosicioneService = require('../src/services/tablaposicione.service');
const TablaPosicioneRepository = require('../src/repositories/tablaposicione.repository');
const { TablaPosicione } = require('../models');

jest.mock('../models', () => ({
  TablaPosicione: {
    findAll: jest.fn(() => []),
    findByPk: jest.fn(() => ({ update: jest.fn(), destroy: jest.fn() })),
    create: jest.fn((data) => ({ id: 1, ...data })),
  }
}));

describe('TablaPosicioneService', () => {
  let repo;
  let service;
  beforeEach(() => {
    repo = new TablaPosicioneRepository(TablaPosicione);
    service = new TablaPosicioneService(repo);
  });

  it('should create a tablaPosicione', async () => {
    const data = { temporada_id: 1, equipo_id: 1, puntos: 3, goles_a_favor: 2, goles_en_contra: 1 };
    const tabla = await service.createTablaPosicione(data);
    expect(tabla).toHaveProperty('id');
  });

  it('should get all tablaPosiciones', async () => {
    const tablas = await service.getAllTablaPosiciones();
    expect(Array.isArray(tablas)).toBe(true);
  });
});