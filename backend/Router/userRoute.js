const express=require('express');
const { signUp,resetPassword, signin, adminSignUp } = require('../Controller/userController');
const { isRequestValidated, validateSignUpRequest, validateSignInrequest } = require('../Validation/userValidation');
const { sendMail } = require('../Middleware/sendMail');
const findUser = require('../Middleware/validateUser');
const { uploadXLsxFile } = require('../Controller/employeeControlller');
const router=express.Router();

const multer = require('multer');
const { requiresignin } = require('../Middleware/requiresSignin');
const upload = multer({ dest: 'uploads/' });



router.post('/signup',validateSignUpRequest,isRequestValidated,signUp);

router.post('/sendmailfor-resetpassword',sendMail);

router.post('/reset-password/:token',resetPassword);

router.post('/signin',validateSignInrequest,isRequestValidated,signin );

router.post('/addadmin',requiresignin,validateSignUpRequest,isRequestValidated,adminSignUp)

router.post('/uploadfile',upload.single('file'),uploadXLsxFile)


module.exports=router;