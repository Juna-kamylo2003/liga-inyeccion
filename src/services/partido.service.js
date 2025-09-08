class PartidoService {
  constructor(partidoRepository) {
    this.partidoRepository = partidoRepository;
  }
  async getAll() {
    return this.partidoRepository.findAll();
  }
  async getById(id) {
    return this.partidoRepository.findById(id);
  }
  async create(data) {
    return this.partidoRepository.create(data);
  }
  async update(id, data) {
    return this.partidoRepository.update(id, data);
  }
  async delete(id) {
    return this.partidoRepository.delete(id);
  }
}

module.exports = PartidoService;
