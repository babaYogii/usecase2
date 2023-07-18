const mongoose=require('mongoose')
require("dotenv").config()


const url=process.env.DB_URL;
// const url="mongodb+srv://yogeshkodlinge:Yogesh123@cluster0.ymuefl6.mongodb.net/";


const connectDb=async(req,res)=>
{
  try{
    const response=await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,})
        console.log("Connected successfully")
     

  }catch(error){
    res.status(500).json({message:'Internal server error'})
  }
    


}   
module.exports=connectDb;    