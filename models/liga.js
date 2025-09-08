'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una liga tiene muchas temporadas
      Liga.hasMany(models.Temporada, { foreignKey: 'liga_id' });
    }
  }
  Liga.init({
    nombre: DataTypes.STRING,
    pais: DataTypes.STRING,
    creada_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Liga',
    timestamps: false
  });
  return Liga;
};