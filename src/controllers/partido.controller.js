class PartidoController {
  constructor(partidoService) {
    this.partidoService = partidoService;
  }

  getAll = async (req, res) => {
    try {
      const partidos = await this.partidoService.getAll();
      res.json(partidos);
    } catch (error) {
      console.error('Error in PartidoController.getAll:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'GET /api/partidos'
      });
    }
  };

  getById = async (req, res) => {
    try {
      const partido = await this.partidoService.getById(req.params.id);
      if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
      res.json(partido);
    } catch (error) {
      console.error('Error in PartidoController.getById:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `GET /api/partidos/${req.params.id}`
      });
    }
  };

  create = async (req, res) => {
    try {
      const partido = await this.partidoService.create(req.body);
      res.status(201).json(partido);
    } catch (error) {
      console.error('Error in PartidoController.create:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'POST /api/partidos'
      });
    }
  };

  update = async (req, res) => {
    try {
      const partido = await this.partidoService.update(req.params.id, req.body);
      if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
      res.json(partido);
    } catch (error) {
      console.error('Error in PartidoController.update:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `PUT /api/partidos/${req.params.id}`
      });
    }
  };

  delete = async (req, res) => {
    try {
      const deleted = await this.partidoService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Partido no encontrado' });
      res.status(204).send();
    } catch (error) {
      console.error('Error in PartidoController.delete:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `DELETE /api/partidos/${req.params.id}`
      });
    }
  };
}

module.exports = PartidoController;
