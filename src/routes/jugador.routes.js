const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => {
	console.log('container en /jugadores:', container);
	container.get('JugadorController').getAll(req, res);
});
router.get('/:id', (req, res) => {
	console.log('container en /jugadores/:id:', container);
	container.get('JugadorController').getById(req, res);
});
router.post('/', (req, res) => {
	console.log('container en POST /jugadores:', container);
	container.get('JugadorController').create(req, res);
});
router.put('/:id', (req, res) => {
	console.log('container en PUT /jugadores/:id:', container);
	container.get('JugadorController').update(req, res);
});
router.delete('/:id', (req, res) => {
	console.log('container en DELETE /jugadores/:id:', container);
	container.get('JugadorController').delete(req, res);
});

module.exports = router;
