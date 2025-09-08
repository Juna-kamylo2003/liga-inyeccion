
class TablaPosicioneService {
  constructor(tablaPosicioneRepository) {
    this.tablaPosicioneRepository = tablaPosicioneRepository;
  }

  async createTablaPosicione(data) {
    return this.tablaPosicioneRepository.create(data);
  }

  async getAllTablaPosiciones() {
    return this.tablaPosicioneRepository.findAll();
  }
  async findAll() {
    return this.tablaPosicioneRepository.findAll();
  }

  async getTablaPosicioneById(id) {
    return this.tablaPosicioneRepository.getById(id);
  }

  async updateTablaPosicione(id, data) {
    return this.tablaPosicioneRepository.update(id, data);
  }

  async deleteTablaPosicione(id) {
    return this.tablaPosicioneRepository.delete(id);
  }
}

module.exports = TablaPosicioneService;
