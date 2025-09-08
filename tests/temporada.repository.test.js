const TemporadaRepository = require('../src/repositories/temporada.repository');
const { Temporada } = require('../models');

jest.mock('../models', () => ({
  Temporada: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  }
}));

describe('TemporadaRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new TemporadaRepository(Temporada);
  });

  it('findAll llama a Temporada.findAll', async () => {
    await repo.findAll();
    expect(Temporada.findAll).toHaveBeenCalled();
  });

  it('findById llama a Temporada.findByPk', async () => {
    await repo.findById(1);
    expect(Temporada.findByPk).toHaveBeenCalledWith(1);
  });

  it('create llama a Temporada.create', async () => {
    await repo.create({ anio: 2024 });
    expect(Temporada.create).toHaveBeenCalledWith({ anio: 2024 });
  });
});
