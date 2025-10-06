import 'package:flutter/material.dart';
import '../../models/liga.dart';
import '../../services/api_service.dart';
import 'liga_form.dart';

class LigasScreen extends StatefulWidget {
  const LigasScreen({super.key});

  @override
  State<LigasScreen> createState() => _LigasScreenState();
}

class _LigasScreenState extends State<LigasScreen> {
  final ApiService api = ApiService();
  late Future<List<Liga>> _ligasFuture;

  @override
  void initState() {
    super.initState();
    _ligasFuture = api.getLigas(); // ✅ corregido (antes: fetchLigas)
  }

  void _refresh() {
    setState(() {
      _ligasFuture = api.getLigas(); // ✅ corregido (antes: fetchLigas)
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text("🏆 Ligas"),
        centerTitle: true,
        elevation: 4,
        backgroundColor: Colors.deepPurple,
      ),
      body: FutureBuilder<List<Liga>>(
        future: _ligasFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: Colors.deepPurple),
            );
          } else if (snapshot.hasError) {
            return Center(child: Text("❌ Error: ${snapshot.error}"));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(
              child: Text(
                "⚽ No hay ligas registradas aún",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            );
          }

          final ligas = snapshot.data!;
          return ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: ligas.length,
            itemBuilder: (context, index) {
              final liga = ligas[index];
              return AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  elevation: 4,
                  shadowColor: Colors.deepPurpleAccent.withOpacity(0.3),
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  child: ListTile(
                    contentPadding:
                        const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    leading: CircleAvatar(
                      backgroundColor: Colors.deepPurple.shade100,
                      child: const Icon(Icons.emoji_events, color: Colors.deepPurple),
                    ),
                    title: Text(
                      liga.nombre,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                    subtitle: Text(
                      "País: ${liga.pais}\n📅 ${liga.creadaEn.split('T')[0]}",
                      style: const TextStyle(fontSize: 14, color: Colors.black54),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon:
                              const Icon(Icons.edit, color: Colors.blueAccent),
                          onPressed: () async {
                            await Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => LigaForm(liga: liga),
                              ),
                            );
                            _refresh();
                          },
                        ),
                        IconButton(
                          icon:
                              const Icon(Icons.delete, color: Colors.redAccent),
                          onPressed: () async {
                            final confirm = await showDialog(
                              context: context,
                              builder: (context) => AlertDialog(
                                title: const Text("Eliminar liga"),
                                content: Text(
                                    "¿Seguro que deseas eliminar \"${liga.nombre}\"?"),
                                actions: [
                                  TextButton(
                                    onPressed: () =>
                                        Navigator.pop(context, false),
                                    child: const Text("Cancelar"),
                                  ),
                                  ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.redAccent,
                                    ),
                                    onPressed: () =>
                                        Navigator.pop(context, true),
                                    child: const Text("Eliminar"),
                                  ),
                                ],
                              ),
                            );

                            if (confirm == true) {
                              await api.deleteLiga(liga.id);
                              _refresh();
                            }
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: Colors.deepPurple,
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const LigaForm()),
          );
          _refresh();
        },
        icon: const Icon(Icons.add),
        label: const Text("Agregar Liga"),
      ),
    );
  }
}
