class Partido {
  final int? id;
  final String fecha;
  final int equipoLocalId;
  final int equipoVisitanteId;
  final int temporadaId;

  Partido({
    this.id,
    required this.fecha,
    required this.equipoLocalId,
    required this.equipoVisitanteId,
    required this.temporadaId,
  });

  factory Partido.fromJson(Map<String, dynamic> json) {
    return Partido(
      id: json['id'],
      fecha: json['fecha'] ?? '',
      // 👇 aceptar tanto snake_case como camelCase
      equipoLocalId: json['equipo_local'] ?? json['equipoLocalId'] ?? 0,
      equipoVisitanteId: json['equipo_visitante'] ?? json['equipoVisitanteId'] ?? 0,
      temporadaId: json['temporada_id'] ?? json['temporadaId'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "fecha": fecha,
      // 👇 enviamos en ambos formatos para que el backend lo entienda
      "equipo_local": equipoLocalId,
      "equipo_visitante": equipoVisitanteId,
      "temporada_id": temporadaId,
      "equipoLocalId": equipoLocalId,
      "equipoVisitanteId": equipoVisitanteId,
      "temporadaId": temporadaId,
    };
  }
}
