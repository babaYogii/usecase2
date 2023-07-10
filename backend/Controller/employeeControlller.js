const XLSX = require('xlsx');
const fs = require('fs');
const { emptyDir } = require('fs-extra');
const EmployeeSchema = require('../Model/employeeSchema')
const moment = require('moment');

exports.uploadXLsxFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
  
    if (fileExtension === 'xlsx') {
      const fileData = fs.readFileSync(filePath);
      const workbook = XLSX.read(fileData, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        dateNF: 'yyyy/mm/dd',
        cellDates: true,
      });
      console.log(jsonData);
      try{
      const requiredColumns = ['employeeid', 'employeename', 'employeeemail', 'dob', 'dateofjoining', 'favouriteColour', 'favouritefood', 'placeofinterest'];
      const fileColumns = Object.keys(jsonData[0]);
      
      const hasAllColumns = requiredColumns.every((column) => fileColumns.includes(column));
      if (!hasAllColumns) {
        return res.status(400).json({message:"Wrong file does not contain all data"})
        // throw new Error('File does not contain all the required columns');
      }
      
    }catch(e){
      console.log(e);
    }
    const data = jsonData.map((item) => {
      // Validate date format for 'dob' and 'dateofjoining' columns
      const dob = moment.utc(item.dob, 'YYYY/MM/DD').format('YYYY-MM-DD');
      const dateofjoining = moment.utc(item.dateofjoining, 'YYYY/MM/DD').format('YYYY-MM-DD');
      if (!moment(dob, 'YYYY-MM-DD', true).isValid() || !moment(dateofjoining, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({message:'Invalid date format in the XLSX file'});
      }

      return {
        employeeid: item.employeeid,
        employeename: item.employeename,
        employeeemail: item.employeeemail,
        dob,
        dateofjoining,
        favouriteColour: item.favouriteColour,
        favouritefood: item.favouritefood,
        placeofinterest: item.placeofinterest,
      };
    });
  
      EmployeeSchema.insertMany(data);
  
      await emptyDir('./uploads');
      res.status(200).json({ message: 'File uploaded and data extracted successfully' });
    } else {
      throw new Error('Invalid file type');
    }
  } catch (error) {
    console.error('Error uploading file and extracting data:', error);
    res.status(500).json({ error: 'Error uploading file and extracting data' });
  }
  

};




const isUpcomingEventWithinLimit = (eventDate, todayDate, extend) => {
  const date = new Date(eventDate);
  const today = new Date(todayDate);
  const limit = new Date(today);
  limit.setDate(today.getDate() + extend);
  const birthDay = date.getDate();
  const birthMonth = date.getMonth();

  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth() && birthMonth === limit.getMonth()) {
    return birthDay >= today.getDate() && birthDay <= limit.getDate();
  }
  if (birthMonth === today.getMonth()) {
    return birthDay >= today.getDate();
  }
  if (birthMonth === limit.getMonth()) {
    return birthDay <= limit.getDate();
  }
  const overflown = limit.getFullYear() > today.getFullYear();
  if (overflown) {
    return birthMonth > today.getMonth() || birthMonth < limit.getMonth();
  }
  return birthMonth > today.getMonth() && birthMonth < limit.getMonth();
};




exports.getUpcomingBirthdays = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();
    // today.setDate(31);


    const employee = await EmployeeSchema.find().sort({ dob: 1 });



    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      const eventDate = employee[i].dob;
      

      switch (days) {
        case "7days":
  
           if(isUpcomingEventWithinLimit(eventDate,today,7)){
            ans.push(employee[i]);
           }
         
          break;
        case "14days":

          if(isUpcomingEventWithinLimit(eventDate,today,14)){
            ans.push(employee[i]);
           }
          
          break;
        case "1month":
          if(isUpcomingEventWithinLimit(eventDate,today,30)){
            ans.push(employee[i]);
           }
          break;
        case "6months":
          if(isUpcomingEventWithinLimit(eventDate,today,180)){
            ans.push(employee[i]);
           }
          break;

        default:
          if(isUpcomingEventWithinLimit(eventDate,today,365)){
            ans.push(employee[i]);
           }
          break;
      }







    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};


exports.getUpcomingAnniversary = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();
   
    const employee = await EmployeeSchema.find().sort({ dob: 1 });
     
    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      var eventDate = employee[i].dateofjoining;

      switch (days) {
        case "7days":
  
           if(isUpcomingEventWithinLimit(eventDate,today,7)){
            ans.push(employee[i]);
           }
         
          break;
        case "14days":

          if(isUpcomingEventWithinLimit(eventDate,today,14)){
            ans.push(employee[i]);
           }
          
          break;
        case "1month":
          if(isUpcomingEventWithinLimit(eventDate,today,30)){
            ans.push(employee[i]);
           }
          break;
        case "6months":
          if(isUpcomingEventWithinLimit(eventDate,today,180)){
            ans.push(employee[i]);
           }
          break;

        default:
          if(isUpcomingEventWithinLimit(eventDate,today,365)){
            ans.push(employee[i]);
           }
          break;
      }

    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};