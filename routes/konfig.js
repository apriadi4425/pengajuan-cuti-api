const express = require('express')
const router = express.Router();

const KonfigController = require('../controller/KonfigController');

router.get('/', KonfigController.GetKonfig)
router.put('/update', KonfigController.UpdateKonfig)

module.exports = router;
