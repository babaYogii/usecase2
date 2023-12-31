var apm = require('elastic-apm-node').start({
    serviceName: 'Event-service',
    secretToken: '2RvuKXH7g2KNkGEoNq',
    serverUrl: 'https://fedd99c6c2a9445a9235a41a897dc998.apm.us-central1.gcp.cloud.es.io:443',
    environment: 'my-environment',
    logLevel:'trace'
})
const express=require('express');
const app=express();
const cors=require('cors')
// const userRoute=require('./Router/userRoute');
//https://mslabs.cloudguides.com/guides/AZ-104%20Exam%20Guide%20-%20Microsoft%20Azure%20Administrator%20Exercise%201
const employeeRoute=require('./Router/employeeRoutes')
const path=require('path')




app.use(apm.middleware.connect());
const connectDb = require('./connection'); 
app.use(cors());
app.use(express.json());
app.use("/events",employeeRoute)


connectDb();


const build=path.join(__dirname+'/Public')
// path.join(__dirname+'/public')
app.use(express.static(build))

app.get('*',async(req,res)=>{
    res.sendFile(path.join(build,'index.html'))
})

// Add this to the very top of the first file loaded in your app


app.listen(4000,()=>{
    console.log("Listening on port 4000")
})