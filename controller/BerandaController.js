const models = require('../models');
const {Op} = require('sequelize')

const PegawaiSedangCuti = (req, res) => {
    models.PengajuanCuti.findAll({
        raw : true,
        where : {
            status : 2,
            tanggal_awal_cuti : {
                [Op.lte] : new Date()
            },
            tanggal_akhir_cuti : {
                [Op.gte] : new Date()
            }
        }
    }).then(result => {
        res.send(result)
    }).catch(e => {
        console.log(e)
    })
}

module.exports = { PegawaiSedangCuti }
