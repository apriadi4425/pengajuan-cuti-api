const moment = require('moment');
require('moment/locale/id');

const LamaCuti = (tanggalAwal, tanggalAkhir) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = moment(tanggalAwal);
    const secondDate = moment(tanggalAkhir);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    let TanggalCutinya = '';
    if(moment(tanggalAwal).format('DD-MM') === moment(tanggalAkhir).format('DD-MM')){
        TanggalCutinya = moment(tanggalAwal).format('dddd, DD MMMM YYYY');
    }else if(moment(tanggalAwal).format('MM') === moment(tanggalAkhir).format('MM')){
        TanggalCutinya = `${moment(tanggalAwal).format('DD')} - ${moment(tanggalAkhir).format('DD')} ${moment(tanggalAwal).format('MMMM YYYY')}`
    }else{
        TanggalCutinya = `${moment(tanggalAwal).format('DD MMMM')} - ${moment(tanggalAkhir).format('DD MMMM')} ${moment(tanggalAwal).format('YYYY')}`
    }
    return `${TanggalCutinya} (${diffDays === 0 ? 1 : diffDays} Hari) `;
}

module.exports = { LamaCuti }
