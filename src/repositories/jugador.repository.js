

class JugadorRepository {
  constructor(JugadorModel) {
    this.Jugador = JugadorModel;
  }
  async findAll() {
    return this.Jugador.findAll();
  }
  async findById(id) {
    return this.Jugador.findByPk(id);
  }
  async create(data) {
    return this.Jugador.create(data);
  }
  async update(id, data) {
    const jugador = await this.Jugador.findByPk(id);
    if (!jugador) return null;
    return jugador.update(data);
  }
  async delete(id) {
    const jugador = await this.Jugador.findByPk(id);
    if (!jugador) return null;
    await jugador.destroy();
    return true;
  }
}

module.exports = JugadorRepository;
