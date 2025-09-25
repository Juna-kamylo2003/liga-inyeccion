'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TablaPosicione extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una posición pertenece a una temporada
      TablaPosicione.belongsTo(models.Temporada, { foreignKey: 'temporada_id' });
      // Una posición pertenece a un equipo
      TablaPosicione.belongsTo(models.Equipo, { foreignKey: 'equipo_id' });
    }
  }
  TablaPosicione.init({
    temporada_id: DataTypes.INTEGER,
    equipo_id: DataTypes.INTEGER,
    puntos: DataTypes.INTEGER,
    goles_a_favor: DataTypes.INTEGER,
    goles_en_contra: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TablaPosicione',
    timestamps: true
  });
  return TablaPosicione;
};