import 'package:flutter/material.dart';
import '../../models/resultado.dart';
import '../../models/partido.dart';
import '../../models/equipo.dart';
import '../../services/api_service.dart';

class ResultadoForm extends StatefulWidget {
  final Resultado? resultado; // ✅ permite editar o crear

  const ResultadoForm({super.key, this.resultado});

  @override
  State<ResultadoForm> createState() => _ResultadoFormState();
}

class _ResultadoFormState extends State<ResultadoForm> {
  final _formKey = GlobalKey<FormState>();
  int? _partidoId;
  int? _golesLocal;
  int? _golesVisitante;

  List<Partido> _partidos = [];
  List<Equipo> _equipos = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadData();

    // ✅ Si se pasa un resultado para editar, cargar sus datos
    if (widget.resultado != null) {
      _partidoId = widget.resultado!.partidoId;
      _golesLocal = widget.resultado!.golesLocal;
      _golesVisitante = widget.resultado!.golesVisitante;
    }
  }

  Future<void> _loadData() async {
    setState(() => _loading = true);
    try {
      final partidos = await ApiService().getPartidos();
      final equipos = await ApiService().getEquipos();
      if (!mounted) return;
      setState(() {
        _partidos = partidos;
        _equipos = equipos;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _loading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error cargando datos: $e')),
      );
    }
  }

  String _nombreEquipoById(int? id) {
    if (id == null) return '---';
    final eq = _equipos.firstWhere(
      (e) => e.id == id,
      orElse: () => Equipo(id: 0, nombre: 'Equipo no registrado', ciudad: ''),
    );
    return eq.nombre;
  }

  Future<void> _guardarResultado() async {
    if (!_formKey.currentState!.validate()) return;

    if (_partidoId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Seleccione un partido')),
      );
      return;
    }

    if (_golesLocal == null || _golesVisitante == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Ingrese goles para ambos equipos')),
      );
      return;
    }

    try {
      final resultado = Resultado(
        partidoId: _partidoId!,
        golesLocal: _golesLocal!,
        golesVisitante: _golesVisitante!,
      );

      // ✅ si existe, editar; si no, crear
      if (widget.resultado != null && widget.resultado!.id != null) {
        await ApiService().updateResultado(widget.resultado!.id!, resultado);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Resultado actualizado correctamente')),
        );
      } else {
        await ApiService().createResultado(resultado);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Resultado guardado correctamente')),
        );
      }

      if (!mounted) return;
      Navigator.pop(context, true);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error al guardar resultado: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.resultado == null
            ? "Registrar Resultado"
            : "Editar Resultado"),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: _partidos.isEmpty
                  ? Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'No hay partidos programados.',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton.icon(
                          onPressed: _loadData,
                          icon: const Icon(Icons.refresh),
                          label: const Text('Actualizar'),
                        ),
                      ],
                    )
                  : Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          DropdownButtonFormField<int>(
                            decoration: const InputDecoration(
                              labelText: "Partido",
                              border: OutlineInputBorder(),
                            ),
                            value: _partidoId,
                            items: _partidos.map((p) {
                              final local = _nombreEquipoById(p.equipoLocalId);
                              final visitante = _nombreEquipoById(p.equipoVisitanteId);
                              return DropdownMenuItem<int>(
                                value: p.id,
                                child: Text('$local vs $visitante'),
                              );
                            }).toList(),
                            onChanged: (value) => setState(() => _partidoId = value),
                            validator: (value) =>
                                value == null ? 'Seleccione un partido' : null,
                          ),
                          const SizedBox(height: 16),
                          TextFormField(
                            initialValue:
                                _golesLocal != null ? _golesLocal.toString() : '',
                            decoration: const InputDecoration(
                              labelText: "Goles Local",
                              border: OutlineInputBorder(),
                            ),
                            keyboardType: TextInputType.number,
                            onChanged: (val) =>
                                _golesLocal = int.tryParse(val ?? ''),
                            validator: (val) =>
                                val == null || val.isEmpty ? 'Ingrese goles' : null,
                          ),
                          const SizedBox(height: 16),
                          TextFormField(
                            initialValue: _golesVisitante != null
                                ? _golesVisitante.toString()
                                : '',
                            decoration: const InputDecoration(
                              labelText: "Goles Visitante",
                              border: OutlineInputBorder(),
                            ),
                            keyboardType: TextInputType.number,
                            onChanged: (val) =>
                                _golesVisitante = int.tryParse(val ?? ''),
                            validator: (val) =>
                                val == null || val.isEmpty ? 'Ingrese goles' : null,
                          ),
                          const SizedBox(height: 24),
                          ElevatedButton.icon(
                            onPressed: _guardarResultado,
                            icon: const Icon(Icons.save),
                            label: Text(widget.resultado == null
                                ? "Guardar Resultado"
                                : "Actualizar Resultado"),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.deepPurple,
                              minimumSize: const Size(double.infinity, 48),
                            ),
                          ),
                        ],
                      ),
                    ),
            ),
    );
  }
}
