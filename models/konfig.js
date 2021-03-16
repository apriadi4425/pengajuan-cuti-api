'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Konfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Konfig.init({
    jatah_cuti_tahunan: DataTypes.INTEGER,
    nama_ketua: DataTypes.STRING,
    nip_ketua: DataTypes.STRING,
    nama_aplikasi: DataTypes.STRING,
    singkatan_aplikasi: DataTypes.STRING,
    nama_instansi: DataTypes.STRING,
    singkatan_instansi: DataTypes.STRING,
    periode_pertama : DataTypes.DATE,
    periode_kedua : DataTypes.DATE,
    url_reminder : DataTypes.STRING,
    number_reminder : DataTypes.STRING,
    token_notif : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Konfig',
  });
  return Konfig;
};
