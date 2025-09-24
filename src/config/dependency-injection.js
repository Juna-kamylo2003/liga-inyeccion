const { Container } = require('inversify');
const models = require('../../models');

// Repositories
const LigaRepository = require('../repositories/liga.repository');
const TemporadaRepository = require('../repositories/temporada.repository');
const EquipoRepository = require('../repositories/equipo.repository');
const JugadorRepository = require('../repositories/jugador.repository');
const PartidoRepository = require('../repositories/partido.repository');
const ResultadoRepository = require('../repositories/resultado.repository');
const TablaPosicioneRepository = require('../repositories/tablaposicione.repository');
const UsuarioRepository = require('../repositories/usuario.repository');

// Services
const LigaService = require('../services/liga.service');
const TemporadaService = require('../services/temporada.service');
const EquipoService = require('../services/equipo.service');
const JugadorService = require('../services/jugador.service');
const PartidoService = require('../services/partido.service');
const ResultadoService = require('../services/resultado.service');
const TablaPosicioneService = require('../services/tablaposicione.service');
const UsuarioService = require('../services/usuario.service');

// Controllers
const LigaController = require('../controllers/liga.controller');
const TemporadaController = require('../controllers/temporada.controller');
const EquipoController = require('../controllers/equipo.controller');
const JugadorController = require('../controllers/jugador.controller');
const PartidoController = require('../controllers/partido.controller');
const ResultadoController = require('../controllers/resultado.controller');
const TablaPosicioneController = require('../controllers/tablaposicione.controller');
const UsuarioController = require('../controllers/usuario.controller');

const container = new Container();

function configureDependencies() {
  // Liga
  container.bind('LigaRepository').toConstantValue(new LigaRepository(models.Liga));
  container.bind('LigaService').toDynamicValue(() => new LigaService(container.get('LigaRepository')));
  container.bind('LigaController').toDynamicValue(() => new LigaController(container.get('LigaService')));

  // Temporada
  container.bind('TemporadaRepository').toConstantValue(new TemporadaRepository(models.Temporada));
  container.bind('TemporadaService').toDynamicValue(() => new TemporadaService(container.get('TemporadaRepository')));
  container.bind('TemporadaController').toDynamicValue(() => new TemporadaController(container.get('TemporadaService')));

  // Equipo
  container.bind('EquipoRepository').toConstantValue(new EquipoRepository(models.Equipo));
  container.bind('EquipoService').toDynamicValue(() => new EquipoService(container.get('EquipoRepository')));
  container.bind('EquipoController').toDynamicValue(() => new EquipoController(container.get('EquipoService')));

  // Jugador
  container.bind('JugadorRepository').toConstantValue(new JugadorRepository(models.Jugador));
  container.bind('JugadorService').toDynamicValue(() => new JugadorService(container.get('JugadorRepository')));
  container.bind('JugadorController').toDynamicValue(() => new JugadorController(container.get('JugadorService')));

  // Partido
  container.bind('PartidoRepository').toConstantValue(new PartidoRepository(models.Partido));
  container.bind('PartidoService').toDynamicValue(() => new PartidoService(container.get('PartidoRepository')));
  container.bind('PartidoController').toDynamicValue(() => new PartidoController(container.get('PartidoService')));

  // Resultado
  container.bind('ResultadoRepository').toConstantValue(new ResultadoRepository(models.Resultado));
  container.bind('ResultadoService').toDynamicValue(() => new ResultadoService(container.get('ResultadoRepository')));
  container.bind('ResultadoController').toDynamicValue(() => new ResultadoController(container.get('ResultadoService')));

  // TablaPosicione
  container.bind('TablaPosicioneRepository').toConstantValue(new TablaPosicioneRepository(models.TablaPosicione));
  container.bind('TablaPosicioneService').toDynamicValue(() => new TablaPosicioneService(container.get('TablaPosicioneRepository')));
  container.bind('TablaPosicioneController').toDynamicValue(() => new TablaPosicioneController(container.get('TablaPosicioneService')));

  // Usuario
  container.bind('UsuarioRepository').toConstantValue(new UsuarioRepository(models.Usuario));
  container.bind('UsuarioService').toDynamicValue(() => new UsuarioService(container.get('UsuarioRepository')));
  container.bind('UsuarioController').toDynamicValue(() => new UsuarioController(container.get('UsuarioService')));
}

// Configurar dependencias
configureDependencies();

module.exports = container;