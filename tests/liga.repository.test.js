const LigaRepository = require('../src/repositories/liga.repository');
const { Liga } = require('../models');

jest.mock('../models', () => ({
  Liga: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  }
}));

describe('LigaRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new LigaRepository(Liga);
  });

  it('findAll llama a Liga.findAll', async () => {
    await repo.findAll();
    expect(Liga.findAll).toHaveBeenCalled();
  });

  it('findById llama a Liga.findByPk', async () => {
    await repo.findById(1);
    expect(Liga.findByPk).toHaveBeenCalledWith(1);
  });

  it('create llama a Liga.create', async () => {
    await repo.create({ nombre: 'Test' });
    expect(Liga.create).toHaveBeenCalledWith({ nombre: 'Test' });
  });
});
