const express = require('express')
const router = express.Router();

const BerandaController = require('../controller/BerandaController');

router.get('/sedang-cuti', BerandaController.PegawaiSedangCuti);

module.exports = router;
