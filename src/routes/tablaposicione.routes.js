const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => container.get('TablaPosicioneController').getAll(req, res));
router.get('/:id', (req, res) => container.get('TablaPosicioneController').getById(req, res));
router.post('/', (req, res) => container.get('TablaPosicioneController').create(req, res));
router.put('/:id', (req, res) => container.get('TablaPosicioneController').update(req, res));
router.delete('/:id', (req, res) => container.get('TablaPosicioneController').delete(req, res));

module.exports = router;
