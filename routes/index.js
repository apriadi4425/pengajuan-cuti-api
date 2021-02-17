const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../midleware')

const auth = require('./auth');

router.use('/auth', auth);

module.exports = router;

