const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../midleware')

const auth = require('./auth');
const user = require('./user');
const pengajuan = require('./pengajuan');
const dokument = require('./dokument');

router.use('/auth', auth);
router.use('/user', authenticateToken, user);
router.use('/pengajuan', authenticateToken, pengajuan);
router.use('/dokument', dokument);

module.exports = router;

