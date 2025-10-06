import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/equipo.dart';
import '../models/partido.dart';
import '../models/jugador.dart';
import '../models/usuario.dart';
import '../models/resultado.dart';
import '../models/liga.dart'; // 🔹 Nuevo modelo Liga

class ApiService {
  static const String baseUrl =
      "http://liga-inyeccion-env.eba-p3jydbcq.us-east-1.elasticbeanstalk.com/api";

  // ===========================
  // LIGAS
  // ===========================
  Future<List<Liga>> getLigas() async {
    final res = await http.get(Uri.parse("$baseUrl/ligas"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Liga.fromJson(e)).toList();
    }
    throw Exception('Error getLigas');
  }

  Future<Liga> createLiga(Liga l) async {
    final res = await http.post(
      Uri.parse("$baseUrl/ligas"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "nombre": l.nombre,
        "pais": l.pais,
        "creada_en": l.creadaEn,
      }),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      return Liga.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error createLiga');
  }

  Future<Liga> updateLiga(int id, Liga l) async {
    final res = await http.put(
      Uri.parse("$baseUrl/ligas/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "nombre": l.nombre,
        "pais": l.pais,
        "creada_en": l.creadaEn,
      }),
    );
    if (res.statusCode == 200) {
      return Liga.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updateLiga');
  }

  Future<void> deleteLiga(int id) async {
    final res = await http.delete(Uri.parse("$baseUrl/ligas/$id"));
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw Exception('Error deleteLiga (${res.statusCode})');
    }
  }

  // ===========================
  // EQUIPOS
  // ===========================
  Future<List<Equipo>> getEquipos() async {
    final res = await http.get(Uri.parse("$baseUrl/equipos"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Equipo.fromJson(e)).toList();
    }
    throw Exception('Error getEquipos');
  }

  Future<Equipo> createEquipo(Equipo e) async {
    final res = await http.post(
      Uri.parse("$baseUrl/equipos"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(e.toJson()),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      return Equipo.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error createEquipo');
  }

  Future<Equipo> updateEquipo(int id, Equipo e) async {
    final res = await http.put(
      Uri.parse("$baseUrl/equipos/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(e.toJson()),
    );
    if (res.statusCode == 200) {
      return Equipo.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updateEquipo');
  }

  Future<void> deleteEquipo(int id) async {
    final res = await http.delete(Uri.parse("$baseUrl/equipos/$id"));
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw Exception('Error deleteEquipo (${res.statusCode})');
    }
  }

  // ===========================
  // PARTIDOS
  // ===========================
  Future<List<Partido>> getPartidos() async {
    final res = await http.get(Uri.parse("$baseUrl/partidos"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Partido.fromJson(e)).toList();
    }
    throw Exception('Error getPartidos');
  }

  Future<Partido> createPartido(Partido p) async {
    final res = await http.post(
      Uri.parse("$baseUrl/partidos"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(p.toJson()),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      return Partido.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error createPartido');
  }

  Future<Partido> updatePartido(int id, Partido p) async {
    final res = await http.put(
      Uri.parse("$baseUrl/partidos/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(p.toJson()),
    );
    if (res.statusCode == 200) {
      return Partido.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updatePartido');
  }

  Future<void> deletePartido(int id) async {
    final res = await http.delete(Uri.parse("$baseUrl/partidos/$id"));
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw Exception('Error deletePartido (${res.statusCode})');
    }
  }

  // ===========================
  // JUGADORES
  // ===========================
  Future<List<Jugador>> getJugadores() async {
    final res = await http.get(Uri.parse("$baseUrl/jugadores"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Jugador.fromJson(e)).toList();
    }
    throw Exception('Error getJugadores');
  }

  Future<Jugador> createJugador(Jugador j) async {
    final res = await http.post(
      Uri.parse("$baseUrl/jugadores"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(j.toJson()),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      return Jugador.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error createJugador');
  }

  Future<Jugador> updateJugador(int id, Jugador j) async {
    final res = await http.put(
      Uri.parse("$baseUrl/jugadores/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(j.toJson()),
    );
    if (res.statusCode == 200) {
      return Jugador.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updateJugador');
  }

  Future<void> deleteJugador(int id) async {
    final res = await http.delete(Uri.parse("$baseUrl/jugadores/$id"));
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw Exception('Error deleteJugador (${res.statusCode})');
    }
  }

  // ===========================
  // USUARIOS
  // ===========================
  Future<List<Usuario>> getUsuarios() async {
    final res = await http.get(Uri.parse("$baseUrl/usuarios"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Usuario.fromJson(e)).toList();
    }
    throw Exception('Error getUsuarios');
  }

  Future<Usuario> createUsuario(Usuario u) async {
    final res = await http.post(
      Uri.parse("$baseUrl/usuarios"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(u.toJson()),
    );
    if (res.statusCode == 201 || res.statusCode == 200) {
      return Usuario.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error createUsuario');
  }

  Future<Usuario> updateUsuario(int id, Usuario u) async {
    final res = await http.put(
      Uri.parse("$baseUrl/usuarios/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(u.toJson()),
    );
    if (res.statusCode == 200) {
      return Usuario.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updateUsuario');
  }

  Future<void> deleteUsuario(int id) async {
    final res = await http.delete(Uri.parse("$baseUrl/usuarios/$id"));
    if (res.statusCode != 200 && res.statusCode != 204) {
      throw Exception('Error deleteUsuario (${res.statusCode})');
    }
  }

  // ===========================
  // RESULTADOS
  // ===========================
  Future<List<Resultado>> getResultados() async {
    final res = await http.get(Uri.parse("$baseUrl/resultados"));
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Resultado.fromJson(e)).toList();
    }
    throw Exception('Error getResultados');
  }

  Future<Resultado> createResultado(Resultado r) async {
    final res = await http.post(
      Uri.parse("$baseUrl/resultados"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "partido_id": r.partidoId,
        "goles_local": r.golesLocal,
        "goles_visitante": r.golesVisitante,
      }),
    );

    if (res.statusCode == 201 || res.statusCode == 200) {
      return Resultado.fromJson(jsonDecode(res.body));
    }
    throw Exception("Error createResultado (${res.statusCode}) - ${res.body}");
  }

  Future<Resultado> updateResultado(int id, Resultado r) async {
    final res = await http.put(
      Uri.parse("$baseUrl/resultados/$id"),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "partido_id": r.partidoId,
        "goles_local": r.golesLocal,
        "goles_visitante": r.golesVisitante,
      }),
    );
    if (res.statusCode == 200) {
      return Resultado.fromJson(jsonDecode(res.body));
    }
    throw Exception('Error updateResultado (${res.statusCode}) - ${res.body}');
  }

  Future<void> deleteResultado(int id) async {
    final url = Uri.parse("$baseUrl/resultados/$id");
    final res = await http.delete(url);

    print("🗑️ DELETE $url -> ${res.statusCode}");
    print("🔹 Response body: ${res.body}");

    if (res.statusCode == 200 || res.statusCode == 204 || res.statusCode == 202) {
      return;
    } else {
      throw Exception('Error deleteResultado (${res.statusCode}) - ${res.body}');
    }
  }

  // ===========================
  // LOGIN (con usuarios locales)
  // ===========================
  Future<Usuario?> login(String email, String password) async {
    try {
      final usuarios = await getUsuarios();
      final usuario = usuarios.firstWhere(
        (u) =>
            u.email.trim().toLowerCase() == email.trim().toLowerCase() &&
            u.password.trim() == password.trim(),
        orElse: () => Usuario(id: 0, nombre: '', email: '', password: ''),
      );

      if (usuario.id != 0) return usuario;
      return null;
    } catch (e) {
      print("❌ Error en login: $e");
      return null;
    }
  }
}
