const express=require('express');
const {  adminSignUp,getAllEmployee, deleteEmployee, findEmployee, EditEmployee } = require('../Controller/userController');
const { isRequestValidated, validateSignUpRequest } = require('../Validation/userValidation');
const { uploadXLsxFile } = require('../Controller/userController');
const router=express.Router();

const multer = require('multer');
inMemoryStorage = multer.memoryStorage()
, uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const { requiresignin } = require('../Middleware/requiresSignin');
const upload = multer({ dest: 'uploads/' });



router.post('/addadmin',requiresignin,validateSignUpRequest,isRequestValidated,adminSignUp)

router.post('/uploadfile',upload.single('file'),uploadXLsxFile)

//Get all employee
router.get('/employee', getAllEmployee);

router.delete('/employee/:id',requiresignin,deleteEmployee);

router.put('/update',uploadStrategy,EditEmployee);


router.get('/employee/:q',requiresignin,findEmployee);

module.exports=router;


//Admin functionalities

//--> Add another admin
//--> Upload file 
//--> View all employee
//--> Delete specific employee
//--> Search employee based on name,emp id
