const User=require('../Model/userModel')



const findUser=async(req,res,next)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
           console.log("User exist...");
           next();
        }else{

            console.log("User does not exist")
            res.status(400).json({message:"Check email id || Create account"})
        }
       
        
    }
        catch(error){
            console.log("Something went wrong "+ error)
        }
}

module.exports=findUser;