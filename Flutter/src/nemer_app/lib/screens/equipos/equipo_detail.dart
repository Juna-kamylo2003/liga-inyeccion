import 'package:flutter/material.dart';
import '../../models/equipo.dart';
import 'equipo_form.dart';

class EquipoDetail extends StatelessWidget {
  final Equipo equipo;

  const EquipoDetail({Key? key, required this.equipo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(equipo.nombre),
        elevation: 2,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Card(
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.sports_soccer,
                        size: 32, color: Colors.blue),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        equipo.nombre,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Icon(Icons.location_city, color: Colors.grey),
                    const SizedBox(width: 8),
                    Text(
                      equipo.ciudad,
                      style: const TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        icon: const Icon(Icons.edit),
        label: const Text("Editar"),
        onPressed: () async {
          final bool? updated = await Navigator.push<bool?>(
            context,
            MaterialPageRoute(
              builder: (c) => EquipoForm(equipo: equipo),
            ),
          );

          if (updated == true) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Equipo actualizado')),
            );
            if (Navigator.canPop(context)) Navigator.pop(context, true);
          }
        },
      ),
    );
  }
}
