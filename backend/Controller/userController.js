const jwt=require('jsonwebtoken')
const User=require('../Model/userModel');
const { JoinFullTwoTone } = require('@mui/icons-material');



exports.signUp=async(req,res)=>{

   const {firstName,lastName,password,email,confirmPassword}=req.body;
   
   try {
      const user = await User.findOne({ email: req.body.email });
      
      if (user) {
         return res.status(403).json({ message: "User already exists!" });
      }
  
      const _user = new User({ lastName, firstName, email, password, confirmPassword });
      const savedUser = await _user.save();
  
      return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  
// ------------------------------------------------------------------------------------------------------------------    


}



exports.resetPassword=async(req,res)=>{
   try{
      const token=req.params.token;
      const password=req.body.password;
      const validateToken=jwt.verify(token,"json");
        const bodyemail=validateToken.email;
        console.log(validateToken)
   //   res.send(token)
   //   console.log(validateToken)
   if(validateToken){
      const userFound = await User.findOne({ email: bodyemail });
        console.log(userFound.password);
        if(userFound.password===password){
         return res.status(400).json({message:"old password and new password are same"})
        }
        
        const updatedUser = await User.findOneAndUpdate(
         { email:bodyemail }, // Filter condition
         { password: password }, // Update fields
         { new: true } // Options: Return the updated document
       );
   
       return res.status(200).json({message:" Url reset successfull",updatedUser});
   }
}catch(error){
      console.log(error)
      return res.status(400).json({message:'Invalid Url'});
   }
}