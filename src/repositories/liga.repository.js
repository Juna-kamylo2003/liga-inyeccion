

class LigaRepository {
  constructor(LigaModel) {
    this.Liga = LigaModel;
  }
  async findAll() {
    return this.Liga.findAll();
  }
  async findById(id) {
    return this.Liga.findByPk(id);
  }
  async create(data) {
    return this.Liga.create(data);
  }
  async update(id, data) {
    const liga = await this.Liga.findByPk(id);
    if (!liga) return null;
    return liga.update(data);
  }
  async delete(id) {
    const liga = await this.Liga.findByPk(id);
    if (!liga) return null;
    await liga.destroy();
    return true;
  }
}

module.exports = LigaRepository;
