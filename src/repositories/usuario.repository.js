
class UsuarioRepository {
  constructor(UsuarioModel) {
    this.Usuario = UsuarioModel;
  }

  async findAll() {
    return this.Usuario.findAll();
  }

  async findById(id) {
    return this.Usuario.findByPk(id);
  }

  async create(data) {
    return this.Usuario.create(data);
  }

  async update(id, data) {
    const usuario = await this.Usuario.findByPk(id);
    if (!usuario) return null;
    return usuario.update(data);
  }

  async delete(id) {
    const usuario = await this.Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.destroy();
    return usuario;
  }
}

module.exports = UsuarioRepository;
