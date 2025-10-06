import 'package:flutter/material.dart';
import '../../models/jugador.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class JugadorDialog extends StatefulWidget {
  final Jugador? jugador;
  final Function(Jugador) onSave;

  const JugadorDialog({Key? key, this.jugador, required this.onSave}) : super(key: key);

  @override
  _JugadorDialogState createState() => _JugadorDialogState();
}

class _JugadorDialogState extends State<JugadorDialog> {
  final _nombreCtrl = TextEditingController();
  final _posicionCtrl = TextEditingController();
  double _edad = 18;
  int? selectedEquipoId; // <-- guardamos solo el id del equipo
  late Future<List<Equipo>> _equiposFuture;

  @override
  void initState() {
    super.initState();
    _equiposFuture = ApiService().getEquipos();

    if (widget.jugador != null) {
      _nombreCtrl.text = widget.jugador!.nombre;
      _posicionCtrl.text = widget.jugador!.posicion;
      _edad = widget.jugador!.edad.toDouble();
      selectedEquipoId = widget.jugador!.equipoId; // preseleccionamos por id
    }
  }

  @override
  void dispose() {
    _nombreCtrl.dispose();
    _posicionCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.jugador == null ? "Agregar Jugador" : "Editar Jugador"),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _nombreCtrl,
              decoration: const InputDecoration(labelText: "Nombre"),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _posicionCtrl,
              decoration: const InputDecoration(labelText: "Posición"),
            ),
            const SizedBox(height: 12),
            Text("Edad: ${_edad.toInt()}"),
            Slider(
              min: 10,
              max: 40,
              divisions: 30,
              value: _edad,
              label: _edad.toInt().toString(),
              onChanged: (val) {
                setState(() => _edad = val);
              },
            ),
            const SizedBox(height: 12),
            FutureBuilder<List<Equipo>>(
              future: _equiposFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Center(child: CircularProgressIndicator()),
                  );
                } else if (snapshot.hasError) {
                  return const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Text("Error al cargar equipos"),
                  );
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Text("No hay equipos disponibles"),
                  );
                } else {
                  final equipos = snapshot.data!
                      .where((e) => e.id != null) // filtramos por seguridad
                      .toList();

                  // Si no hay selección y hay equipos, preseleccionamos el primero
                  if (selectedEquipoId == null && equipos.isNotEmpty) {
                    selectedEquipoId = equipos.first.id;
                  }

                  return DropdownButtonFormField<int>(
                    value: selectedEquipoId,
                    decoration: const InputDecoration(labelText: "Equipo"),
                    items: equipos
                        .map((eq) => DropdownMenuItem<int>(
                              value: eq.id!, // ya filtramos los nulos
                              child: Text(eq.nombre),
                            ))
                        .toList(),
                    onChanged: (val) => setState(() => selectedEquipoId = val),
                    validator: (v) => v == null ? "Selecciona un equipo" : null,
                  );
                }
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          child: const Text("Cancelar"),
          onPressed: () => Navigator.pop(context),
        ),
        ElevatedButton(
          child: const Text("Guardar"),
          onPressed: () {
            // validaciones simples
            if (_nombreCtrl.text.trim().isEmpty ||
                _posicionCtrl.text.trim().isEmpty ||
                selectedEquipoId == null) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Completa todos los campos")),
              );
              return;
            }

            final jugador = Jugador(
              id: widget.jugador?.id ?? 0, // si es nuevo, id = 0 (API lo genera)
              nombre: _nombreCtrl.text.trim(),
              posicion: _posicionCtrl.text.trim(),
              edad: _edad.toInt(),
              equipoId: selectedEquipoId!, // <-- aquí ya es int (no nullable)
            );

            widget.onSave(jugador);
            Navigator.pop(context);
          },
        ),
      ],
    );
  }
}
