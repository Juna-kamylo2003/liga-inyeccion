class EquipoController {
  constructor(equipoService) {
    this.equipoService = equipoService;
  }

  getAll = async (req, res) => {
    const equipos = await this.equipoService.getAll();
    res.json(equipos);
  };

  getById = async (req, res) => {
    const equipo = await this.equipoService.getById(req.params.id);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  };

  create = async (req, res) => {
    const equipo = await this.equipoService.create(req.body);
    res.status(201).json(equipo);
  };

  update = async (req, res) => {
    const equipo = await this.equipoService.update(req.params.id, req.body);
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  };

  delete = async (req, res) => {
    const deleted = await this.equipoService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json({ message: 'Equipo eliminado' });
  };
}

module.exports = EquipoController;
