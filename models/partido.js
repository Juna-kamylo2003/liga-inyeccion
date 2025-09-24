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
      Partido.belongsTo(models.Temporada, { foreignKey: 'temporada_id' });
      // Un partido tiene un equipo local
      Partido.belongsTo(models.Equipo, { foreignKey: 'equipo_local', as: 'EquipoLocal' });
      // Un partido tiene un equipo visitante
      Partido.belongsTo(models.Equipo, { foreignKey: 'equipo_visitante', as: 'EquipoVisitante' });
      // Un partido tiene un resultado
      Partido.hasOne(models.Resultado, { foreignKey: 'partido_id' });
    }
  }
  Partido.init({
    fecha: DataTypes.DATE,
    equipo_local: DataTypes.INTEGER,
    equipo_visitante: DataTypes.INTEGER,
    temporada_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partido',
    timestamps: true
  });
  return Partido;
};