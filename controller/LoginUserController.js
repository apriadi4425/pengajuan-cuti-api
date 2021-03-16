const models = require('../models');
const moment = require('moment');
const jwt = require("jsonwebtoken");

var md5 = require('md5');

const accessTokenSecret = process.env.SECRET_KEY;


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const CobaLogin = async (req, res) => {
    let where = {};
    if(validateEmail(req.body.username)){
        where = {
            email : req.body.username,
            password : md5(req.body.password)
        }
    }else{
        where = {
            username : req.body.username,
            password : md5(req.body.password)
        }
    }
    const User = await models.User.findOne({
        where : where
    })

    if(User !== null){
        const DataUser = User.dataValues;
        const accessToken = jwt.sign({ username: DataUser.username,  otoritas: DataUser.otoritas, id : DataUser.id }, accessTokenSecret);
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


const UbahTokenNotif = (req, res) => {
    const Token = req.body.token
    models.Konfig.update({ token_notif : Token }, {where : {id : 1}})
        .then(result => {
            res.send({
                status : 200,
                data : {
                    message : 'berhasil diubah'
                }
            })
        }).catch(e => {
            res.status(500).send({
                status : 500,
                data : {
                    message : e.errors
                }
            })
    })
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
        tanggal_lahir: req.body.tanggal_lahir === '' ? null : req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        agama: req.body.agama,
        status_kawin: req.body.status_kawin,
        tmt_pns: req.body.tmt_pns === '' ? null : req.body.tmt_pns,
        tmt_cpns: req.body.tmt_cpns === '' ? null : req.body.tmt_cpns,
        tmt_golongan: req.body.tmt_golongan === '' ? null : req.body.tmt_golongan,
        tanggal_sk_golongan: req.body.tanggal_sk_golongan === '' ? null : req.body.tanggal_sk_golongan,
        eselon: req.body.eselon,
        tmt_jabatan: req.body.tmt_jabatan === '' ? null : req.body.tmt_jabatan,
        tanggal_sk_jabatan: req.body.tanggal_sk_jabatan === '' ? null : req.body.tanggal_sk_jabatan,
        nomor_sk_jabatan: req.body.nomor_sk_jabatan,
        atasan_langsung : req.body.atasan_langsung || null,
        nomor_telpon : req.body.nomor_telpon,
        block : 1
    }).then(async result => {
        await DaftarkanSaldoAwalCuti(result.dataValues.id)
        res.send({
            status : 200,
            data : {
                message : 'User berhasil dibuat'
            }
        }).status(200)
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : {
                message : e.errors
            }
        })
    })
}

const DaftarkanSaldoAwalCuti = (id) => {
    const TahunIni = moment().format('YYYY');
    const TahunLalu = TahunIni - 1;
    const DuaTahunLalu = TahunIni - 2;

    models.SaldoCutiPegawai.bulkCreate([
        {
            user_id : id, tahun : TahunIni, sisa : 12
        },
        {
            user_id : id, tahun : TahunLalu, sisa : 6
        },
        {
            user_id : id, tahun : DuaTahunLalu, sisa : 6
        },
    ])

    return true
}

module.exports = { CobaLogin, CreateUser, UbahTokenNotif }
