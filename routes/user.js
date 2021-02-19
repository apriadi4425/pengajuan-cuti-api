const express = require('express')
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/', UserController.GetAllUser);
router.put('/', UserController.EditUser);
router.delete('/', UserController.DeleteUser);

module.exports = router;
