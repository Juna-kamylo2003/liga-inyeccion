class JugadorController {
  constructor(jugadorService) {
    this.jugadorService = jugadorService;
  }

  getAll = async (req, res) => {
    const jugadores = await this.jugadorService.getAll();
    res.json(jugadores);
  };

  getById = async (req, res) => {
    const jugador = await this.jugadorService.getById(req.params.id);
    if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });
    res.json(jugador);
  };

  create = async (req, res) => {
    const jugador = await this.jugadorService.create(req.body);
    res.status(201).json(jugador);
  };

  update = async (req, res) => {
    const jugador = await this.jugadorService.update(req.params.id, req.body);
    if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });
    res.json(jugador);
  };

  delete = async (req, res) => {
    const deleted = await this.jugadorService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Jugador no encontrado' });
    res.json({ message: 'Jugador eliminado' });
  };
}

module.exports = JugadorController;
