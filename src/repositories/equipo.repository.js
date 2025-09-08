

class EquipoRepository {
  constructor(EquipoModel) {
    this.Equipo = EquipoModel;
  }
  async findAll() {
    return this.Equipo.findAll();
  }
  async findById(id) {
    return this.Equipo.findByPk(id);
  }
  async create(data) {
    return this.Equipo.create(data);
  }
  async update(id, data) {
    const equipo = await this.Equipo.findByPk(id);
    if (!equipo) return null;
    return equipo.update(data);
  }
  async delete(id) {
    const equipo = await this.Equipo.findByPk(id);
    if (!equipo) return null;
    await equipo.destroy();
    return true;
  }
}

module.exports = EquipoRepository;
