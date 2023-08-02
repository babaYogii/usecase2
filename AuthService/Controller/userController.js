const jwt=require('jsonwebtoken')
const User=require('../Model/userModel');




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
      return res.status(500).json({ message: "Internal server error" });
    }
  
   }
   // ------------------------------------------------------------------------------------------------------------------    

   exports.adminSignUp=async(req,res)=>{

      const {firstName,lastName,password,email,confirmPassword}=req.body;
      let{role,currentUserRole}=req.body;

      if(typeof role=='undefined'|| typeof currentUserRole === 'undefined'){
         return res.status(400).json({message:'Missing some fields'});
      }
          role=role.toLowerCase();
      
         currentUserRole=currentUserRole.toLowerCase();
      
      if(currentUserRole=='admin' ){
      try {
         const user = await User.findOne({ email: req.body.email });
         
         if (user) {
            return res.status(403).json({ message: "User already exists!" });
         }
     
         const _user = new User({ lastName, firstName, email, password, confirmPassword,role });
         const savedUser = await _user.save();
     
         return res.status(201).json({ message: "User created successfully!" });
      
       } catch (error) {
         return res.status(500).json({ message: "Internal server error" });
       }
      }else{
         return res.status(404).json({message:'Unauthorised access'});
      }
      }
      


exports.resetPassword=async(req,res)=>{
   try{
      const token=req.params.token;
      const password=req.body.password;
      const confirmPassword=req.body.confirmPassword;
      const validateToken=jwt.verify(token,"json");
        const bodyemail=validateToken.email;
   
   if(validateToken){
      const userFound = await User.findOne({ email: bodyemail });
        if(userFound.password===password){
         return res.status(400).json({message:"old password and new password are same"})
        }
        
        const updatedUser = await User.findOneAndUpdate(
         { email:bodyemail }, 
         { password: password,confirmPassword:confirmPassword },
         { new: true } 
       );
   
       return res.status(200).json({message:" Password reset successfull",updatedUser});
   }
   return res.status(403).json({message:'Email not resgistered'})
}catch(error){
      return res.status(400).json({message:'Invalid Url/Time exceed'});
   }
}



exports.signin = async(req, res) => {

try {
   
console.log("Request recived ...");

  const userFound= await User.findOne({ email: req.body.email })
   
       if (userFound) {

           if (userFound.password === req.body.password) {
               const token = jwt.sign({ _id: userFound._id, role: userFound.role },'json', { expiresIn: '4d' })
               const { _id, firstName, lastName, email, fullName,role } = userFound;
               if (token) {
                   res.status(200).json({
                       token: token,
                       user: { _id, firstName, lastName, email, fullName,role },
                       message: "Login success full"
                   })
               }
           } else {
               return res.status(401).json({ message: "Invalid login credentials"});
           }
       }else{
         return res.status(404).json({message:"user not found!! Create one"})
       }
      //  userFound = null;
      } catch (error) {
         return res.status(500).json({ message: "Internal server error" });
      }
  
}
