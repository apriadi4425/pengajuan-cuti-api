const models = require('../models');
const moment = require('moment');
require('moment/locale/id');
const {LamaCuti} = require('../helper/cutiHelper');

const GetPengajuanCutiSaya = (req, res) => {
    let where = {};
    if(req.user.otoritas !== 1){
        where = { user_id : req.user.id }
    }

    models.PengajuanCuti.findAll({
        raw : true,
        where : where
    }).then(result => {
        let NewData = [];
        result.forEach(item => {
            NewData.push({
                jenis_cuti: item.jenis_cuti,
                alasan_cuti: item.alasan_cuti,
                tanggal_pengajuan : moment(item.tanggal_pengajuan).format('dddd, DD MMMM YYYY'),
                lama_cuti : LamaCuti(item.tanggal_awal_cuti, item.tanggal_akhir_cuti),
                status : item.status,
                pertimbangan : item.pertimbangan_atasan_langsung
            })
        })
        res.status(200).send({
            status : 200,
            data : NewData
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
