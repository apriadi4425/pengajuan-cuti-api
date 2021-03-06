const models = require('../models');
const {Op} = require('sequelize');
const moment = require('moment');
const {LamaCuti} = require('../helper/cutiHelper')


const InfoBox = async (req, res) => {
    const SedangCuti = await models.PengajuanCuti.count({
        where : {
            status : 2,
            tanggal_awal_cuti : {
                [Op.lte] : new Date()
            },
            tanggal_akhir_cuti : {
                [Op.gte] : new Date()
            }
        }
    })
    const TotalPengajuan = await models.PengajuanCuti.count()
    const TotalPengajuanBelumAcc = await models.PengajuanCuti.count({where : {status : 1}})
    const TotalPegawai = await models.User.count();

    res.send({
        status : 200,
        data : {
            sedang_cuti : SedangCuti,
            total_pengajuan : TotalPengajuan,
            pengajuan_pending : TotalPengajuanBelumAcc,
            total_pegawai : TotalPegawai
        }
    })
}

const PegawaiSedangCuti = (req, res) => {
    models.PengajuanCuti.findAll({
        where : {
            status : 2,
            tanggal_awal_cuti : {
                [Op.lte] : new Date()
            },
            tanggal_akhir_cuti : {
                [Op.gte] : new Date()
            }
        },
        include : 'user'
    }).then(result => {
        let NewData = [];
        result.forEach(item => {
            let Data = item.dataValues;
            NewData.push({
                jenis_cuti: Data.jenis_cuti,
                alasan_cuti: Data.alasan_cuti,
                tanggal_pengajuan : moment(Data.tanggal_pengajuan).format('dddd, DD MMMM YYYY'),
                lama_cuti : LamaCuti(Data.tanggal_awal_cuti, Data.tanggal_akhir_cuti),
                user :  Data.user
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


module.exports = { PegawaiSedangCuti, InfoBox }
