
class ResultadoRepository {
  constructor(ResultadoModel) {
    this.Resultado = ResultadoModel;
  }

  async findAll() {
    return this.Resultado.findAll();
  }

  async getAll() {
    return this.Resultado.findAll();
  }

  async getById(id) {
    return this.Resultado.findByPk(id);
  }

  async create(data) {
    return this.Resultado.create(data);
  }

  async update(id, data) {
    const record = await this.Resultado.findByPk(id);
    if (!record) return null;
    return record.update(data);
  }

  async delete(id) {
    const record = await this.Resultado.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = ResultadoRepository;
