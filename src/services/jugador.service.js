class JugadorService {
  constructor(jugadorRepository) {
    this.jugadorRepository = jugadorRepository;
  }
  async getAll() {
    return this.jugadorRepository.findAll();
  }
  async getById(id) {
    return this.jugadorRepository.findById(id);
  }
  async create(data) {
    return this.jugadorRepository.create(data);
  }
  async update(id, data) {
    return this.jugadorRepository.update(id, data);
  }
  async delete(id) {
    return this.jugadorRepository.delete(id);
  }
}

module.exports = JugadorService;
