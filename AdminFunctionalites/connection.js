const mongoose=require('mongoose')
// require("dotenv").config()


const url="mongodb://yogesh:a8HF0dbf8kmOEFsmxdmc0Xt9V31o3kabLUzbeQluxbJxUO4AgLIHbP4ZMP5wqtD2VW4gh2BGe9MfACDboEGzPw==@yogesh.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@yogesh@";
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