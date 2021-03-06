const express = require('express')
const router = express.Router();

const BerandaController = require('../controller/BerandaController');

router.get('/info', BerandaController.InfoBox);
router.get('/sedang-cuti', BerandaController.PegawaiSedangCuti);

module.exports = router;
