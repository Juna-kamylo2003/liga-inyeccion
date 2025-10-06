import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../main.dart';

class UsuarioScreen extends StatelessWidget {
  final String nombre;
  final String correo;

  const UsuarioScreen({
    super.key,
    required this.nombre,
    required this.correo,
  });

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<MyAppState>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil de Usuario'),
        backgroundColor: Colors.blueAccent,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => appState.logout(context),
          ),
        ],
      ),
      body: Center(
        child: Card(
          elevation: 6,
          margin: const EdgeInsets.all(30),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.account_circle,
                    size: 100, color: Colors.blueAccent),
                const SizedBox(height: 15),
                Text(
                  appState.nombre ?? nombre,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  appState.correo ?? correo,
                  style: const TextStyle(fontSize: 18, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
