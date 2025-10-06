import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../main.dart';

// Importaciones de pantallas
import '../screens/jugadores/jugadores_screen.dart';
import '../screens/resultados/resultados_screen.dart';
import '../screens/auth/usuario_screen.dart';
import '../screens/tabla_posiciones/tabla_posiciones_screen.dart';
import '../screens/ligas/ligas_screen.dart'; // ✅ añadida

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // 🧍 Datos temporales (puedes reemplazarlos con datos del login)
    final String nombreUsuario = "Juan Pérez";
    final String correoUsuario = "juanperez@gmail.com";

    // Lista de secciones
    final List<Map<String, dynamic>> secciones = [
      {'titulo': 'Equipo', 'icono': Icons.group, 'ruta': '/equipos'},
      {'titulo': 'Jugador', 'icono': Icons.person, 'ruta': '/jugadores'},
      {'titulo': 'Liga', 'icono': Icons.emoji_events, 'ruta': '/ligas'},
      {'titulo': 'Partido', 'icono': Icons.sports_soccer, 'ruta': '/partidos'},
      {'titulo': 'Resultado', 'icono': Icons.score, 'ruta': '/resultados'},
      {'titulo': 'TablaPosiciones', 'icono': Icons.table_chart, 'ruta': '/tabla_posiciones'},
      {'titulo': 'Temporada', 'icono': Icons.calendar_today, 'ruta': '/temporadas'},
      {'titulo': 'Usuario', 'icono': Icons.person_outline, 'ruta': '/usuarios'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Liga Deportiva"),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      drawer: Drawer(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.deepPurple, Colors.blueAccent],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              DrawerHeader(
                decoration: const BoxDecoration(color: Colors.transparent),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    CircleAvatar(
                      radius: 35,
                      backgroundImage: AssetImage("assets/logo.png"),
                    ),
                    SizedBox(height: 10),
                    Text(
                      "Liga Deportiva",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "Bienvenido",
                      style: TextStyle(color: Colors.white70, fontSize: 14),
                    ),
                  ],
                ),
              ),
              _buildMenuItem(
                icon: Icons.sports_soccer,
                text: "Seleccionar equipo",
                onTap: () => Navigator.pushNamed(context, '/equipos'),
              ),
              const Divider(color: Colors.white54),
              _buildMenuItem(icon: Icons.emoji_events, text: "Competiciones", onTap: () {}),
              _buildMenuItem(icon: Icons.article, text: "Noticias", onTap: () {}),
              _buildMenuItem(icon: Icons.slow_motion_video, text: "Goles 3D", onTap: () {}),
              _buildMenuItem(icon: Icons.image, text: "Imágenes", onTap: () {}),
              _buildMenuItem(
                icon: Icons.calendar_today,
                text: "Partidos",
                onTap: () => Navigator.pushNamed(context, '/partidos'),
              ),
              const Divider(color: Colors.white54),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 12),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const [
                    Icon(Icons.facebook, color: Colors.white, size: 28),
                    Icon(Icons.camera_alt, color: Colors.white, size: 28),
                    Icon(Icons.video_library, color: Colors.white, size: 28),
                  ],
                ),
              ),
              const Divider(color: Colors.white54),
              _buildMenuItem(
                icon: Icons.logout,
                text: "Salir",
                onTap: () => Provider.of<MyAppState>(context, listen: false).logout(context),
              ),
            ],
          ),
        ),
      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.deepPurpleAccent, Colors.blueAccent],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: GridView.builder(
          itemCount: secciones.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            mainAxisSpacing: 18, // ✅ separa un poquito más las tarjetas
            crossAxisSpacing: 18,
            childAspectRatio: 1.15,
          ),
          itemBuilder: (context, index) {
            final seccion = secciones[index];

            return GestureDetector(
              onTap: () {
                if (seccion['titulo'] == 'Jugador') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const JugadoresScreen()),
                  );
                } else if (seccion['titulo'] == 'Resultado') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const ResultadosScreen()),
                  );
                } else if (seccion['titulo'] == 'TablaPosiciones') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const TablaPosicionesScreen()),
                  );
                } else if (seccion['titulo'] == 'Liga') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const LigasScreen()),
                  );
                } else if (seccion['titulo'] == 'Usuario') {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => UsuarioScreen(
                        nombre: nombreUsuario,
                        correo: correoUsuario,
                      ),
                    ),
                  );
                } else {
                  Navigator.pushNamed(context, seccion['ruta']);
                }
              },
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 4,
                      offset: Offset(2, 2),
                    )
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(seccion['icono'], size: 50, color: Colors.white),
                    const SizedBox(height: 10),
                    Text(
                      seccion['titulo'],
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  // ===============================
  // Drawer Item
  // ===============================
  static Widget _buildMenuItem({
    required IconData icon,
    required String text,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: Colors.white, size: 26),
      title: Text(
        text,
        style: const TextStyle(color: Colors.white, fontSize: 16),
      ),
      onTap: onTap,
      hoverColor: Colors.white24,
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
    );
  }
}
