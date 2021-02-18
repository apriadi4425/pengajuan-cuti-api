'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    jabatan : {
      type: DataTypes.STRING,
      allowNull : false
    },
    pangkat : {
      type: DataTypes.STRING,
      allowNull : false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email Telah digunakan'
      }
    },
    nama: {
      type: DataTypes.STRING,
      allowNull : false
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'NIP Telah digunakan'
      }
    },
    otoritas : {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    tingkat_pendidikan: DataTypes.STRING,
    tahun_lulus_pendidikan: DataTypes.DATE,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.STRING,
    agama: DataTypes.STRING,
    status_kawin: DataTypes.STRING,
    tmt_pns: DataTypes.DATE,
    tmt_cpns: DataTypes.DATE,
    tmt_golongan: DataTypes.DATE,
    tanggal_sk_golongan: DataTypes.DATE,
    eselon: DataTypes.STRING,
    tmt_jabatan: DataTypes.DATE,
    tanggal_sk_jabatan: DataTypes.DATE,
    nomor_sk_jabatan: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
