const {validationResult,check} =require('express-validator')


exports.validateSignUpRequest=[
    check('firstName').trim().notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage("Please enter a valid email"),
    check('password').trim().isLength({min:6,max:10}).withMessage('Enter the password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/).withMessage('follow the password criteria'),
    check('confirmPassword').isLength({min:6,max:10}).withMessage('Confirm password is required').custom(async(confirmPassword,{req})=>{
      const password = req.body.password 
      if(password !== confirmPassword){
        throw new Error('Passwords && confirm password must be same')
      }
    })
]

exports.validateSignInrequest=[
  check('email').isEmail().withMessage("Please enter a valid email"),
  check('password').isLength({min:6}).withMessage('Enter the password'),
]

exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
      return res.status(400).json({message:errors.array()[0].msg})
    }
    next();
}