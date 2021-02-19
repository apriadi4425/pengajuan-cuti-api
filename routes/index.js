const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../midleware')

const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', authenticateToken, user);

module.exports = router;

