'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TablaPosiciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temporada_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Temporadas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      equipo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      puntos: {
        type: Sequelize.INTEGER
      },
      goles_a_favor: {
        type: Sequelize.INTEGER
      },
      goles_en_contra: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TablaPosiciones');
  }
};