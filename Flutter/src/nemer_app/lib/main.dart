import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// 🔹 Auth
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/auth/usuario_screen.dart';

// 🔹 Home
import 'home/home_screen.dart';

// 🔹 Equipos
import 'screens/equipos/equipos_screen.dart';
import 'screens/equipos/equipo_form.dart';
import 'screens/equipos/equipo_detail.dart';

// 🔹 Jugadores
import 'screens/jugadores/jugadores_screen.dart';

// 🔹 Partidos
import 'screens/partidos/partidos_screen.dart';
import 'screens/partidos/partido_form.dart';

// 🔹 Resultados
import 'screens/resultados/resultados_screen.dart';

// 🔹 Modelos
import 'models/equipo.dart'; // 👈 Importante para el tipo Equipo

void main() {
  runApp(const MyApp());
}

// ✅ Estado global (para mantener sesión activa)
class MyAppState extends ChangeNotifier {
  String? token;
  String? nombre;
  String? correo;

  void setUserData({
    required String t,
    required String n,
    required String c,
  }) {
    token = t;
    nombre = n;
    correo = c;
    notifyListeners();
  }

  void logout(BuildContext context) {
    token = null;
    nombre = null;
    correo = null;
    notifyListeners();
    Navigator.pushNamedAndRemoveUntil(context, '/login', (r) => false);
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => MyAppState(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Liga Deportiva',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color.fromARGB(255, 8, 162, 209),
          ),
        ),
        initialRoute: '/login',
        routes: {
          '/login': (c) => const LoginScreen(),
          '/register': (c) => const RegisterScreen(),
          '/home': (c) => const HomeScreen(),

          // 🔹 Equipos
          '/equipos': (c) => const EquiposScreen(),
          '/equipo_form': (c) => const EquipoForm(),

          // 🔹 Jugadores
          '/jugadores': (c) => const JugadoresScreen(),

          // 🔹 Partidos
          '/partidos': (c) => const PartidosScreen(),
          '/partido_form': (c) => const PartidoForm(),

          // 🔹 Resultados
          '/resultados': (c) => const ResultadosScreen(),

          // 🔹 Usuario (perfil dinámico)
          '/usuario': (c) {
            final appState = Provider.of<MyAppState>(c);
            return UsuarioScreen(
              nombre: appState.nombre ?? 'Sin nombre',
              correo: appState.correo ?? 'Sin correo',
            );
          },
        },

        // ✅ Ruta dinámica para ver detalles de un equipo
        onGenerateRoute: (settings) {
          if (settings.name == '/equipo_detail') {
            final equipo = settings.arguments as Equipo; // 👈 conversión segura
            return MaterialPageRoute(
              builder: (_) => EquipoDetail(equipo: equipo),
            );
          }
          return null;
        },
      ),
    );
  }
}
