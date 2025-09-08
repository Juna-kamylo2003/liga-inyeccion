'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      equipo_local: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      equipo_visitante: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
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
    await queryInterface.dropTable('Partidos');
  }
};