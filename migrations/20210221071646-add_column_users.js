'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'users', // table name
          'atasan_langsung', // new field name
          {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' }
          },
      ),
      queryInterface.addColumn(
          'users', // table name
          'nomor_telpon', // new field name
          {
            type: Sequelize.STRING,
          },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'atasan_langsung'),
      queryInterface.removeColumn('users', 'nomor_telpon'),
    ]);
  }
};
