class TablaPosicioneController {
  constructor(tablaPosicioneService) {
    this.tablaPosicioneService = tablaPosicioneService;
  }

  async getAll(req, res) {
    try {
  const data = await this.tablaPosicioneService.getAllTablaPosiciones();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await this.tablaPosicioneService.getById(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = await this.tablaPosicioneService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const data = await this.tablaPosicioneService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const ok = await this.tablaPosicioneService.delete(req.params.id);
      if (!ok) return res.status(404).json({ error: 'No encontrado' });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = TablaPosicioneController;
