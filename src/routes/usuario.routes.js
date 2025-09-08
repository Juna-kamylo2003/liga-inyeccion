const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');


router.get('/', (req, res) => container.get('UsuarioController').getAll(req, res));
router.get('/:id', (req, res) => container.get('UsuarioController').getById(req, res));
router.post('/', (req, res) => container.get('UsuarioController').create(req, res));
router.put('/:id', (req, res) => container.get('UsuarioController').update(req, res));
router.delete('/:id', (req, res) => container.get('UsuarioController').delete(req, res));

module.exports = router;
