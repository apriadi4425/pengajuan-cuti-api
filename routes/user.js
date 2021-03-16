const express = require('express')
const router = express.Router();

const UserController = require('../controller/UserController');
const CekKenaikanPangkatPegawai = require('../controller/CekKenaikanPangkatPegawai');

router.get('/saya', UserController.GetDetail);
router.get('/list-saya', UserController.GetUserSaya);
router.get('/kenaikan-pangkat', CekKenaikanPangkatPegawai.getKenaikanBulanIni);
router.get('/', UserController.GetAllUser);
router.post('/', UserController.CreateUser);
router.put('/', UserController.EditUser);
router.put('/saldo-cuti', UserController.SetSaldoCuti);

router.put('/block', UserController.BlockUser);
router.delete('/', UserController.DeleteUser);

module.exports = router;
