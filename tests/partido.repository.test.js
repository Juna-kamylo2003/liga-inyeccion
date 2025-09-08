const PartidoRepository = require('../src/repositories/partido.repository');
const { Partido } = require('../models');

jest.mock('../models', () => ({
  Partido: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  }
}));

describe('PartidoRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new PartidoRepository(Partido);
  });

  it('findAll llama a Partido.findAll', async () => {
    await repo.findAll();
    expect(Partido.findAll).toHaveBeenCalled();
  });

  it('findById llama a Partido.findByPk', async () => {
    await repo.findById(1);
    expect(Partido.findByPk).toHaveBeenCalledWith(1);
  });

  it('create llama a Partido.create', async () => {
    await repo.create({ fecha: '2024-08-15' });
    expect(Partido.create).toHaveBeenCalledWith({ fecha: '2024-08-15' });
  });
});
