'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un partido pertenece a una temporada
      Partido.belongsTo(models.Temporada, { foreignKey: 'temporadaId' });
      // Un partido tiene un equipo local
      Partido.belongsTo(models.Equipo, { foreignKey: 'equipoLocalId', as: 'EquipoLocal' });
      // Un partido tiene un equipo visitante
      Partido.belongsTo(models.Equipo, { foreignKey: 'equipoVisitanteId', as: 'EquipoVisitante' });
      // Un partido tiene un resultado
      Partido.hasOne(models.Resultado, { foreignKey: 'partido_id' });
    }
  }
  Partido.init({
    fecha: DataTypes.DATE,
    equipoLocalId: DataTypes.INTEGER,
    equipoVisitanteId: DataTypes.INTEGER,
    temporadaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partido',
    tableName: 'Partidos',
    timestamps: true
  });
  return Partido;
};