'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReminderListPegawais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_reminder: {
        type : Sequelize.INTEGER,
        references: { model: 'reminders', key: 'id' }
      },
      id_pegawai: {
        type : Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      nama_pegawai: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ReminderListPegawais');
  }
};
