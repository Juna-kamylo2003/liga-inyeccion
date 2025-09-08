

class PartidoRepository {
  constructor(PartidoModel) {
    this.Partido = PartidoModel;
  }
  async findAll() {
    return this.Partido.findAll();
  }
  async findById(id) {
    return this.Partido.findByPk(id);
  }
  async create(data) {
    return this.Partido.create(data);
  }
  async update(id, data) {
    const partido = await this.Partido.findByPk(id);
    if (!partido) return null;
    return partido.update(data);
  }
  async delete(id) {
    const partido = await this.Partido.findByPk(id);
    if (!partido) return null;
    await partido.destroy();
    return true;
  }
}

module.exports = PartidoRepository;
