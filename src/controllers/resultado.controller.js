class ResultadoController {
  constructor(resultadoService) {
    this.resultadoService = resultadoService;
  }

  async getAll(req, res) {
    try {
  const data = await this.resultadoService.getAllResultados();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await this.resultadoService.getById(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
  try {
    const data = await this.resultadoService.createResultado(req.body); // ✅ nombre correcto
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  async update(req, res) {
    try {
      const data = await this.resultadoService.updateResultado(req.params.id, req.body);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const ok = await this.resultadoService.delete(req.params.id);
      if (!ok) return res.status(404).json({ error: 'No encontrado' });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ResultadoController;
