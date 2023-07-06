const express = require('express');
const { getUpcomingBirthdays } = require('../Controller/employeeControlller');
const router = express.Router();
// const employeeController = require('../Controller/employeeControlller');

// Birthdays routes
router.get('/birthdays/:days', getUpcomingBirthdays);

// Work anniversaries routes
// router.get('/anniversaries/:days', getUpcomingAnniversaries);

module.exports = router;