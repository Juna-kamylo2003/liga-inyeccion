class LigaController {
  constructor(ligaService) {
    this.ligaService = ligaService;
  }

  getAll = async (req, res) => {
    const ligas = await this.ligaService.getAll();
    res.json(ligas);
  };

  getById = async (req, res) => {
    const liga = await this.ligaService.getById(req.params.id);
    if (!liga) return res.status(404).json({ message: 'Liga no encontrada' });
    res.json(liga);
  };

  create = async (req, res) => {
    const liga = await this.ligaService.create(req.body);
    res.status(201).json(liga);
  };

  update = async (req, res) => {
    const liga = await this.ligaService.update(req.params.id, req.body);
    if (!liga) return res.status(404).json({ message: 'Liga no encontrada' });
    res.json(liga);
  };

  delete = async (req, res) => {
    const deleted = await this.ligaService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Liga no encontrada' });
    res.json({ message: 'Liga eliminada' });
  };
}

module.exports = LigaController;
