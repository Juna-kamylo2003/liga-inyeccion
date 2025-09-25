'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un equipo pertenece a una liga
      Equipo.belongsTo(models.Liga, { foreignKey: 'liga_id' });
      // Un equipo tiene muchos jugadores
      Equipo.hasMany(models.Jugador, { foreignKey: 'equipo_id' });
      // Un equipo puede ser local en muchos partidos
      Equipo.hasMany(models.Partido, { foreignKey: 'equipoLocalId', as: 'PartidosLocal' });
      // Un equipo puede ser visitante en muchos partidos
      Equipo.hasMany(models.Partido, { foreignKey: 'equipoVisitanteId', as: 'PartidosVisitante' });
      // Un equipo tiene muchas posiciones
      Equipo.hasMany(models.TablaPosicione, { foreignKey: 'equipo_id' });
    }
  }
  Equipo.init({
    nombre: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    liga_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipo',
    tableName: 'Equipos',
    timestamps: true
  });
  return Equipo;
};