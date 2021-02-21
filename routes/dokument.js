const express = require('express')
const router = express.Router();

const GenerateDokument = require('../controller/GenerateDokument');

router.get('/buat', GenerateDokument.BuatDokument);

module.exports = router;
