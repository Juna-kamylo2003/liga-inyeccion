const TemporadaService = require('../src/services/temporada.service');

describe('TemporadaService', () => {
  let service, repo;
  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new TemporadaService(repo);
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
    await service.create({ anio: 2024 });
    expect(repo.create).toHaveBeenCalledWith({ anio: 2024 });
  });
});
