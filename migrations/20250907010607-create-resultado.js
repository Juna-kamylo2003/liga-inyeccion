'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resultados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partido_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Partidos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      goles_local: {
        type: Sequelize.INTEGER
      },
      goles_visitante: {
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
    await queryInterface.dropTable('Resultados');
  }
};