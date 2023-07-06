const express=require('express');
const app=express();
const cors=require('cors')
const userRoute=require('./Router/userRoute');
const employeeRoute=require('./Router/employeeRoutes')
const connectDb = require('./Model/connection');


app.use(cors());
app.use(express.json());
app.use(userRoute)
app.use(employeeRoute)

connectDb();





app.listen(4000,()=>[
    console.log("Listening on port 4000")
])