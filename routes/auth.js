const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../midleware');

const LoginUserController = require('../controller/LoginUserController');
const CekKenaikanPangkatPegawai = require('../controller/CekKenaikanPangkatPegawai');
const OneSignalController = require('../controller/OneSignalController')

router.post('/login', LoginUserController.CobaLogin);
router.get('/kenaikan-pangkat', CekKenaikanPangkatPegawai.getKenaikanBulanIni);
router.post('/register', authenticateToken, LoginUserController.CreateUser);
router.put('/token', LoginUserController.UbahTokenNotif);
router.get('/kirim', OneSignalController.sendNotification);
router.get('/reminder', OneSignalController.getReminder);
router.put('/matikan-reminder', OneSignalController.MatikanReminder);

module.exports = router;
