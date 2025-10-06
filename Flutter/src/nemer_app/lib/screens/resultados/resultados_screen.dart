import 'package:flutter/material.dart';
import '../../models/resultado.dart';
import '../../models/partido.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';
import 'resultado_form.dart';

class ResultadosScreen extends StatefulWidget {
  const ResultadosScreen({super.key});

  @override
  State<ResultadosScreen> createState() => _ResultadosScreenState();
}

class _ResultadosScreenState extends State<ResultadosScreen> {
  late Future<List<Resultado>> _futureResultados;
  List<Partido> _partidos = [];
  List<Equipo> _equipos = [];

  @override
  void initState() {
    super.initState();
    _loadResultados();
    _loadEquiposYPartidos();
  }

  void _loadResultados() {
    _futureResultados = ApiService().getResultados();
  }

  Future<void> _loadEquiposYPartidos() async {
    final api = ApiService();
    _partidos = await api.getPartidos();
    _equipos = await api.getEquipos();
    setState(() {});
  }

  String _nombreEquipoById(int? id) {
    if (id == null) return '---';
    final eq = _equipos.firstWhere(
      (e) => e.id == id,
      orElse: () => Equipo(id: 0, nombre: 'Equipo no registrado', ciudad: ''),
    );
    return eq.nombre;
  }

  String _nombrePartidoById(int? id) {
    if (id == null) return '---';
    final partido = _partidos.firstWhere(
      (p) => p.id == id,
      orElse: () => Partido(
        id: 0,
        equipoLocalId: 0,
        equipoVisitanteId: 0,
        fecha: '',
        temporadaId: 0,
      ),
    );
    final local = _nombreEquipoById(partido.equipoLocalId);
    final visitante = _nombreEquipoById(partido.equipoVisitanteId);
    return "$local vs $visitante";
  }

  void _abrirFormulario({Resultado? resultado}) async {
    final guardado = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => ResultadoForm(resultado: resultado)),
    );

    if (guardado == true) {
      setState(() {
        _loadResultados();
      });
    }
  }

  // 🔴 Eliminación por ahora ya despues mejoramos el de eliminar 
  /*
  void _eliminarResultado(int id) async {
    final confirmar = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("Eliminar resultado"),
        content: const Text("¿Seguro que desea eliminar este resultado?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text("Cancelar"),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text("Eliminar"),
          ),
        ],
      ),
    );

    if (confirmar == true) {
      try {
        await ApiService().deleteResultado(id);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("✅ Resultado eliminado")),
        );
        setState(() {
          _loadResultados();
        });
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("❌ Error al eliminar: $e")),
        );
      }
    }
  }
  */

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Resultados"),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      body: FutureBuilder<List<Resultado>>(
        future: _futureResultados,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(
              child: Text("❌ Error: ${snapshot.error}"),
            );
          }

          final resultados = snapshot.data ?? [];

          if (resultados.isEmpty) {
            return const Center(
              child: Text(
                "⚽ No hay resultados aún",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            );
          }

          return ListView.builder(
            itemCount: resultados.length,
            itemBuilder: (context, index) {
              final r = resultados[index];
              final partidoNombre = _nombrePartidoById(r.partidoId);
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                elevation: 3,
                child: ListTile(
                  leading:
                      const Icon(Icons.sports_soccer, color: Colors.deepPurple),
                  title: Text(partidoNombre),
                  subtitle: Text(
                    "Goles Local: ${r.golesLocal}  •  Goles Visitante: ${r.golesVisitante}",
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon:
                            const Icon(Icons.edit, color: Colors.deepPurple),
                        onPressed: () => _abrirFormulario(resultado: r),
                      ),
                      // 🔴 Botón de eliminar oculto temporalmente
                      /*
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.redAccent),
                        onPressed: () => _eliminarResultado(r.id!),
                      ),
                      */
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.deepPurple,
        onPressed: () => _abrirFormulario(),
        child: const Icon(Icons.add),
      ),
    );
  }
}
