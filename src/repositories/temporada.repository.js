

class TemporadaRepository {
  constructor(TemporadaModel) {
    this.Temporada = TemporadaModel;
  }
  async findAll() {
    return this.Temporada.findAll();
  }
  async findById(id) {
    return this.Temporada.findByPk(id);
  }
  async create(data) {
    return this.Temporada.create(data);
  }
  async update(id, data) {
    const temporada = await this.Temporada.findByPk(id);
    if (!temporada) return null;
    return temporada.update(data);
  }
  async delete(id) {
    const temporada = await this.Temporada.findByPk(id);
    if (!temporada) return null;
    await temporada.destroy();
    return true;
  }
}

module.exports = TemporadaRepository;
