const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../midleware')

const auth = require('./auth');
const user = require('./user');
const pengajuan = require('./pengajuan');
const dokument = require('./dokument');
const beranda = require('./beranda')
const konfig = require('./konfig')
const reminder = require('./reminder')

router.use('/beranda', authenticateToken, beranda);
router.use('/auth', auth);
router.use('/user', authenticateToken, user);
router.use('/pengajuan', authenticateToken, pengajuan);
router.use('/dokument', dokument);
router.use('/konfig', konfig);
router.use('/reminder', authenticateToken, reminder);

module.exports = router;

