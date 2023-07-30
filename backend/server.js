const express=require('express');
const app=express();
const cors=require('cors')
const userRoute=require('./Router/userRoute');
const employeeRoute=require('./Router/employeeRoutes')
const path=require('path')

const connectDb = require('./connection');


app.use(cors());
app.use(express.json());
app.use(userRoute)
app.use(employeeRoute)


connectDb();


const build=path.join(__dirname+'/Public')
// path.join(__dirname+'/public')
app.use(express.static(build))

app.get('*',async(req,res)=>{
    res.sendFile(path.join(build,'index.html'))
})




app.listen(4000,()=>{
    console.log("Listening on port 4000")
})