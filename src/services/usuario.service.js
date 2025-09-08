class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async getAllUsuarios() {
    return this.usuarioRepository.findAll();
  }

  async getUsuarioById(id) {
    return this.usuarioRepository.findById(id);
  }

  async createUsuario(data) {
    return this.usuarioRepository.create(data);
  }

  async updateUsuario(id, data) {
    return this.usuarioRepository.update(id, data);
  }

  async deleteUsuario(id) {
    return this.usuarioRepository.delete(id);
  }
}

module.exports = UsuarioService;
