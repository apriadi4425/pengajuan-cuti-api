const exress = require('express')
const Router = exress.Router();

const PengajuanCutiController = require('../controller/PengajuanCutiController');

Router.get('/saya', PengajuanCutiController.GetPengajuanCutiSaya);
Router.post('/insert', PengajuanCutiController.TambahDataPengajuan);

module.exports = Router;
