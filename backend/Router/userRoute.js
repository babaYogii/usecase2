const express=require('express');
const { signUp,resetPassword } = require('../Controller/userController');
const { isRequestValidated, validateSignUpRequest } = require('../Validation/userValidation');
const { sendMail } = require('../Middleware/sendMail');
const findUser = require('../Middleware/validateUser');
const { uploadXLsxFile } = require('../Controller/employeeControlller');
const router=express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.post('/signup',validateSignUpRequest,isRequestValidated,signUp);

router.post('/sendmailfor-resetpassword',sendMail);

router.post('/reset-password/:token',resetPassword);

router.post('/uploadfile',upload.single('file'),uploadXLsxFile)


module.exports=router;