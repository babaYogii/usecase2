const express=require('express');
const app=express();
const cors=require('cors')
const userRoute=require('./Router/userRoute');
const employeeRoute=require('./Router/employeeRoutes')
const connectDb = require('./connection');


app.use(cors());
app.use(express.json());
app.use(userRoute)
app.use(employeeRoute)

const coonectdb=async ()=>{
try{

    const response= await connectDb();
    console.log("connected successfully ...");
}catch(error){
    return console.log(error);
}
    
    
}

coonectdb();






app.listen(4000,()=>{
    console.log("Listening on port 4000")
})