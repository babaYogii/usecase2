const express=require('express');
const { signUp,resetPassword, signin } = require('../Controller/userController');
const { isRequestValidated, validateSignUpRequest, validateSignInrequest } = require('../Validation/userValidation');
const { sendMail } = require('../Middleware/sendMail');
const router=express.Router();





router.post('/signup',validateSignUpRequest,isRequestValidated,signUp);

router.post('/signin',validateSignInrequest,isRequestValidated,signin );

router.post('/sendmailfor-resetpassword',sendMail);

router.put('/reset-password/:token',resetPassword);




module.exports=router;