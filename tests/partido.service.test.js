const PartidoService = require('../src/services/partido.service');

describe('PartidoService', () => {
  let service, repo;
  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new PartidoService(repo);
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
    await service.create({ fecha: '2024-08-15' });
    expect(repo.create).toHaveBeenCalledWith({ fecha: '2024-08-15' });
  });
});
