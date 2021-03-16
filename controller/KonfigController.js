const models = require('../models')

exports.GetKonfig = (req, res) => {
    models.Konfig.findOne({raw: true})
        .then(result => {
            res.send({
                status: 200,
                data : result
            })
        }).catch(err => {
            res.status(err.status).send({
                status: err.status,
                data : err
            })
        })
}

exports.UpdateKonfig = (req, res) => {
    models.Konfig.update({
        jatah_cuti_tahunan: req.body.jatah_cuti_tahunan,
        nama_instansi: req.body.nama_instansi,
        singkatan_instansi: req.body.singkatan_instansi,
        nama_ketua: req.body.nama_ketua,
        nip_ketua: req.body.nip_ketua,
        nama_aplikasi: req.body.nama_aplikasi,
        singkatan_aplikasi: req.body.singkatan_aplikasi,
        periode_pertama : req.body.periode_pertama,
        periode_kedua : req.body.periode_kedua,
        url_reminder : req.body.url_reminder,
        number_reminder : req.body.number_reminder,
    }, {where : {id : 1}})
        .then(result => {
            res.send({
                status: 200,
                data : 'sukses'
            })
        }).catch(err => {
        res.status(err.status).send({
            status: err.status,
            data : err
        })
    })
}
