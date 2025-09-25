'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temporada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una temporada pertenece a una liga
      Temporada.belongsTo(models.Liga, { foreignKey: 'liga_id' });
      // Una temporada tiene muchos equipos
      Temporada.hasMany(models.Equipo, { foreignKey: 'temporada_id' });
      // Una temporada tiene muchos partidos
      Temporada.hasMany(models.Partido, { foreignKey: 'temporada_id' });
      // Una temporada tiene muchas posiciones
      Temporada.hasMany(models.TablaPosicione, { foreignKey: 'temporada_id' });
    }
  }
  Temporada.init({
    anio: DataTypes.INTEGER,
    liga_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Temporada',
    timestamps: true
  });
  return Temporada;
};