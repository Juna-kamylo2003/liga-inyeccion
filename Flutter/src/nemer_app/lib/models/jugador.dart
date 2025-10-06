class Jugador {
  final int id;
  final String nombre;
  final String posicion;
  final int edad;
  final int equipoId;

  Jugador({
    required this.id,
    required this.nombre,
    required this.posicion,
    required this.edad,
    required this.equipoId,
  });

  factory Jugador.fromJson(Map<String, dynamic> json) {
    return Jugador(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? '',
      posicion: json['posicion'] ?? '',
      edad: json['edad'] ?? 0,
      equipoId: json['equipo_id'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "nombre": nombre,
      "posicion": posicion,
      "edad": edad,
      "equipo_id": equipoId,
    };
  }
}
