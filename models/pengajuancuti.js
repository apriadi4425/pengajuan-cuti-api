'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PengajuanCuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PengajuanCuti.belongsTo(models.User, {as : 'user', foreignKey : 'user_id'});
      PengajuanCuti.belongsTo(models.User, {as : 'atasan', foreignKey : 'atasan_langsung'});
    }
  };
  PengajuanCuti.init({
    user_id: {
      type : DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    nama_ketua : DataTypes.STRING,
    nip_ketua : DataTypes.STRING,
    atasan_langsung : {
      type : DataTypes.INTEGER,
    },
    jenis_cuti : DataTypes.INTEGER,
    alasan_cuti : DataTypes.STRING,
    status : DataTypes.INTEGER,
    tanggal_pengajuan: DataTypes.DATE,
    tanggal_awal_cuti: DataTypes.DATE,
    tanggal_akhir_cuti: DataTypes.DATE,
    pertimbangan_atasan_langsung : DataTypes.STRING,
    n : DataTypes.INTEGER,
    n1 : DataTypes.INTEGER,
    n2 : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PengajuanCuti',
  });
  return PengajuanCuti;
};
