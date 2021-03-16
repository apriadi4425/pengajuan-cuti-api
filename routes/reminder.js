const express = require('express')
const router = express.Router();

const ReminderController = require('../controller/ReminderController');

router.get('/', ReminderController.getReminder);
router.post('/create', ReminderController.createReminder);
router.delete('/delete', ReminderController.deleteReminder);

module.exports = router;
