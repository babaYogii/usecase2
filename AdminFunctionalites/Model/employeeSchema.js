const mongoose=require('mongoose')




const employeeSchema = new mongoose.Schema({
  employeeid:{
     type:String,
     required:true
  },
  employeename: {
        type:String,
        required:true
    },
    employeeemail:{
      type:String,
      required:true,
    },
    dob: {
        type: Date,
        format: "yyyy-mm-dd"
      },
      dateofjoining:{
        type: Date,
        format: "yyyy-mm-dd"
      },favouriteColour:{
          type:String,
          required:true
      },favouritefood:{
        type:String,
        required:true
      },placeofinterest:{
        type:String,
        required:true
      },profileimage:{
        type:String,
        required:true
      },profession:{
        type:String,
        required:true
      }
  });


  module.exports=mongoose.model('EmployeeSchema',employeeSchema);
