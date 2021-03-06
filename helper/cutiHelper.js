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

const LamaCutiDetil = (tanggalAwal, tanggalAkhir) => {
    let starts = moment(tanggalAwal);
    let ends   = moment(tanggalAkhir);
    let lama = moment.duration(ends.diff(starts));
    return `${lama.years() === 0 ? '' : lama.years() + ' Tahun'} ${lama.months() === 0 ? '' : lama.months() + ' Bulan'} ${lama.days() === 0 ? '1 Hari' : lama.days() + ' Hari'}`
}

const LamaCutiDetilDua = (tanggalAwal, tanggalAkhir) => {
    let starts = moment(tanggalAwal);
    let ends   = moment(tanggalAkhir);
    let lama = moment.duration(ends.diff(starts));
    return `${lama.years() === 0 ? '' : lama.years() + ` (${toWords(lama.years())})` + ' tahun'} ${lama.months() === 0 ? '' : lama.months() + ` (${toWords(lama.months())})` + ' bulan'} ${lama.days() === 0 ? '1 (Satu) hari' : lama.days() + ` ${toWords(lama.days())}` + ' hari'}`
}

const LamaCutiHari = (tanggalAwal, tanggalAkhir) => {
    let starts = moment(tanggalAwal);
    let ends   = moment(tanggalAkhir);
    let lama = moment.duration(ends.diff(starts));

    let hari = lama.years()*360 + lama.months()*30 + lama.days();
    return hari;
}


const MasaKerja = (date) => {
    let starts = moment(date);
    let ends   = moment();
    let lama = moment.duration(ends.diff(starts));

    return `${lama.years() === 0 ? '' : lama.years() + ' tahun'} ${lama.months() === 0 ? '' : lama.months() + ' bulan'}`
}

const JenisCuti = (Jenis) => {
    switch (Jenis) {
        case 1: return {ct : '✓'}
        case 2: return {cb : '✓'}
        case 3: return {cs : '✓'}
        case 4: return {cm : '✓'}
        case 5: return {ck : '✓'}
        case 6: return {cl : '✓'}
        default: return {ct : '✓'}
    }
}

const toWords = (s = 1) => {
    let th = ['','Ribu','Juta', 'Milyar','Triliun'];
    let dg = ['Nol','Satu','Dua','Tiga','Empat', 'Lima','Enam','Tujuh','Delapan','Sembilan'];
    var tn = ['Sepuluh','Sebelas','Dua Belas','Tiga Belas', 'Empat Belas','Lima Belas','Enam Belas', 'Tujuh Belas','Delapan Belas','Sembilan Belas']; var tw = ['Dua Puluh','Tiga Puluh','Empat Puluh','Lima Puluh', 'Enam Puluh','Tujuh Puluh','Delapan Puluh','Sembilan Puluh'];

    s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'Ratus ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ').replace("Satu Ratus","Seratus").replace("Satu Ribu","Seribu").replace("Satu Puluh","Sepuluh");

}


module.exports = { LamaCuti, MasaKerja, JenisCuti, LamaCutiDetil, LamaCutiDetilDua, LamaCutiHari }
