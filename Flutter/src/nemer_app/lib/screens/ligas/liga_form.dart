import 'package:flutter/material.dart';
import '../../models/liga.dart';
import '../../services/api_service.dart';

class LigaForm extends StatefulWidget {
  final Liga? liga;
  const LigaForm({super.key, this.liga});

  @override
  State<LigaForm> createState() => _LigaFormState();
}

class _LigaFormState extends State<LigaForm> {
  final _formKey = GlobalKey<FormState>();
  final ApiService api = ApiService();

  late TextEditingController _nombreController;
  late TextEditingController _paisController;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _nombreController = TextEditingController(text: widget.liga?.nombre ?? '');
    _paisController = TextEditingController(text: widget.liga?.pais ?? '');
  }

  @override
  void dispose() {
    _nombreController.dispose();
    _paisController.dispose();
    super.dispose();
  }

  Future<void> _guardar() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSaving = true);

    final liga = Liga(
      id: widget.liga?.id ?? 0,
      nombre: _nombreController.text.trim(),
      pais: _paisController.text.trim(),
      creadaEn: widget.liga?.creadaEn ?? DateTime.now().toIso8601String(),
    );

    try {
      if (widget.liga == null) {
        await api.createLiga(liga);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("✅ Liga creada con éxito")),
        );
      } else {
        await api.updateLiga(liga.id, liga);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("✅ Liga actualizada con éxito")),
        );
      }
      Navigator.pop(context);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error: $e")),
      );
    } finally {
      setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEdit = widget.liga != null;

    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text(isEdit ? "✏️ Editar Liga" : "🏆 Nueva Liga"),
        centerTitle: true,
        backgroundColor: Colors.deepPurple,
        elevation: 4,
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Card(
            elevation: 6,
            shadowColor: Colors.deepPurpleAccent.withOpacity(0.3),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextFormField(
                      controller: _nombreController,
                      decoration: InputDecoration(
                        labelText: "Nombre de la liga",
                        prefixIcon: const Icon(Icons.emoji_events, color: Colors.deepPurple),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                      validator: (v) => v!.isEmpty ? "Ingrese el nombre de la liga" : null,
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _paisController,
                      decoration: InputDecoration(
                        labelText: "País",
                        prefixIcon: const Icon(Icons.flag, color: Colors.deepPurple),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                      validator: (v) => v!.isEmpty ? "Ingrese el país" : null,
                    ),
                    const SizedBox(height: 30),
                    _isSaving
                        ? const CircularProgressIndicator(color: Colors.deepPurple)
                        : ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.deepPurple,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(15),
                              ),
                              padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 14),
                            ),
                            onPressed: _guardar,
                            icon: const Icon(Icons.save),
                            label: Text(isEdit ? "Actualizar Liga" : "Guardar Liga"),
                          ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
