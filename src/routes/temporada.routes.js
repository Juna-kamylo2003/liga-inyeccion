const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => {
	console.log('container en /temporadas:', container);
	container.get('TemporadaController').getAll(req, res);
});
router.get('/:id', (req, res) => {
	console.log('container en /temporadas/:id:', container);
	container.get('TemporadaController').getById(req, res);
});
router.post('/', (req, res) => {
	console.log('container en POST /temporadas:', container);
	container.get('TemporadaController').create(req, res);
});
router.put('/:id', (req, res) => {
	console.log('container en PUT /temporadas/:id:', container);
	container.get('TemporadaController').update(req, res);
});
router.delete('/:id', (req, res) => {
	console.log('container en DELETE /temporadas/:id:', container);
	container.get('TemporadaController').delete(req, res);
});

module.exports = router;
