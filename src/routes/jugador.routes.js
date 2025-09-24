const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => container.get('JugadorController').getAll(req, res));
router.get('/:id', (req, res) => container.get('JugadorController').getById(req, res));
router.post('/', (req, res) => container.get('JugadorController').create(req, res));
router.put('/:id', (req, res) => container.get('JugadorController').update(req, res));
router.delete('/:id', (req, res) => container.get('JugadorController').delete(req, res));

module.exports = router;
