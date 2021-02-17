const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../midleware');

const LoginUserController = require('../controller/LoginUserController');

router.post('/login', LoginUserController.CobaLogin);
router.post('/register', authenticateToken, LoginUserController.CreateUser);

module.exports = router;
