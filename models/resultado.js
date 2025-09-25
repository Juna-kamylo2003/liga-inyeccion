'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un resultado pertenece a un partido
      Resultado.belongsTo(models.Partido, { foreignKey: 'partido_id' });
    }
  }
  Resultado.init({
    partido_id: DataTypes.INTEGER,
    goles_local: DataTypes.INTEGER,
    goles_visitante: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resultado',
    timestamps: true
  });
  return Resultado;
};