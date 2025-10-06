import 'package:flutter/material.dart';
import '../../models/resultado.dart';
import '../../models/partido.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class TablaPosicionesScreen extends StatefulWidget {
  const TablaPosicionesScreen({super.key});

  @override
  State<TablaPosicionesScreen> createState() => _TablaPosicionesScreenState();
}

class _TablaPosicionesScreenState extends State<TablaPosicionesScreen> {
  final ApiService api = ApiService();

  List<Equipo> _equipos = [];
  List<Partido> _partidos = [];
  List<Resultado> _resultados = [];

  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _cargarDatos();
  }

  Future<void> _cargarDatos() async {
    try {
      _equipos = await api.getEquipos();
      _partidos = await api.getPartidos();
      _resultados = await api.getResultados();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error al cargar datos: $e")),
      );
    }
    setState(() {
      _loading = false;
    });
  }

  List<Map<String, dynamic>> _calcularTabla() {
    final Map<int, Map<String, dynamic>> tabla = {};

    for (var equipo in _equipos) {
      tabla[equipo.id!] = {
        'equipo': equipo.nombre,
        'pj': 0,
        'g': 0,
        'e': 0,
        'p': 0,
        'gf': 0,
        'gc': 0,
        'dg': 0,
        'pts': 0,
      };
    }

    for (var r in _resultados) {
      final partido = _partidos.firstWhere(
        (p) => p.id == r.partidoId,
        orElse: () => Partido(
          id: 0,
          equipoLocalId: 0,
          equipoVisitanteId: 0,
          fecha: '',
          temporadaId: 0,
        ),
      );

      if (partido.id == 0) continue;

      final local = tabla[partido.equipoLocalId];
      final visitante = tabla[partido.equipoVisitanteId];
      if (local == null || visitante == null) continue;

      local['pj']++;
      visitante['pj']++;
      local['gf'] += r.golesLocal;
      visitante['gf'] += r.golesVisitante;
      local['gc'] += r.golesVisitante;
      visitante['gc'] += r.golesLocal;

      if (r.golesLocal > r.golesVisitante) {
        local['g']++;
        local['pts'] += 3;
        visitante['p']++;
      } else if (r.golesLocal < r.golesVisitante) {
        visitante['g']++;
        visitante['pts'] += 3;
        local['p']++;
      } else {
        local['e']++;
        visitante['e']++;
        local['pts']++;
        visitante['pts']++;
      }
    }

    for (var equipo in tabla.values) {
      equipo['dg'] = equipo['gf'] - equipo['gc'];
    }

    final lista = tabla.values.toList();
    lista.sort((a, b) {
      if (b['pts'] != a['pts']) return b['pts'].compareTo(a['pts']);
      return b['dg'].compareTo(a['dg']);
    });

    return lista;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Tabla de Posiciones"),
        centerTitle: true,
        backgroundColor: Colors.deepPurple,
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _resultados.isEmpty
              ? const Center(child: Text("⚽ No hay resultados todavía"))
              : Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      // Encabezado
                      Container(
                        padding:
                            const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                        decoration: BoxDecoration(
                          color: Colors.deepPurple,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Expanded(
                              child: Text(
                                "Equipo",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Text("PJ", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("G", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("E", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("P", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("GF", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("GC", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("DG", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            Text("Pts", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 10),

                      // Lista con separación
                      Expanded(
                        child: ListView.separated(
                          itemCount: _calcularTabla().length,
                          separatorBuilder: (_, __) => const SizedBox(height: 6),
                          itemBuilder: (context, index) {
                            final e = _calcularTabla()[index];
                            return Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10),
                                boxShadow: const [
                                  BoxShadow(
                                    color: Colors.black12,
                                    blurRadius: 3,
                                    offset: Offset(0, 1),
                                  ),
                                ],
                              ),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 10),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceAround,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        e['equipo'],
                                        style: const TextStyle(
                                          fontWeight: FontWeight.w600,
                                          fontSize: 15,
                                        ),
                                      ),
                                    ),
                                    Text("${e['pj']}"),
                                    Text("${e['g']}"),
                                    Text("${e['e']}"),
                                    Text("${e['p']}"),
                                    Text("${e['gf']}"),
                                    Text("${e['gc']}"),
                                    Text("${e['dg']}"),
                                    Text("${e['pts']}"),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }
}
