import 'package:flutter/material.dart';
import '../../models/partido.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class PartidoForm extends StatefulWidget {
  final Partido? partido;

  const PartidoForm({super.key, this.partido});

  @override
  State<PartidoForm> createState() => _PartidoFormState();
}

class _PartidoFormState extends State<PartidoForm> {
  final ApiService api = ApiService();
  final _formKey = GlobalKey<FormState>();

  List<Equipo> equipos = [];
  int? equipoLocalId;
  int? equipoVisitanteId;
  DateTime? fecha;

  @override
  void initState() {
    super.initState();
    _loadEquipos();

    if (widget.partido != null) {
      equipoLocalId = widget.partido!.equipoLocalId;
      equipoVisitanteId = widget.partido!.equipoVisitanteId;
      fecha = DateTime.tryParse(widget.partido!.fecha);
    }
  }

  Future<void> _loadEquipos() async {
    try {
      final lista = await api.getEquipos();
      if (mounted) {
        setState(() {
          equipos = lista;

          // Validamos IDs al cargar
          if (!equipos.any((e) => e.id == equipoLocalId)) {
            equipoLocalId = null;
          }
          if (!equipos.any((e) => e.id == equipoVisitanteId)) {
            equipoVisitanteId = null;
          }
        });
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error cargando equipos: $e")),
      );
    }
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate() ||
        equipoLocalId == null ||
        equipoVisitanteId == null ||
        fecha == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("⚠️ Debes completar todos los campos")),
      );
      return;
    }

    if (equipoLocalId == equipoVisitanteId) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("⚠️ Los equipos no pueden ser iguales")),
      );
      return;
    }

    final partido = Partido(
      id: widget.partido?.id,
      fecha: fecha!.toIso8601String(),
      equipoLocalId: equipoLocalId!,
      equipoVisitanteId: equipoVisitanteId!,
      temporadaId: 1, // 👈 lo dejamos fijo por ahora
    );

    // 🔎 Debug: ver qué se envía
    print("📤 Guardando partido: ${partido.toJson()}");

    try {
      if (widget.partido == null) {
        await api.createPartido(partido);
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("✅ Partido creado")),
        );
      } else {
        await api.updatePartido(widget.partido!.id!, partido);
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("✅ Partido actualizado")),
        );
      }

      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error guardando partido: $e")),
      );
    }
  }

  Future<void> _pickFecha() async {
    final fechaSel = await showDatePicker(
      context: context,
      initialDate: fecha ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );

    if (fechaSel == null) return;

    final horaSel = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.fromDateTime(fecha ?? DateTime.now()),
    );

    if (horaSel != null) {
      setState(() {
        fecha = DateTime(
          fechaSel.year,
          fechaSel.month,
          fechaSel.day,
          horaSel.hour,
          horaSel.minute,
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.partido == null
            ? "➕ Programar Partido"
            : "✏️ Editar Partido"),
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: equipos.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : Form(
                key: _formKey,
                child: Column(
                  children: [
                    // Dropdown equipo local
                    DropdownButtonFormField<int>(
                      value: equipos.any((e) => e.id == equipoLocalId)
                          ? equipoLocalId
                          : null,
                      items: equipos.map((e) {
                        return DropdownMenuItem(
                          value: e.id,
                          child: Text(e.nombre),
                        );
                      }).toList(),
                      onChanged: (val) =>
                          setState(() => equipoLocalId = val),
                      decoration: const InputDecoration(
                        labelText: "Equipo Local",
                        prefixIcon:
                            Icon(Icons.sports_soccer, color: Colors.blue),
                      ),
                      validator: (val) =>
                          val == null ? "Seleccione el equipo local" : null,
                    ),
                    const SizedBox(height: 16),

                    // Dropdown equipo visitante
                    DropdownButtonFormField<int>(
                      value: equipos.any((e) => e.id == equipoVisitanteId)
                          ? equipoVisitanteId
                          : null,
                      items: equipos.map((e) {
                        return DropdownMenuItem(
                          value: e.id,
                          child: Text(e.nombre),
                        );
                      }).toList(),
                      onChanged: (val) =>
                          setState(() => equipoVisitanteId = val),
                      decoration: const InputDecoration(
                        labelText: "Equipo Visitante",
                        prefixIcon:
                            Icon(Icons.sports_soccer, color: Colors.red),
                      ),
                      validator: (val) =>
                          val == null ? "Seleccione el equipo visitante" : null,
                    ),
                    const SizedBox(height: 16),

                    // Selección de fecha y hora
                    InkWell(
                      onTap: _pickFecha,
                      child: InputDecorator(
                        decoration: const InputDecoration(
                          labelText: "Fecha del Partido",
                          prefixIcon: Icon(Icons.calendar_today),
                        ),
                        child: Text(
                          fecha != null
                              ? "${fecha!.day}/${fecha!.month}/${fecha!.year} "
                                  "${fecha!.hour}:${fecha!.minute.toString().padLeft(2, '0')}"
                              : "Seleccione la fecha",
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Botón guardar
                    ElevatedButton.icon(
                      onPressed: _save,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 40, vertical: 14),
                      ),
                      icon: const Icon(Icons.check),
                      label: const Text("Guardar Partido"),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
