const express = require('express')
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/saya', UserController.GetDetail);
router.get('/list-saya', UserController.GetUserSaya);
router.get('/', UserController.GetAllUser);
router.put('/', UserController.EditUser);

router.put('/block', UserController.BlockUser);
router.delete('/', UserController.DeleteUser);

module.exports = router;
