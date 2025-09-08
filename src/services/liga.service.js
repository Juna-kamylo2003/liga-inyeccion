class LigaService {
  constructor(ligaRepository) {
    this.ligaRepository = ligaRepository;
  }
  async getAll() {
    return this.ligaRepository.findAll();
  }
  async getById(id) {
    return this.ligaRepository.findById(id);
  }
  async create(data) {
    return this.ligaRepository.create(data);
  }
  async update(id, data) {
    return this.ligaRepository.update(id, data);
  }
  async delete(id) {
    return this.ligaRepository.delete(id);
  }
}

module.exports = LigaService;
