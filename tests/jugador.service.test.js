const JugadorService = require('../src/services/jugador.service');

describe('JugadorService', () => {
  let service, repo;
  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new JugadorService(repo);
  });

  it('getAll llama a repo.findAll', async () => {
    await service.getAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('getById llama a repo.findById', async () => {
    await service.getById(1);
    expect(repo.findById).toHaveBeenCalledWith(1);
  });

  it('create llama a repo.create', async () => {
    await service.create({ nombre: 'Test' });
    expect(repo.create).toHaveBeenCalledWith({ nombre: 'Test' });
  });
});
