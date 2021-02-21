const models = require('../models');

const GetDetail = async (req, res) => {
    const UserPayload = req.user;
    Konfig = await models.Konfig.findOne({raw : true, where : {id : 1}});
    models.User.findOne({
        raw : true,
        where : {
            id : UserPayload.id,
        },
        attributes: ['otoritas','email','nama','atasan_langsung']
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : result,
            konfig : Konfig
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
    models.User.findAll({raw : true}).then(result => {
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

module.exports = { GetAllUser, DeleteUser, EditUser, GetDetail, GetUserSaya }
