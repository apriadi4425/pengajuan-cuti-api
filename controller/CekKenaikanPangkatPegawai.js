const models = require('../models');
const moment = require('moment');

const getKenaikanBulanIni = async (req, res) => {

    const GetAllUser = await models.User.findAll({raw : true});
    const tanggalnya = req.query.tanggalnya;
    const TahunIniNya = moment(tanggalnya).format('YYYY');
    const BulanDepan = moment(tanggalnya).add(1, 'M').format('YYYY-MM');
    const TahunLalu = TahunIniNya - 1;

    let NewArray = [];
    GetAllUser.forEach(item => {
        let FaktorTahun = [];
        let FaktorTahunBulan = [];
        let FaktorTanggalLenkap = [];
        let FaktorKGBTahun = [];
        let FaktorKGBBulan = [];

        for(let i = 0; i < 15; i++){
            FaktorTahun[i] = Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)
            FaktorTahunBulan[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)}-${moment(item.tmt_cpns).format('MM')}`
            FaktorTanggalLenkap[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (4 * i)}-${moment(item.tmt_cpns).format('MM-DD')}`
            if(item.tingkat_pendidikan === 'SLTA'){
                FaktorKGBTahun[i] = Number(moment(item.tmt_cpns).format('YYYY')) + (3 * i)
                FaktorKGBBulan[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (3 * i)}-${moment(item.tmt_cpns).format('MM')}`
            }else{
                FaktorKGBTahun[i] = Number(moment(item.tmt_cpns).format('YYYY')) + (2 * i)
                FaktorKGBBulan[i] = `${Number(moment(item.tmt_cpns).format('YYYY')) + (2 * i)}-${moment(item.tmt_cpns).format('MM')}`
            }
        }

        NewArray.push({
            user : item,
            tahun : FaktorTahun,
            bulan : FaktorTahunBulan,
            tanggal : FaktorTanggalLenkap,
            kgb_tahun : FaktorKGBTahun,
            kgb_bulan : FaktorKGBBulan
        })
    })


    let TahunIniNaikPangkat = [];
    let BulanIniNaikPangkat = [];
    let TanggalPeriode1 = [];
    let TanggalPeriode2 = [];

    let KgbTahunIni = [];
    let KgbBulanIni = [];
    let KgbBulanDepan = [];

    NewArray.forEach(item => {
        item.tahun.forEach(item2 => {
            if(item2 === Number(moment(tanggalnya).format('YYYY'))){
                TahunIniNaikPangkat.push({
                    user : item.user
                })
            }
        })

        item.bulan.forEach(item3 => {
            if(item3 === moment(tanggalnya).format('YYYY-MM')){
                BulanIniNaikPangkat.push({
                    user : item.user,
                    bulan : item3
                })
            }
        })

        item.kgb_tahun.forEach(item6 => {
            if(item6 === Number(moment(tanggalnya).format('YYYY'))){
                KgbTahunIni.push({
                    user : item.user,
                    tanggal : item6
                })
            }
        })

        item.kgb_bulan.forEach(item7 => {
            if(item7 === moment(tanggalnya).format('YYYY-MM')){
                KgbBulanIni.push({
                    user : item.user,
                    bulan : item7
                })
            }
        })

        item.kgb_bulan.forEach(item7 => {
            if(item7 === BulanDepan){
                KgbBulanDepan.push({
                    user : item.user,
                    bulan : item7
                })
            }
        })



        item.tanggal.forEach(item4 => {
            if(item4 !== 'NaN-Invalid date') {
                if (moment(item4) > moment(`${TahunLalu}-10-01`) && moment(item4) < moment(`${TahunIniNya}-04-01`)) {
                    TanggalPeriode1.push({
                        user: item.user,
                        tanggal: item4
                    })
                } else if (moment(item4) > moment(`${TahunIniNya}-04-01`) && moment(item4) < moment(`${TahunIniNya}-10-01`)) {
                    TanggalPeriode2.push({
                        user: item.user,
                        tanggal: item4
                    })
                }
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
        periode_2 : filteredArr2,
        kgb_tahun_ini : KgbTahunIni,
        kgb_bulan_ini : KgbBulanIni,
        kgb_bulan_depan : KgbBulanDepan
    })
}

module.exports = { getKenaikanBulanIni }
