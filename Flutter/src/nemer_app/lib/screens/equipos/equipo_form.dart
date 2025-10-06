import 'package:flutter/material.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class EquipoForm extends StatefulWidget {
  final Equipo? equipo; // null = crear, no null = editar

  const EquipoForm({Key? key, this.equipo}) : super(key: key);

  @override
  State<EquipoForm> createState() => _EquipoFormState();
}

class _EquipoFormState extends State<EquipoForm> {
  final ApiService api = ApiService();
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _nombreController;
  late TextEditingController _ciudadController;
  late int temporadaId;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    _nombreController = TextEditingController(text: widget.equipo?.nombre ?? '');
    _ciudadController = TextEditingController(text: widget.equipo?.ciudad ?? '');
    temporadaId = widget.equipo?.temporadaId ?? 1; // valor por defecto
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _ciudadController.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;

    final equipo = Equipo(
      id: widget.equipo?.id,
      nombre: _nombreController.text.trim(),
      ciudad: _ciudadController.text.trim(),
      temporadaId: temporadaId,
    );

    setState(() => loading = true);

    try {
      if (widget.equipo == null) {
        await api.createEquipo(equipo);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Equipo creado correctamente')),
        );
      } else {
        await api.updateEquipo(widget.equipo!.id!, equipo);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Equipo actualizado correctamente')),
        );
      }
      Navigator.pop(context, true);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error al guardar: $e')),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.equipo != null ? '✏️ Editar Equipo' : '➕ Nuevo Equipo'),
        centerTitle: true,
        backgroundColor: Colors.blueAccent,
        elevation: 2,
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Card(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        // Nombre
                        TextFormField(
                          controller: _nombreController,
                          decoration: const InputDecoration(
                            labelText: 'Nombre del equipo',
                            prefixIcon: Icon(Icons.sports_soccer),
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) =>
                              value == null || value.trim().isEmpty
                                  ? 'El nombre es obligatorio'
                                  : null,
                        ),
                        const SizedBox(height: 16),

                        // Ciudad
                        TextFormField(
                          controller: _ciudadController,
                          decoration: const InputDecoration(
                            labelText: 'Ciudad',
                            prefixIcon: Icon(Icons.location_city),
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) =>
                              value == null || value.trim().isEmpty
                                  ? 'La ciudad es obligatoria'
                                  : null,
                        ),
                        const SizedBox(height: 16),

                        // Temporada (numérica por ahora)
                        TextFormField(
                          initialValue: temporadaId.toString(),
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Temporada ID',
                            prefixIcon: Icon(Icons.event),
                            border: OutlineInputBorder(),
                          ),
                          onChanged: (value) {
                            final val = int.tryParse(value);
                            if (val != null) temporadaId = val;
                          },
                        ),
                        const SizedBox(height: 24),

                        // Botón Guardar
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            icon: const Icon(Icons.save),
                            label: const Text("Guardar"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blueAccent,
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            onPressed: _save,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
    );
  }
}
