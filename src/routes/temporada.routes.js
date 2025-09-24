const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', async (req, res) => {
  try {
    console.log('🔍 Temporada GET / - Intentando resolver TemporadaController...');
    const controller = container.get('TemporadaController');
    console.log('✅ Temporada GET / - Controller resuelto:', !!controller);
    await controller.getAll(req, res);
  } catch (error) {
    console.error('❌ Temporada GET / - Error:', error.message);
    console.error('❌ Temporada GET / - Stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const controller = container.get('TemporadaController');
    await controller.getById(req, res);
  } catch (error) {
    console.error('❌ Temporada GET /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const controller = container.get('TemporadaController');
    await controller.create(req, res);
  } catch (error) {
    console.error('❌ Temporada POST / - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const controller = container.get('TemporadaController');
    await controller.update(req, res);
  } catch (error) {
    console.error('❌ Temporada PUT /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const controller = container.get('TemporadaController');
    await controller.delete(req, res);
  } catch (error) {
    console.error('❌ Temporada DELETE /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
