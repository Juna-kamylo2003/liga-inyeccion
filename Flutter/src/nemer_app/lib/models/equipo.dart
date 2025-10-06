class Equipo {
  final int? id;
  final String nombre;
  final String ciudad;
  final int? temporadaId;

  Equipo({
    this.id,
    required this.nombre,
    required this.ciudad,
    this.temporadaId,
  });

  factory Equipo.fromJson(Map<String, dynamic> j) => Equipo(
        id: j['id'] is int ? j['id'] : int.tryParse(j['id']?.toString() ?? '0'),
        nombre: j['nombre']?.toString() ?? 'Sin nombre',
        ciudad: j['ciudad']?.toString() ?? 'Sin ciudad',
        temporadaId: j['temporada_id'] is int
            ? j['temporada_id']
            : int.tryParse(j['temporada_id']?.toString() ?? '0'),
      );

  Map<String, dynamic> toJson({bool isUpdate = false}) {
    final data = <String, dynamic>{
      'nombre': nombre,
      'ciudad': ciudad,
    };

    if (isUpdate && id != null) {
      data['id'] = id;
    }

    if (temporadaId != null) {
      data['temporada_id'] = temporadaId;
    }

    return data;
  }
}
