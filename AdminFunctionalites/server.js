const express=require('express');
const app=express();
const cors=require('cors')
const adminRoute=require('./Router/adminRoute');
// const employeeRoute=require('./Router/employeeRoutes')
// const path=require('path')

const connectDb = require('./connection');


app.use(cors());
app.use(express.json());
app.use('/admin',adminRoute)
// app.use(employeeRoute)


connectDb();


// const build=path.join(__dirname+'/Public')
// // path.join(__dirname+'/public')
// app.use(express.static(build))

// app.get('*',async(req,res)=>{
//     res.sendFile(path.join(build,'index.html'))
// })




app.listen(4002,()=>{
    console.log("Listening on port 4002")
})