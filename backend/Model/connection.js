const mongoose=require('mongoose')


const url="mongodb+srv://yogeshkodlinge:Yogesh123@cluster0.ymuefl6.mongodb.net/";


const connectDb=async()=>mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(()=>{
    console.log("Connected successfully")})
    .catch((error)=>{
        console.log("Error in connection",error)
    })

   
module.exports=connectDb;    