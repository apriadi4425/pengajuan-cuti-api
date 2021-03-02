const models = require('../models');
const moment = require('moment');


const {LamaCuti, LamaCutiHari} = require('../helper/cutiHelper');


const getJumlahCuti = async (id) => {
    const SisaCuti = await models.SaldoCutiPegawai.findAll({
        raw : true,
        where: { user_id : id }
    })

    const TahunIni = moment().format('YYYY');
    const TahunLalu = TahunIni - 1;
    const DuaTahunLalu = TahunIni - 2;

    let JumlahCuti = 0;
    SisaCuti.forEach(item => {
        if(item.tahun === TahunIni.toString() || item.tahun === TahunLalu.toString() || item.tahun === DuaTahunLalu.toString()){
            JumlahCuti += item.sisa
        }
    })
    return JumlahCuti;
}


const GetPengajuanCutiSaya = async (req, res) => {
    let where = {};
    if(req.user.otoritas !== 1){
        where = { user_id : req.user.id }
    }

    const PengajuanCuti = await models.PengajuanCuti.findAll({
        where : where,
        include : 'user'
    })

    let NewData = [];
        for (const item of PengajuanCuti) {
            const SisaCuti = await getJumlahCuti(item.user_id);
            NewData.push({
                id : item.id,
                jenis_cuti: item.jenis_cuti,
                alasan_cuti: item.alasan_cuti,
                tanggal_pengajuan : moment(item.tanggal_pengajuan).format('DD/MM/YYYY'),
                lama_cuti : LamaCuti(item.tanggal_awal_cuti, item.tanggal_akhir_cuti),
                lama_cuti_hari : LamaCutiHari(item.tanggal_awal_cuti, item.tanggal_akhir_cuti),
                status : item.status,
                pertimbangan : item.pertimbangan_atasan_langsung,
                nama : item.user.nama,
                sisa_cuti : SisaCuti
            })
         }
    const JumlahCuti = await getJumlahCuti(req.user.id);

    res.status(200).send({
        status : 200,
        data : NewData,
        sisa_cuti : JumlahCuti
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

const KurangiSisaCuti = (id) => {
    return new Promise(async (resolve) => {
        const DataCuti = await models.PengajuanCuti.findOne({raw : true, where : { id : id}});
        const LamaCuti = LamaCutiHari(DataCuti.tanggal_awal_cuti, DataCuti.tanggal_akhir_cuti);

        const TahunIni = moment().format('YYYY');
        const TahunLalu = TahunIni - 1;
        const DuaTahunLalu = TahunIni - 2;

        const SisaCuti = await models.SaldoCutiPegawai.findAll({raw : true, where : {user_id : DataCuti.user_id}});
        let DataObjectCuti = {}
        SisaCuti.forEach(item => {
            if(item.tahun === TahunIni.toString() || item.tahun === TahunLalu.toString() || item.tahun === DuaTahunLalu.toString()){
                DataObjectCuti[item.tahun] = item.sisa
            }
        })

        if(DataObjectCuti[DuaTahunLalu] >= LamaCuti){
            DataObjectCuti[DuaTahunLalu] = LamaCuti;
            await models.SaldoCutiPegawai.update({
                sisa : (DataObjectCuti[DuaTahunLalu] - LamaCuti)
            }, {
                where : { tahun : DuaTahunLalu, user_id : DataCuti.user_id }
            })
        }else if(DataObjectCuti[DuaTahunLalu] !== 0 && (DataObjectCuti[TahunLalu] + DataObjectCuti[DuaTahunLalu]) >= LamaCuti){
            const GabunganCutiDuaTahunLaludanTahunIni = (DataObjectCuti[TahunLalu] + DataObjectCuti[DuaTahunLalu] - LamaCuti);
            DataObjectCuti[DuaTahunLalu] = DataObjectCuti[DuaTahunLalu];
            DataObjectCuti[TahunLalu] = DataObjectCuti[TahunLalu] - GabunganCutiDuaTahunLaludanTahunIni;
            DataObjectCuti[TahunIni] = 0;
            await models.SaldoCutiPegawai.update({sisa : 0}, {where : { tahun : DuaTahunLalu, user_id : DataCuti.user_id }})
            await models.SaldoCutiPegawai.update({sisa : GabunganCutiDuaTahunLaludanTahunIni}, {where : { tahun : TahunLalu, user_id : DataCuti.user_id }})
        }else if(DataObjectCuti[TahunLalu] >= LamaCuti){
            DataObjectCuti[DuaTahunLalu] = 0;
            DataObjectCuti[TahunLalu] = LamaCuti;
            DataObjectCuti[TahunIni] = 0;
            await models.SaldoCutiPegawai.update({
                sisa : (DataObjectCuti[TahunLalu] - LamaCuti)
            }, {
                where : { tahun : TahunLalu, user_id : DataCuti.user_id }
            })
        }else if(DataObjectCuti[TahunLalu] !== 0 && (DataObjectCuti[TahunLalu] + DataObjectCuti[TahunIni]) >= LamaCuti){
            const GabunganCutiTahunLaludanTahunIni = (DataObjectCuti[TahunLalu] + DataObjectCuti[TahunIni] - LamaCuti);
            DataObjectCuti[DuaTahunLalu] = 0;
            DataObjectCuti[TahunLalu] = DataObjectCuti[TahunLalu];
            DataObjectCuti[TahunIni] = DataObjectCuti[TahunIni] - GabunganCutiTahunLaludanTahunIni;
            await models.SaldoCutiPegawai.update({sisa : 0}, {where : { tahun : TahunLalu, user_id : DataCuti.user_id }})
            await models.SaldoCutiPegawai.update({sisa : GabunganCutiTahunLaludanTahunIni}, {where : { tahun : TahunIni, user_id : DataCuti.user_id }})
        }else if(DataObjectCuti[TahunIni] >= LamaCuti){
            DataObjectCuti[DuaTahunLalu] = 0;
            DataObjectCuti[TahunLalu] = 0;
            DataObjectCuti[TahunIni] = LamaCuti;
            await models.SaldoCutiPegawai.update({
                sisa : (DataObjectCuti[TahunIni] - LamaCuti)
            }, {
                where : { tahun : TahunIni, user_id : DataCuti.user_id }
            })
        }

        resolve(DataObjectCuti)
    })
}

const SetujuiPengajuanCuti = async (req, res) => {
    const TahunIni = moment().format('YYYY');
    const TahunLalu = TahunIni - 1;
    const DuaTahunLalu = TahunIni - 2;
    const {status, pertimbangan_atasan_langsung, id} = req.body;
    let DataPengambilanCuti = {
        [TahunIni] : 0, [TahunLalu] : 0, [DuaTahunLalu] : 0
    }
    if(status === 2){
        DataPengambilanCuti = await KurangiSisaCuti(id);
    }

    models.PengajuanCuti.update({
        status : status,
        pertimbangan_atasan_langsung : pertimbangan_atasan_langsung,
        n : DataPengambilanCuti[TahunIni],
        n1 : DataPengambilanCuti[TahunLalu],
        n2 : DataPengambilanCuti[DuaTahunLalu],
    },{
        where : {
            id : id
        }
    }).then(async result => {
        res.status(200).send({
            status : 200,
            data : 'sukses'
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : 500,
            data : e
        })
    })
}


module.exports = { GetPengajuanCutiSaya, TambahDataPengajuan, SetujuiPengajuanCuti }
