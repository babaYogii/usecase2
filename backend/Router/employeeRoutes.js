const express = require('express');
const { getUpcomingBirthdays, getUpcomingAnniversary } = require('../Controller/employeeControlller');
const router = express.Router();
// const employeeController = require('../Controller/employeeControlller');

// Birthdays routes
router.get('/birthdays/:days', getUpcomingBirthdays);

// Work anniversaries routes
router.get('/anniversaries/:days', getUpcomingAnniversary);

module.exports = router;