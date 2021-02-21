const models = require('../models');

const GetPengajuanCutiSaya = (req, res) => {
    let where = {};
    if(req.user.otoritas !== 1){
        where = { user_id : req.user.id }
    }

    models.PengajuanCuti.findAll({
        raw : true,
        where : where
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : result
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    })
}

const TambahDataPengajuan = (req, res) => {
    models.PengajuanCuti.create({
        user_id : req.user.id,
        atasan_langsung : req.body.atasan_langsung,
        nama_ketua : req.body.nama_ketua,
        nip_ketua : req.body._nip_ketua,
        tanggal_pengajuan : req.body.tanggal_pengajuan,
        tanggal_awal_cuti : req.body.tanggal_awal_cuti,
        tanggal_akhir_cuti : req.body.tanggal_akhir_cuti,
        jenis_cuti : req.body.jenis_cuti,
        alasan_cuti : req.body.alasan_cuti,
        status : 1
    }).then(result => {
        res.status(200).send({
            status : 200,
            data : 'sukses'
        })
    }).catch(e => {
        res.status(500).send({
            status : 500,
            data : e
        })
    })
}


module.exports = { GetPengajuanCutiSaya, TambahDataPengajuan }
