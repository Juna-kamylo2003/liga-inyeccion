class TemporadaController {
  constructor(temporadaService) {
    this.temporadaService = temporadaService;
  }

  getAll = async (req, res) => {
    const temporadas = await this.temporadaService.getAll();
    res.json(temporadas);
  };

  getById = async (req, res) => {
    const temporada = await this.temporadaService.getById(req.params.id);
    if (!temporada) return res.status(404).json({ message: 'Temporada no encontrada' });
    res.json(temporada);
  };

  create = async (req, res) => {
    const temporada = await this.temporadaService.create(req.body);
    res.status(201).json(temporada);
  };

  update = async (req, res) => {
    const temporada = await this.temporadaService.update(req.params.id, req.body);
    if (!temporada) return res.status(404).json({ message: 'Temporada no encontrada' });
    res.json(temporada);
  };

  delete = async (req, res) => {
    const deleted = await this.temporadaService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Temporada no encontrada' });
    res.json({ message: 'Temporada eliminada' });
  };
}

module.exports = TemporadaController;
