const express = require('express')
const router = express.Router();

const LoginUserController = require('../controller/LoginUserController');

router.post('/login', LoginUserController.CobaLogin);

module.exports = router;
