class Liga {
  final int id;
  final String nombre;
  final String pais;
  final String creadaEn;

  Liga({
    required this.id,
    required this.nombre,
    required this.pais,
    required this.creadaEn,
  });

  factory Liga.fromJson(Map<String, dynamic> json) {
    return Liga(
      id: json['id'] ?? 0,
      nombre: json['nombre'] ?? '',
      pais: json['pais'] ?? '',
      creadaEn: json['creada_en'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "nombre": nombre,
        "pais": pais,
        "creada_en": creadaEn,
      };
}
