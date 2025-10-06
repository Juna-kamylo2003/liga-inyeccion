import 'package:flutter/material.dart';
import '../../models/partido.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';
import 'partido_form.dart';

class PartidosScreen extends StatefulWidget {
  const PartidosScreen({super.key});

  @override
  State<PartidosScreen> createState() => _PartidosScreenState();
}

class _PartidosScreenState extends State<PartidosScreen> {
  final ApiService api = ApiService();
  List<Partido> partidos = [];
  Map<int, Equipo> equiposMap = {};
  bool loading = true;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final partidosList = await api.getPartidos();
      final equiposList = await api.getEquipos();
      if (!mounted) return;

      setState(() {
        partidos = partidosList;
        equiposMap = {for (var e in equiposList) e.id!: e};
        loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => loading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error cargando partidos: $e')),
      );
    }
  }

  Future<void> _delete(int id) async {
    try {
      await api.deletePartido(id);
      if (!mounted) return;
      await _loadData();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('🗑️ Partido eliminado')),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error eliminando partido: $e')),
      );
    }
  }

  void _openForm({Partido? partido}) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => PartidoForm(partido: partido),
      ),
    );

    if (result == true && mounted) {
      _loadData();
    }
  }

  // 🔹 Función para obtener el nombre del equipo
  String _getNombreEquipo(int? id) {
    final equipo = equiposMap[id];
    return equipo?.nombre ?? "-";
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("📅 Partidos"),
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _openForm(),
        backgroundColor: Colors.green,
        child: const Icon(Icons.add),
      ),
      body: partidos.isEmpty
          ? const Center(
              child: Text("⚠️ No hay partidos programados"),
            )
          : RefreshIndicator(
              onRefresh: _loadData,
              child: ListView.builder(
                padding: const EdgeInsets.all(12),
                itemCount: partidos.length,
                itemBuilder: (context, i) {
                  final p = partidos[i];
                  final local = _getNombreEquipo(p.equipoLocalId);
                  final visitante = _getNombreEquipo(p.equipoVisitanteId);
                  final fecha = DateTime.tryParse(p.fecha);

                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 3,
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  "$local 🆚 $visitante",
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              PopupMenuButton<String>(
                                offset: const Offset(0, 40),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                onSelected: (val) {
                                  if (val == 'edit') {
                                    _openForm(partido: p);
                                  } else if (val == 'delete') {
                                    _delete(p.id!);
                                  }
                                },
                                itemBuilder: (context) => [
                                  const PopupMenuItem(
                                    value: 'edit',
                                    child: Row(
                                      children: [
                                        Icon(Icons.edit, color: Colors.blue),
                                        SizedBox(width: 8),
                                        Text("Editar"),
                                      ],
                                    ),
                                  ),
                                  const PopupMenuItem(
                                    value: 'delete',
                                    child: Row(
                                      children: [
                                        Icon(Icons.delete, color: Colors.red),
                                        SizedBox(width: 8),
                                        Text("Eliminar"),
                                      ],
                                    ),
                                  ),
                                ],
                              )
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              const Icon(Icons.calendar_today,
                                  color: Colors.grey, size: 18),
                              const SizedBox(width: 6),
                              Text(
                                fecha != null
                                    ? "${fecha.day}/${fecha.month}/${fecha.year} "
                                        "${fecha.hour}:${fecha.minute.toString().padLeft(2, '0')}"
                                    : p.fecha,
                                style: const TextStyle(
                                  color: Colors.black54,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
    );
  }
}
