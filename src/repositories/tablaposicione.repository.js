
class TablaPosicioneRepository {
  constructor(TablaPosicioneModel) {
    this.TablaPosicione = TablaPosicioneModel;
  }

  async findAll() {
    return this.TablaPosicione.findAll();
  }

  async getAll() {
    return this.TablaPosicione.findAll();
  }

  async getById(id) {
    return this.TablaPosicione.findByPk(id);
  }

  async create(data) {
    return this.TablaPosicione.create(data);
  }

  async update(id, data) {
    const record = await this.TablaPosicione.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  async delete(id) {
    const record = await this.TablaPosicione.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = TablaPosicioneRepository;
