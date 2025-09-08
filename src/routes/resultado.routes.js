const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => container.get('ResultadoController').getAll(req, res));
router.get('/:id', (req, res) => container.get('ResultadoController').getById(req, res));
router.post('/', (req, res) => container.get('ResultadoController').create(req, res));
router.put('/:id', (req, res) => container.get('ResultadoController').update(req, res));
router.delete('/:id', (req, res) => container.get('ResultadoController').delete(req, res));

module.exports = router;
