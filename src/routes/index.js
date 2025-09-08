// ...existing code...

const express = require('express');
const router = express.Router();




const ligasRouter = require('./liga.routes');
const temporadasRouter = require('./temporada.routes');

const equiposRouter = require('./equipo.routes');

const jugadoresRouter = require('./jugador.routes');
const partidosRouter = require('./partido.routes');
const tablaPosicioneRouter = require('./tablaposicione.routes');
const resultadosRouter = require('./resultado.routes');
const usuariosRouter = require('./usuario.routes');
router.use('/ligas', ligasRouter);
router.use('/temporadas', temporadasRouter);
router.use('/equipos', equiposRouter);
router.use('/jugadores', jugadoresRouter);
router.use('/partidos', partidosRouter);
router.use('/tabla-posiciones', tablaPosicioneRouter);
router.use('/resultados', resultadosRouter);
router.use('/usuarios', usuariosRouter);

module.exports = router;
