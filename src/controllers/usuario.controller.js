class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  getAll = async (req, res) => {
    try {
      const usuarios = await this.usuarioService.getAllUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getById = async (req, res) => {
    try {
      const usuario = await this.usuarioService.getUsuarioById(req.params.id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  create = async (req, res) => {
    try {
      const usuario = await this.usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  update = async (req, res) => {
    try {
      const usuario = await this.usuarioService.updateUsuario(req.params.id, req.body);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  delete = async (req, res) => {
    try {
      const usuario = await this.usuarioService.deleteUsuario(req.params.id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = UsuarioController;
