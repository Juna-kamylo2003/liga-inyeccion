class EquipoService {
  constructor(equipoRepository) {
    this.equipoRepository = equipoRepository;
  }
  async getAll() {
    return this.equipoRepository.findAll();
  }
  async getById(id) {
    return this.equipoRepository.findById(id);
  }
  async create(data) {
    return this.equipoRepository.create(data);
  }
  async update(id, data) {
    return this.equipoRepository.update(id, data);
  }
  async delete(id) {
    return this.equipoRepository.delete(id);
  }
}

module.exports = EquipoService;
