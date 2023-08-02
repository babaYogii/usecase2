const User=require('../Model/userModel')



const findUser=async(req,res,next)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
           next();
        }else{

            res.status(400).json({message:"Check email id || Create account"})
        }
       
        
    }
        catch(error){
            console.log("Something went wrong "+ error)
        }
}

module.exports=findUser;