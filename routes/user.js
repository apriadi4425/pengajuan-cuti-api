const express = require('express')
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/all', UserController.GetAllUser);

module.exports = router;
