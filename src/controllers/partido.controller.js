class PartidoController {
  constructor(partidoService) {
    this.partidoService = partidoService;
  }

  getAll = async (req, res) => {
    const partidos = await this.partidoService.getAll();
    res.json(partidos);
  };

  getById = async (req, res) => {
    const partido = await this.partidoService.getById(req.params.id);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
    res.json(partido);
  };

  create = async (req, res) => {
    const partido = await this.partidoService.create(req.body);
    res.status(201).json(partido);
  };

  update = async (req, res) => {
    const partido = await this.partidoService.update(req.params.id, req.body);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
    res.json(partido);
  };

  delete = async (req, res) => {
    const deleted = await this.partidoService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Partido no encontrado' });
    res.json({ message: 'Partido eliminado' });
  };
}

module.exports = PartidoController;
