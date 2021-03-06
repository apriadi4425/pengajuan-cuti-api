const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../midleware');

const LoginUserController = require('../controller/LoginUserController');
const CekKenaikanPangkatPegawai = require('../controller/CekKenaikanPangkatPegawai');

router.post('/login', LoginUserController.CobaLogin);
router.get('/kenaikan-pangkat', CekKenaikanPangkatPegawai.getKenaikanBulanIni);
router.post('/register', authenticateToken, LoginUserController.CreateUser);

module.exports = router;
