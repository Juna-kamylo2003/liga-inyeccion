const EquipoRepository = require('../src/repositories/equipo.repository');
const { Equipo } = require('../models');

jest.mock('../models', () => ({
  Equipo: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  }
}));

describe('EquipoRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new EquipoRepository(Equipo);
  });

  it('findAll llama a Equipo.findAll', async () => {
    await repo.findAll();
    expect(Equipo.findAll).toHaveBeenCalled();
  });

  it('findById llama a Equipo.findByPk', async () => {
    await repo.findById(1);
    expect(Equipo.findByPk).toHaveBeenCalledWith(1);
  });

  it('create llama a Equipo.create', async () => {
    await repo.create({ nombre: 'Test' });
    expect(Equipo.create).toHaveBeenCalledWith({ nombre: 'Test' });
  });
});
