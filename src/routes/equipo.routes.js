const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => {
	console.log('container en /equipos:', container);
	container.get('EquipoController').getAll(req, res);
});
router.get('/:id', (req, res) => {
	console.log('container en /equipos/:id:', container);
	container.get('EquipoController').getById(req, res);
});
router.post('/', (req, res) => {
	console.log('container en POST /equipos:', container);
	container.get('EquipoController').create(req, res);
});
router.put('/:id', (req, res) => {
	console.log('container en PUT /equipos/:id:', container);
	container.get('EquipoController').update(req, res);
});
router.delete('/:id', (req, res) => {
	console.log('container en DELETE /equipos/:id:', container);
	container.get('EquipoController').delete(req, res);
});

module.exports = router;
