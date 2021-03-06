const models = require('../models');
const moment = require('moment');

const getKenaikanBulanIni = async (req, res) => {

    const GetAllUser = await models.User.findAll({raw : true});
    const TahunIni = moment().format('YYYY');
    let NewArray = [];
    GetAllUser.forEach(item => {
        let FaktorTahun = [];
        let FaktorTahunBulan = [];
        let FaktorTanggalLenkap = [];
        for(let i = 0; i < 15; i++){
            FaktorTahun[i] = Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)
            FaktorTahunBulan[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)}-${moment(item.tmt_cpns).format('MM')}`
            FaktorTanggalLenkap[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)}-${moment(item.tmt_cpns).format('MM-DD')}`
        }

        NewArray.push({
            user : item,
            tahun : FaktorTahun,
            bulan : FaktorTahunBulan,
            tanggal : FaktorTanggalLenkap
        })
    })



    let TahunIniNaikPangkat = [];
    let BulanIniNaikPangkat = [];
    let TanggalPeriode1 = [];
    let TanggalPeriode2 = [];

    NewArray.forEach(item => {
        item.tahun.forEach(item2 => {
            if(item2 === Number(moment().format('YYYY'))){
                TahunIniNaikPangkat.push({
                    user : item.user
                })
            }
        })

        item.bulan.forEach(item3 => {
            if(item3 === moment().format('YYYY-MM')){
                BulanIniNaikPangkat.push({
                    user : item.user,
                    bulan : item3
                })
            }
        })

        item.tanggal.forEach(item4 => {
            if(moment(item4) > moment(`${TahunIni}-01-01`) && moment(item4) < moment(`${TahunIni}-04-01`)){
                TanggalPeriode1.push({
                    user : item.user,
                    tanggal : item4
                })
            }else if(moment(item4) > moment(`${TahunIni}-04-01`) && moment(item4) < moment(`${TahunIni}-08-01`)){
                TanggalPeriode2.push({
                    user : item.user,
                    tanggal : item4
                })
            }
        })
    })

    const seen1 = new Set();
    const seen2 = new Set();

    const filteredArr1 = TanggalPeriode1.filter(item => {
        const duplicate = seen1.has(item.user.id);
        seen1.add(item.user.id);
        return !duplicate;
    });

    const filteredArr2 = TanggalPeriode2.filter(item => {
        const duplicate = seen1.has(item.user.id);
        seen2.add(item.user.id);
        return !duplicate;
    });

    res.send({
        tahun_ini : TahunIniNaikPangkat,
        bulan_ini : BulanIniNaikPangkat,
        periode_1 : filteredArr1,
        periode_2 : filteredArr2
    })
}

module.exports = { getKenaikanBulanIni }
