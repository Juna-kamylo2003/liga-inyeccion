'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un jugador pertenece a un equipo
      Jugador.belongsTo(models.Equipo, { foreignKey: 'equipo_id' });
    }
  }
  Jugador.init({
    nombre: DataTypes.STRING,
    posicion: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    equipo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadors',
    timestamps: true
  });
  return Jugador;
};