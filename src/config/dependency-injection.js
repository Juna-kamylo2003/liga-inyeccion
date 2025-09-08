const UsuarioRepository = require('../repositories/usuario.repository');
const UsuarioService = require('../services/usuario.service');
const UsuarioController = require('../controllers/usuario.controller');


const { Container } = require('inversify');
const models = require('../../models');
console.log('Modelos disponibles:', Object.keys(models));
console.log('Liga:', models.Liga);
console.log('Temporada:', models.Temporada);
console.log('Equipo:', models.Equipo);
console.log('Jugador:', models.Jugador);
console.log('Partido:', models.Partido);
const LigaRepository = require('../repositories/liga.repository');
const LigaService = require('../services/liga.service');
const LigaController = require('../controllers/liga.controller');
const TemporadaRepository = require('../repositories/temporada.repository');
const TemporadaService = require('../services/temporada.service');
const TemporadaController = require('../controllers/temporada.controller');
const EquipoRepository = require('../repositories/equipo.repository');
const EquipoService = require('../services/equipo.service');
const EquipoController = require('../controllers/equipo.controller');
const JugadorRepository = require('../repositories/jugador.repository');
const JugadorService = require('../services/jugador.service');
const JugadorController = require('../controllers/jugador.controller');

const PartidoRepository = require('../repositories/partido.repository');
const PartidoService = require('../services/partido.service');
const PartidoController = require('../controllers/partido.controller');

const TablaPosicioneRepository = require('../repositories/tablaposicione.repository');
const TablaPosicioneService = require('../services/tablaposicione.service');
const TablaPosicioneController = require('../controllers/tablaposicione.controller');

const ResultadoRepository = require('../repositories/resultado.repository');
const ResultadoService = require('../services/resultado.service');
const ResultadoController = require('../controllers/resultado.controller');



const container = new Container();
function configureDependencies() {
  // Usuario bindings
  container.bind('UsuarioRepository').toConstantValue(new UsuarioRepository(models.Usuario));
  container.bind('UsuarioService').toDynamicValue(() => {
    console.log('Resolviendo UsuarioService...');
    return new UsuarioService(container.get('UsuarioRepository'));
  });
  container.bind('UsuarioController').toDynamicValue(() => {
    console.log('Resolviendo UsuarioController...');
    return new UsuarioController(container.get('UsuarioService'));
  });

  // Liga bindings
  container.bind('LigaRepository').toConstantValue(new LigaRepository(models.Liga));
  container.bind('LigaService').toDynamicValue(() => {
    console.log('Resolviendo LigaService...');
    return new LigaService(container.get('LigaRepository'));
  });
  container.bind('LigaController').toDynamicValue(() => {
    console.log('Resolviendo LigaController...');
    return new LigaController(container.get('LigaService'));
  });

  // Temporada bindings
  container.bind('TemporadaRepository').toConstantValue(new TemporadaRepository(models.Temporada));
  container.bind('TemporadaService').toDynamicValue(() => {
    console.log('Resolviendo TemporadaService...');
    return new TemporadaService(container.get('TemporadaRepository'));
  });
  container.bind('TemporadaController').toDynamicValue(() => {
    console.log('Resolviendo TemporadaController...');
    return new TemporadaController(container.get('TemporadaService'));
  });

  // Equipo bindings
  container.bind('EquipoRepository').toConstantValue(new EquipoRepository(models.Equipo));
  container.bind('EquipoService').toDynamicValue(() => {
    console.log('Resolviendo EquipoService...');
    return new EquipoService(container.get('EquipoRepository'));
  });
  container.bind('EquipoController').toDynamicValue(() => {
    console.log('Resolviendo EquipoController...');
    return new EquipoController(container.get('EquipoService'));
  });

  // Jugador bindings
  container.bind('JugadorRepository').toConstantValue(new JugadorRepository(models.Jugador));
  container.bind('JugadorService').toDynamicValue(() => {
    console.log('Resolviendo JugadorService...');
    return new JugadorService(container.get('JugadorRepository'));
  });
  container.bind('JugadorController').toDynamicValue(() => {
    console.log('Resolviendo JugadorController...');
    return new JugadorController(container.get('JugadorService'));
  });

  // Partido bindings
  container.bind('PartidoRepository').toConstantValue(new PartidoRepository(models.Partido));
  container.bind('PartidoService').toDynamicValue(() => {
    console.log('Resolviendo PartidoService...');
    return new PartidoService(container.get('PartidoRepository'));
  });
  container.bind('PartidoController').toDynamicValue(() => {
    console.log('Resolviendo PartidoController...');
    return new PartidoController(container.get('PartidoService'));
  });

  // TablaPosicione bindings
  container.bind('TablaPosicioneRepository').toConstantValue(new TablaPosicioneRepository(models.TablaPosicione));
  container.bind('TablaPosicioneService').toDynamicValue(() => {
    console.log('Resolviendo TablaPosicioneService...');
    return new TablaPosicioneService(container.get('TablaPosicioneRepository'));
  });
  container.bind('TablaPosicioneController').toDynamicValue(() => {
    console.log('Resolviendo TablaPosicioneController...');
    return new TablaPosicioneController(container.get('TablaPosicioneService'));
  });

  // Resultado bindings
  container.bind('ResultadoRepository').toConstantValue(new ResultadoRepository(models.Resultado));
  container.bind('ResultadoService').toDynamicValue(() => {
    console.log('Resolviendo ResultadoService...');
    return new ResultadoService(container.get('ResultadoRepository'));
  });
  container.bind('ResultadoController').toDynamicValue(() => {
    console.log('Resolviendo ResultadoController...');
    return new ResultadoController(container.get('ResultadoService'));
  });
}

module.exports = { container, configureDependencies };
