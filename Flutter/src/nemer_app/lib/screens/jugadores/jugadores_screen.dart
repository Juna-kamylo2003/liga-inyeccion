import 'package:flutter/material.dart';
import '../../models/jugador.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class JugadoresScreen extends StatefulWidget {
  const JugadoresScreen({super.key});

  @override
  State<JugadoresScreen> createState() => _JugadoresScreenState();
}

class _JugadoresScreenState extends State<JugadoresScreen> {
  List<Jugador> jugadores = [];
  List<Equipo> equipos = [];
  bool loading = true;
  final api = ApiService();

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    setState(() => loading = true);
    try {
      final fetchedJugadores = await api.getJugadores();
      final fetchedEquipos = await api.getEquipos();
      setState(() {
        jugadores = fetchedJugadores;
        equipos = fetchedEquipos;
        loading = false;
      });
    } catch (e) {
      setState(() => loading = false);
      print("Error al traer datos: $e");
    }
  }

  String getNombreEquipo(int equipoId) {
    final equipo = equipos.firstWhere(
      (e) => e.id == equipoId,
      orElse: () => Equipo(id: 0, nombre: "Sin equipo", ciudad: ''),
    );
    return equipo.nombre;
  }

  Future<void> agregarJugador() async {
    final newJugador = await showDialog<Jugador>(
      context: context,
      builder: (context) => JugadorFormDialog(equipos: equipos),
    );
    if (newJugador != null) {
      await api.createJugador(newJugador);
      fetchData();
    }
  }

  Future<void> editarJugador(Jugador j) async {
    final updatedJugador = await showDialog<Jugador>(
      context: context,
      builder: (context) => JugadorFormDialog(jugador: j, equipos: equipos),
    );
    if (updatedJugador != null) {
      await api.updateJugador(j.id, updatedJugador);
      fetchData();
    }
  }

  Future<void> eliminarJugador(Jugador j) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Eliminar jugador"),
        content: Text("¿Seguro que quieres eliminar a ${j.nombre}?"),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text("Cancelar")),
          TextButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text("Eliminar", style: TextStyle(color: Colors.red))),
        ],
      ),
    );
    if (confirm == true) {
      await api.deleteJugador(j.id);
      fetchData();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade200,
      appBar: AppBar(
        title: const Text('Gestión de Jugadores'),
        backgroundColor: Colors.deepPurple,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: agregarJugador,
        backgroundColor: Colors.deepPurple,
        child: const Icon(Icons.add),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : jugadores.isEmpty
              ? const Center(
                  child: Text(
                    "No hay jugadores aún",
                    style: TextStyle(color: Colors.black54, fontSize: 18),
                  ),
                )
              : ListView.separated(
                  padding: const EdgeInsets.all(12),
                  itemCount: jugadores.length,
                  separatorBuilder: (_, __) => const Divider(),
                  itemBuilder: (context, index) {
                    final j = jugadores[index];
                    return Card(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12)),
                      elevation: 4,
                      color: Colors.white,
                      child: ListTile(
                        leading: const CircleAvatar(
                          backgroundColor: Colors.deepPurple,
                          child: Icon(Icons.person, color: Colors.white),
                        ),
                        title: Text(
                          j.nombre,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        subtitle: Text(
                          "Posición: ${j.posicion}\nEdad: ${j.edad}\nEquipo: ${getNombreEquipo(j.equipoId)}",
                        ),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit, color: Colors.blue),
                              onPressed: () => editarJugador(j),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => eliminarJugador(j),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}

// =======================
// Formulario de Jugador
// =======================
class JugadorFormDialog extends StatefulWidget {
  final Jugador? jugador;
  final List<Equipo> equipos;
  const JugadorFormDialog({super.key, this.jugador, required this.equipos});

  @override
  State<JugadorFormDialog> createState() => _JugadorFormDialogState();
}

class _JugadorFormDialogState extends State<JugadorFormDialog> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController nombreController;
  late TextEditingController posicionController;
  late TextEditingController edadController;
  int? selectedEquipoId;

  @override
  void initState() {
    super.initState();
    nombreController =
        TextEditingController(text: widget.jugador?.nombre ?? "");
    posicionController =
        TextEditingController(text: widget.jugador?.posicion ?? "");
    edadController =
        TextEditingController(text: widget.jugador?.edad.toString() ?? "");
    selectedEquipoId = widget.jugador?.equipoId ??
        (widget.equipos.isNotEmpty ? widget.equipos[0].id : null);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: Text(widget.jugador == null ? "Agregar Jugador" : "Editar Jugador"),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: nombreController,
                decoration: const InputDecoration(labelText: "Nombre"),
                validator: (v) => v == null || v.isEmpty ? "Requerido" : null,
              ),
              TextFormField(
                controller: posicionController,
                decoration: const InputDecoration(labelText: "Posición"),
                validator: (v) => v == null || v.isEmpty ? "Requerido" : null,
              ),
              TextFormField(
                controller: edadController,
                decoration: const InputDecoration(labelText: "Edad"),
                keyboardType: TextInputType.number,
                validator: (v) => v == null || v.isEmpty ? "Requerido" : null,
              ),
              DropdownButtonFormField<int>(
                value: selectedEquipoId,
                decoration: const InputDecoration(labelText: "Equipo"),
                items: widget.equipos
                    .map((e) =>
                        DropdownMenuItem(value: e.id, child: Text(e.nombre)))
                    .toList(),
                onChanged: (val) => setState(() => selectedEquipoId = val),
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancelar")),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurple,
          ),
          onPressed: () {
            if (_formKey.currentState!.validate() && selectedEquipoId != null) {
              final j = Jugador(
                id: widget.jugador?.id ?? 0, // si es nuevo, id = 0
                nombre: nombreController.text,
                posicion: posicionController.text,
                edad: int.parse(edadController.text),
                equipoId: selectedEquipoId!,
              );
              Navigator.pop(context, j);
            }
          },
          child: const Text("Guardar"),
        )
      ],
    );
  }
}
