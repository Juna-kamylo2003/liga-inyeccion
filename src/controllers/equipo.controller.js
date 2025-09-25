class EquipoController {
  constructor(equipoService) {
    this.equipoService = equipoService;
  }

  getAll = async (req, res) => {
    try {
      const equipos = await this.equipoService.getAll();
      res.json(equipos);
    } catch (error) {
      console.error('Error in EquipoController.getAll:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'GET /api/equipos'
      });
    }
  };

  getById = async (req, res) => {
    try {
      const equipo = await this.equipoService.getById(req.params.id);
      if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
      res.json(equipo);
    } catch (error) {
      console.error('Error in EquipoController.getById:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `GET /api/equipos/${req.params.id}`
      });
    }
  };

  create = async (req, res) => {
    try {
      const equipo = await this.equipoService.create(req.body);
      res.status(201).json(equipo);
    } catch (error) {
      console.error('Error in EquipoController.create:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'POST /api/equipos'
      });
    }
  };

  update = async (req, res) => {
    try {
      const equipo = await this.equipoService.update(req.params.id, req.body);
      if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
      res.json(equipo);
    } catch (error) {
      console.error('Error in EquipoController.update:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `PUT /api/equipos/${req.params.id}`
      });
    }
  };

  delete = async (req, res) => {
    try {
      const deleted = await this.equipoService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Equipo no encontrado' });
      res.status(204).send();
    } catch (error) {
      console.error('Error in EquipoController.delete:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `DELETE /api/equipos/${req.params.id}`
      });
    }
  };
}

module.exports = EquipoController;
