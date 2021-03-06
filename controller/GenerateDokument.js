const models = require('../models')
const fs = require('fs');
const { TemplateHandler } = require('easy-template-x');
const moment = require('moment');
const { MasaKerja, JenisCuti, LamaCutiDetil, LamaCutiDetilDua, LamaCutiHari } = require('../helper/cutiHelper')
const { AngkaToRomawi } = require('../helper/tanggalHelper')

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


    const LamaCuti = LamaCutiHari(DataValues.tanggal_awal_cuti, DataValues.tanggal_akhir_cuti);
    const TahunIni = moment().format('YYYY');
    const TahunLalu = TahunIni - 1;
    const DuaTahunLalu = TahunIni - 2;

    const SisaCuti = await models.SaldoCutiPegawai.findAll({raw : true, where : {user_id : DataValues.user.id}});
    let DataObjectCutiSebelum = {}
    let DataObjectCuti = {}
    SisaCuti.forEach(item => {
        if(item.tahun === TahunIni.toString() || item.tahun === TahunLalu.toString() || item.tahun === DuaTahunLalu.toString()){
            DataObjectCutiSebelum[item.tahun] = item.sisa
            DataObjectCuti[item.tahun] = item.sisa
        }
    })



    if(DataValues.status !== 2){
        if(DataObjectCuti[DuaTahunLalu] >= LamaCuti){
            DataObjectCuti[DuaTahunLalu] = DataObjectCuti[DuaTahunLalu] - LamaCuti;
        }else if(DataObjectCuti[DuaTahunLalu] !== 0 && (DataObjectCuti[TahunLalu] + DataObjectCuti[DuaTahunLalu]) >= LamaCuti){
            const GabunganCutiDuaTahunLaludanTahunIni = (DataObjectCuti[TahunLalu] + DataObjectCuti[DuaTahunLalu] - LamaCuti);
            DataObjectCuti[DuaTahunLalu] = 0;
            DataObjectCuti[TahunLalu] = GabunganCutiDuaTahunLaludanTahunIni;
        }else if(DataObjectCuti[TahunLalu] >= LamaCuti){
            DataObjectCuti[TahunLalu] = DataObjectCuti[TahunLalu] - LamaCuti;
        }else if(DataObjectCuti[TahunLalu] !== 0 && (DataObjectCuti[TahunLalu] + DataObjectCuti[TahunIni]) >= LamaCuti){
            const GabunganCutiTahunLaludanTahunIni = (DataObjectCuti[TahunLalu] + DataObjectCuti[TahunIni] - LamaCuti);
            DataObjectCuti[TahunLalu] = 0;
            DataObjectCuti[TahunIni] = GabunganCutiTahunLaludanTahunIni;
        }else if(DataObjectCuti[TahunIni] >= LamaCuti){
            DataObjectCuti[TahunIni] = DataObjectCuti[TahunIni] - LamaCuti;
        }
    }else{
        DataObjectCutiSebelum[DuaTahunLalu] = DataObjectCutiSebelum[DuaTahunLalu] + DataValues.n2;
        DataObjectCutiSebelum[TahunLalu] = DataObjectCutiSebelum[TahunLalu] + DataValues.n1;
        DataObjectCutiSebelum[TahunIni] = DataObjectCutiSebelum[TahunIni] + DataValues.n;
    }


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
        tanggal_surat : `${AngkaToRomawi(moment(DataValues.tanggal_pengajuan).format('MM'))}/${moment(DataValues.tanggal_pengajuan).format('YYYY')}`,
        akhir_cuti : moment(DataValues.tanggal_akhir_cuti).format('DD MMMM YYYY'),
        nama_atasan_langsung: DataValues.atasan.nama.toUpperCase(),
        jabatan_atasan_langsung : DataValues.atasan.jabatan,
        nip_atasan_langsung : DataValues.atasan.nip,
        nama_ketua : DataValues.nama_ketua.toUpperCase(),
        nip_ketua : DataValues.nip_ketua,
        n1_sbl : DataObjectCutiSebelum[TahunIni],
        n2_sbl : DataObjectCutiSebelum[TahunLalu],
        n3_sbl : DataObjectCutiSebelum[DuaTahunLalu],
        n1_ssd : DataObjectCuti[TahunIni],
        n2_ssd : DataObjectCuti[TahunLalu],
        n3_ssd : DataObjectCuti[DuaTahunLalu],
    };

    const data = Object.assign(dataBefore, logic)


    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

// 3. save output
    fs.writeFileSync('template/pengajuan.docx', doc);

    res.download('template/pengajuan.docx');
}

module.exports = { BuatDokument }
