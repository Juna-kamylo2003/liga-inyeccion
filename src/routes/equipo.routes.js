const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => container.get('EquipoController').getAll(req, res));
router.get('/:id', (req, res) => container.get('EquipoController').getById(req, res));
router.post('/', (req, res) => container.get('EquipoController').create(req, res));
router.put('/:id', (req, res) => container.get('EquipoController').update(req, res));
router.delete('/:id', (req, res) => container.get('EquipoController').delete(req, res));

module.exports = router;
