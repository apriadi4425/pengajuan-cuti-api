'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'users', // table name
          'saldo_cuti', // new field name
          {
            type: Sequelize.BIGINT,
          },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'saldo_cuti'),
    ]);
  }
};
