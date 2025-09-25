const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', async (req, res) => {
  try {
    console.log('🔍 Liga GET / - Iniciando...');
    console.log('🔍 Liga GET / - Container disponible:', !!container);
    console.log('🔍 Liga GET / - Tipo de container:', typeof container);
    console.log('🔍 Liga GET / - Intentando resolver LigaController...');
    const controller = container.get('LigaController');
    console.log('✅ Liga GET / - Controller resuelto:', !!controller);
    await controller.getAll(req, res);
  } catch (error) {
    console.error('❌ Liga GET / - Error:', error.message);
    console.error('❌ Liga GET / - Stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const controller = container.get('LigaController');
    await controller.getById(req, res);
  } catch (error) {
    console.error('❌ Liga GET /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const controller = container.get('LigaController');
    await controller.create(req, res);
  } catch (error) {
    console.error('❌ Liga POST / - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const controller = container.get('LigaController');
    await controller.update(req, res);
  } catch (error) {
    console.error('❌ Liga PUT /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const controller = container.get('LigaController');
    await controller.delete(req, res);
  } catch (error) {
    console.error('❌ Liga DELETE /:id - Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
