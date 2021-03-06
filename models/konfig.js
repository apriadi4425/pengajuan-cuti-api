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
  }, {
    sequelize,
    modelName: 'Konfig',
  });
  return Konfig;
};
