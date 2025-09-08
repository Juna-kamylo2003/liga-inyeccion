class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  getAll = async (req, res) => {
    const usuarios = await this.usuarioService.getAllUsuarios();
    res.json(usuarios);
  };

  getById = async (req, res) => {
    const usuario = await this.usuarioService.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  };

  create = async (req, res) => {
    const usuario = await this.usuarioService.createUsuario(req.body);
    res.status(201).json(usuario);
  };

  update = async (req, res) => {
    const usuario = await this.usuarioService.updateUsuario(req.params.id, req.body);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  };

  delete = async (req, res) => {
    const usuario = await this.usuarioService.deleteUsuario(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).send();
  };
}

module.exports = UsuarioController;
