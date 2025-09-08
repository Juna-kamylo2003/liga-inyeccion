const express = require('express');
const router = express.Router();
const { container } = require('../config/dependency-injection');

router.get('/', (req, res) => {
	console.log('container en /ligas:', container);
	container.get('LigaController').getAll(req, res);
});
router.get('/:id', (req, res) => {
	console.log('container en /ligas/:id:', container);
	container.get('LigaController').getById(req, res);
});
router.post('/', (req, res) => {
	console.log('container en POST /ligas:', container);
	container.get('LigaController').create(req, res);
});
router.put('/:id', (req, res) => {
	console.log('container en PUT /ligas/:id:', container);
	container.get('LigaController').update(req, res);
});
router.delete('/:id', (req, res) => {
	console.log('container en DELETE /ligas/:id:', container);
	container.get('LigaController').delete(req, res);
});

module.exports = router;
