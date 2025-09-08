const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => {
	console.log('container en /partidos:', container);
	container.get('PartidoController').getAll(req, res);
});
router.get('/:id', (req, res) => {
	console.log('container en /partidos/:id:', container);
	container.get('PartidoController').getById(req, res);
});
router.post('/', (req, res) => {
	console.log('container en POST /partidos:', container);
	container.get('PartidoController').create(req, res);
});
router.put('/:id', (req, res) => {
	console.log('container en PUT /partidos/:id:', container);
	container.get('PartidoController').update(req, res);
});
router.delete('/:id', (req, res) => {
	console.log('container en DELETE /partidos/:id:', container);
	container.get('PartidoController').delete(req, res);
});

module.exports = router;
