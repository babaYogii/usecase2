const express = require('express');
const { getUpcomingBirthdays, getUpcomingAnniversary, getAllEmployee } = require('../Controller/employeeControlller');
const { requiresignin } = require('../Middleware/requiresSignin');
const router = express.Router();
// const employeeController = require('../Controller/employeeControlller');

// Birthdays routes
router.get('/birthdays/:days', requiresignin,getUpcomingBirthdays);

// Work anniversaries routes
router.get('/anniversaries/:days', requiresignin,getUpcomingAnniversary);

//Get all employee
router.get('/employee', getAllEmployee);

module.exports = router;