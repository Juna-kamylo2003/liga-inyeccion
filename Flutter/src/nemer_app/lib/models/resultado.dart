class Resultado {
  final int? id;
  final int partidoId;
  final int golesLocal;
  final int golesVisitante;

  Resultado({
    this.id,
    required this.partidoId,
    required this.golesLocal,
    required this.golesVisitante,
  });

  factory Resultado.fromJson(Map<String, dynamic> json) {
    return Resultado(
      id: json['id'],
      partidoId: json['partido_id'] ?? json['partidoId'] ?? 0,
      golesLocal: json['goles_local'] ?? json['golesLocal'] ?? 0,
      golesVisitante: json['goles_visitante'] ?? json['golesVisitante'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "partido_id": partidoId,
      "goles_local": golesLocal,
      "goles_visitante": golesVisitante,
    };
  }
}

