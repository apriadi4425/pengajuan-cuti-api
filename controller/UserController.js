const models = require('../models');
const moment = require('moment');
var md5 = require('md5');

const GetDetail = async (req, res) => {
    const UserPayload = req.user;
    Konfig = await models.Konfig.findOne({raw : true, where : {id : 1}});
    Pengajuan = await models.PengajuanCuti.count({where : { status : 1 }});
    models.User.findOne({
        raw : true,
        where : {
            id : UserPayload.id,
        },
        attributes: ['id', 'otoritas','email','nama','atasan_langsung']
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : result,
            konfig : Konfig,
            pengajuan : Pengajuan
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    })
}

const GetUserSaya = (req, res) => {
    models.User.findAll({raw : true, where : {id : req.user.id}}).then(result => {
        res.status(200).send({
            status : 200,
            data : result
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    });
}

const GetAllUser = async (req, res) => {
    models.User.findAll({include : 'saldo_cuti'}).then(result => {
        res.status(200).send({
            status : 200,
            data : result
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    });
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

const EditUser = async (req, res) => {
    models.User.update({
        username : req.body.username,
        email : req.body.email,
        nama : req.body.nama,
        nip : req.body.nip,
        jabatan : req.body.jabatan,
        pangkat : req.body.pangkat,
        golongan : req.body.golongan,
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
        atasan_langsung: req.body.atasan_langsung,
        nomor_telpon: req.body.nomor_telpon
    }, {
        where : {id : req.body.id}
    }).then(() => {
        res.send({
            status : 200,
            data : {
                message : 'User berhasil diubah'
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

const SetSaldoCuti = async (req, res) => {
    const TahunIni = moment().format('YYYY');
    const TahunLalu = TahunIni - 1;
    const DuaTahunLalu = TahunIni - 2;


    await models.SaldoCutiPegawai.update({sisa : req.body[TahunIni]}, { where : { tahun : '2021', user_id : req.body.id_user }})
        .then(() => console.log('sukses')).catch(e => console.log(e))
    await models.SaldoCutiPegawai.update({sisa : req.body[TahunLalu]}, { where : { tahun : TahunLalu, user_id : req.body.id_user }})
        .then(() => console.log('sukses')).catch(e => console.log(e))
    await models.SaldoCutiPegawai.update({sisa : req.body[DuaTahunLalu]}, { where : { tahun : DuaTahunLalu, user_id : req.body.id_user }})
        .then(() => console.log('sukses')).catch(e => console.log(e))

    res.send({
        status : 200,
        data : 'Berhasil'
    })
}

const BlockUser = async(req, res) => {
    const {action, id} = req.body;
    let block;
    if(action === 'block'){
        block = 2;
    }else{
        block = 1;
    }

    models.User.update({
        block : block
    }, {
        where : {
            id : id
        }
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : 'Berhasil'
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    });
}

const DeleteUser = async (req, res) => {
    models.User.destroy({
        where : {
            id : req.body.id
        }
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : 'Berhasil menghapus'
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    });
}

module.exports = { GetAllUser, BlockUser, CreateUser, DeleteUser, EditUser, GetDetail, GetUserSaya, SetSaldoCuti }
