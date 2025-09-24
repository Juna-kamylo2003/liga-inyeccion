class JugadorController {
  constructor(jugadorService) {
    this.jugadorService = jugadorService;
  }

  getAll = async (req, res) => {
    try {
      const jugadores = await this.jugadorService.getAll();
      res.json(jugadores);
    } catch (error) {
      console.error('Error in JugadorController.getAll:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'GET /api/jugadores'
      });
    }
  };

  getById = async (req, res) => {
    try {
      const jugador = await this.jugadorService.getById(req.params.id);
      if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.json(jugador);
    } catch (error) {
      console.error('Error in JugadorController.getById:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `GET /api/jugadores/${req.params.id}`
      });
    }
  };

  create = async (req, res) => {
    try {
      const jugador = await this.jugadorService.create(req.body);
      res.status(201).json(jugador);
    } catch (error) {
      console.error('Error in JugadorController.create:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: 'POST /api/jugadores'
      });
    }
  };

  update = async (req, res) => {
    try {
      const jugador = await this.jugadorService.update(req.params.id, req.body);
      if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.json(jugador);
    } catch (error) {
      console.error('Error in JugadorController.update:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `PUT /api/jugadores/${req.params.id}`
      });
    }
  };

  delete = async (req, res) => {
    try {
      const deleted = await this.jugadorService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Jugador no encontrado' });
      res.status(204).send();
    } catch (error) {
      console.error('Error in JugadorController.delete:', error);
      res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: error.message,
        endpoint: `DELETE /api/jugadores/${req.params.id}`
      });
    }
  };
}

module.exports = JugadorController;
