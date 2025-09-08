const JugadorRepository = require('../src/repositories/jugador.repository');
const { Jugador } = require('../models');

jest.mock('../models', () => ({
  Jugador: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  }
}));

describe('JugadorRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new JugadorRepository(Jugador);
  });

  it('findAll llama a Jugador.findAll', async () => {
    await repo.findAll();
    expect(Jugador.findAll).toHaveBeenCalled();
  });

  it('findById llama a Jugador.findByPk', async () => {
    await repo.findById(1);
    expect(Jugador.findByPk).toHaveBeenCalledWith(1);
  });

  it('create llama a Jugador.create', async () => {
    await repo.create({ nombre: 'Test' });
    expect(Jugador.create).toHaveBeenCalledWith({ nombre: 'Test' });
  });
});
