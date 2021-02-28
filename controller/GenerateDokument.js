const models = require('../models')
const fs = require('fs');
const { TemplateHandler } = require('easy-template-x');
const moment = require('moment');
const { MasaKerja, JenisCuti, LamaCutiDetil, LamaCutiDetilDua } = require('../helper/cutiHelper')

const getDataCuti = async (IdPengajuan) => {
    return new Promise((resolve, reject) => {
        models.PengajuanCuti.findOne({
            where : {id : IdPengajuan},
            include : ['user', 'atasan']
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}

const BuatDokument = async (req, res) => {
    let id = req.query.id
    let DataPengajuan = await getDataCuti(id);
    let DataValues = DataPengajuan.dataValues;

    let logic = JenisCuti(DataValues.jenis_cuti)

    // 1. read template file
    const templateFile = fs.readFileSync('template/pengajuan_cuti.docx');



// 2. process the template
    const dataBefore = {
        tanggal_pengajuan : moment(DataValues.tanggal_pengajuan).format('DD MMMM YYYY'),
        nama : DataValues.user.nama,
        nama_besar : DataValues.user.nama.toUpperCase(),
        nomor_telpon : DataValues.user.nomor_telpon,
        nip : DataValues.user.nip,
        jabatan : DataValues.user.jabatan,
        masa_kerja : MasaKerja(DataValues.user.tmt_pns),
        alasan_cuti: DataValues.alasan_cuti,
        lama_cuti : LamaCutiDetil(DataValues.tanggal_awal_cuti, DataValues.tanggal_akhir_cuti),
        lama_cuti_huruf :  LamaCutiDetilDua(DataValues.tanggal_awal_cuti, DataValues.tanggal_akhir_cuti),
        awal_cuti : moment(DataValues.tanggal_awal_cuti).format('DD MMMM YYYY'),
        akhir_cuti : moment(DataValues.tanggal_akhir_cuti).format('DD MMMM YYYY'),
        nama_atasan_langsung: DataValues.atasan.nama.toUpperCase(),
        jabatan_atasan_langsung : DataValues.atasan.jabatan,
        nip_atasan_langsung : DataValues.atasan.nip,
        nama_ketua : DataValues.nama_ketua.toUpperCase(),
        nip_ketua : DataValues.nip_ketua
    };

    const data = Object.assign(dataBefore, logic)


    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

// 3. save output
    fs.writeFileSync('template/pengajuan.docx', doc);

    res.download('template/pengajuan.docx');
}

module.exports = { BuatDokument }
