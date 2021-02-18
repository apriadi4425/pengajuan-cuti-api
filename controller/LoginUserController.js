const models = require('../models');
const jwt = require("jsonwebtoken");
var md5 = require('md5');

const accessTokenSecret = process.env.SECRET_KEY;

const CobaLogin = async (req, res) => {

    const User = await models.User.findOne({
        where : {
            username : req.body.username,
            password : md5(req.body.password)
        }
    })

    if(User !== null){
        const DataUser = User.dataValues;
        const accessToken = jwt.sign({ username: DataUser.username,  otoritas: DataUser.otoritas }, accessTokenSecret);
        res.status(200).send({
            status : 200,
            data : {
                username : DataUser.username,
                nama : DataUser.nama,
                token : accessToken
            }
        })
    }else{
        res.status(401).send({
            status : 401,
            data : {
                message : 'Username atau password salah'
            }
        })
    }
}

const CreateUser = async (req, res) => {
    models.User.create({
        username : req.body.username,
        password : md5(req.body.password),
        email : req.body.email,
        nama : req.body.nama,
        nip : req.body.nip,
        jabatan : req.body.jabatan,
        pangkat : req.body.pangkat,
        golongan : req.body.golongan,
        otoritas : 2,
        tingkat_pendidikan: req.body.tingkat_pendidikan,
        tahun_lulus_pendidikan: req.body.tahun_lulus_pendidikan,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        agama: req.body.agama,
        status_kawin: req.body.status_kawin,
        tmt_pns: req.body.tmt_pns,
        tmt_cpns: req.body.tmt_cpns,
        tmt_golongan: req.body.tmt_golongan,
        tanggal_sk_golongan: req.body.tanggal_sk_golongan,
        eselon: req.body.eselon,
        tmt_jabatan: req.body.tmt_jabatan,
        tanggal_sk_jabatan: req.body.tanggal_sk_jabatan,
        nomor_sk_jabatan: req.body.nomor_sk_jabatan,
    }).then(() => {
        res.send({
            status : 200,
            data : {
                message : 'User berhasil dibuat'
            }
        }).status(200)
    }).catch(e => {
        res.send({
            status : 500,
            data : {
                message : e.errors
            }
        }).status(500)
    })
}

module.exports = { CobaLogin, CreateUser }
