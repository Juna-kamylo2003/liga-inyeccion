
class ResultadoService {
  constructor(resultadoRepository) {
    this.resultadoRepository = resultadoRepository;
  }

  async createResultado(data) {
    return this.resultadoRepository.create(data);
  }

  async getAllResultados() {
    return this.resultadoRepository.findAll();
  }
  async findAll() {
    return this.resultadoRepository.findAll();
  }

  async getResultadoById(id) {
    return this.resultadoRepository.getById(id);
  }

  async updateResultado(id, data) {
    return this.resultadoRepository.update(id, data);
  }

  async deleteResultado(id) {
    return this.resultadoRepository.delete(id);
  }
}

module.exports = ResultadoService;
