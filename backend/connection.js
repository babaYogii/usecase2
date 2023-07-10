const mongoose=require('mongoose')


const url="mongodb+srv://yogeshkodlinge:Yogesh123@cluster0.ymuefl6.mongodb.net/";


const connectDb=async()=>
{
  
        const response=await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,})
           return response;
   


}   
module.exports=connectDb;    