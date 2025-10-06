import 'package:flutter/material.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';
import 'equipo_form.dart';

class EquiposScreen extends StatefulWidget {
  const EquiposScreen({super.key});

  @override
  State<EquiposScreen> createState() => _EquiposScreenState();
}

class _EquiposScreenState extends State<EquiposScreen> {
  final api = ApiService();
  late Future<List<Equipo>> equipos;

  @override
  void initState() {
    super.initState();
    equipos = api.getEquipos();
  }

  Future<void> _refreshEquipos() async {
    setState(() {
      equipos = api.getEquipos();
    });
  }

  Future<void> _deleteEquipo(int id) async {
    try {
      await api.deleteEquipo(id);
      if (!mounted) return;

      // 🔥 Eliminamos de la lista en memoria para refrescar instantáneo
      setState(() {
        equipos = equipos.then((list) => list.where((e) => e.id != id).toList());
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("✅ Equipo eliminado")),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error al eliminar: $e")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text("⚽ Liga - Equipos"),
        centerTitle: true,
        elevation: 4,
        backgroundColor: Colors.blueAccent,
      ),
      body: FutureBuilder<List<Equipo>>(
        future: equipos,
        builder: (c, s) {
          if (s.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (s.hasError) {
            return Center(
              child: Text(
                "❌ Error: ${s.error}",
                style: const TextStyle(color: Colors.red, fontSize: 16),
              ),
            );
          } else if (!s.hasData || s.data!.isEmpty) {
            return const Center(
              child: Text(
                "📭 No hay equipos registrados",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              ),
            );
          }

          final list = s.data!;

          return RefreshIndicator(
            onRefresh: _refreshEquipos,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: list.length,
              itemBuilder: (_, i) {
                final equipo = list[i];
                return Card(
                  elevation: 4,
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(12),
                    leading: CircleAvatar(
                      backgroundColor: Colors.blueAccent,
                      child: const Icon(Icons.sports_soccer, color: Colors.white),
                    ),
                    title: Text(
                      equipo.nombre,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    subtitle: Text(
                      "🏙 Ciudad: ${equipo.ciudad}",
                      style: const TextStyle(fontSize: 14),
                    ),
                    trailing: PopupMenuButton<String>(
                      onSelected: (value) async {
                        if (value == 'edit') {
                          await Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => EquipoForm(equipo: equipo),
                            ),
                          );
                          _refreshEquipos();
                        } else if (value == 'delete') {
                          if (equipo.id != null) {
                            _deleteEquipo(equipo.id!);
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text("⚠️ No se puede eliminar: ID nulo"),
                              ),
                            );
                          }
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
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const EquipoForm()),
          );
          _refreshEquipos();
        },
        icon: const Icon(Icons.add),
        label: const Text("Nuevo Equipo"),
        backgroundColor: Colors.blueAccent,
      ),
    );
  }
}
