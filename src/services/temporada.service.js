class TemporadaService {
  constructor(temporadaRepository) {
    this.temporadaRepository = temporadaRepository;
  }
  async getAll() {
    return this.temporadaRepository.findAll();
  }
  async getById(id) {
    return this.temporadaRepository.findById(id);
  }
  async create(data) {
    return this.temporadaRepository.create(data);
  }
  async update(id, data) {
    return this.temporadaRepository.update(id, data);
  }
  async delete(id) {
    return this.temporadaRepository.delete(id);
  }
}

module.exports = TemporadaService;
