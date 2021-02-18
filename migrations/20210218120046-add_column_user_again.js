'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'users',
          'tingkat_pendidikan',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tahun_lulus_pendidikan',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tempat_lahir',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tanggal_lahir',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'jenis_kelamin',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'agama',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'status_kawin',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tmt_pns',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tmt_cpns',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tmt_golongan',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tanggal_sk_golongan',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'eselon',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tmt_jabatan',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'tanggal_sk_jabatan',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
      ),
      queryInterface.addColumn(
          'users',
          'nomor_sk_jabatan',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'tingkat_pendidikan'),
      queryInterface.removeColumn('users', 'tahun_lulus_pendidikan'),
      queryInterface.removeColumn('users', 'tempat_lahir'),
      queryInterface.removeColumn('users', 'tanggal_lahir'),
      queryInterface.removeColumn('users', 'jenis_kelamin'),
      queryInterface.removeColumn('users', 'agama'),
      queryInterface.removeColumn('users', 'status_kawin'),
      queryInterface.removeColumn('users', 'tmt_pns'),
      queryInterface.removeColumn('users', 'tmt_cpns'),
      queryInterface.removeColumn('users', 'tmt_golongan'),
      queryInterface.removeColumn('users', 'tanggal_sk_golongan'),
      queryInterface.removeColumn('users', 'eselon'),
      queryInterface.removeColumn('users', 'tmt_jabatan'),
      queryInterface.removeColumn('users', 'tanggal_sk_jabatan'),
      queryInterface.removeColumn('users', 'nomor_sk_jabatan'),
    ]);
  }
};
