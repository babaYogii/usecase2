const mongoose=require('mongoose')




const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    dob: {
        type: Date,
        format: "yyyy-mm-dd"
      },
    anniversary: Date,
  });


  module.exports=mongoose.model('EmployeeSchema',employeeSchema);
