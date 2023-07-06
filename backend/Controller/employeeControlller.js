const XLSX = require('xlsx');
const fs = require('fs');
const { emptyDir } = require('fs-extra');
const EmployeeSchema = require('../Model/employeeSchema')
const moment = require('moment');

exports.uploadXLsxFile = async (req, res) => {
  try {
    const filePath = req.file.path;

    const fileData = fs.readFileSync(filePath);


    const workbook = XLSX.read(fileData, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: 'yyyy/mm/dd',
      cellDates: true,
    });

    const data = jsonData.map((item) => (
      {
        name: item.name,
        dob: moment.utc(item.dob, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        anniversary: moment.utc(item.anniversary, 'YYYY/MM/DD').format('YYYY-MM-DD'),
      }));
    console.log(moment.utc(data[0].dob, 'YYYY/MM/DD').format('YYYY-MM-DD'))

    EmployeeSchema.insertMany(data);
    console.log(data)

    await emptyDir('./uploads');
    res.status(200).json({ message: 'File uploaded and data extracted successfully' });
  } catch (error) {
    console.error('Error uploading file and extracting data:', error);
    res.status(500).json({ error: 'Error uploading file and extracting data' });
  }
};


exports.getUpcomingBirthdays = async (req, res) => {
  try {
    const days = req.params.days;
    const today = new Date();
    // today.setDate(31);


    const employee = await EmployeeSchema.find().sort({ dob: 1 });

    






    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      var dob = employee[i].dob;
      const totalDaysInCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
      let currentMonth = today.getMonth() + 1;
      let dobMonth = dob.getMonth() + 1;
      let currentDate = today.getDate();
      let dobDate = dob.getDate();
      
      
      let endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7) //Get the end Date as 7days 


      switch (days) {
        case "7days":

          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7) //Get the end Date as 7days 
          currentMonth = today.getMonth() + 1; //On-going month
          dobMonth = dob.getMonth() + 1;//BirthDate month


          currentDate = today.getDate();//todays date
          dobDate = dob.getDate();//BirthDate Date


          //Main logic for calculating birthday
          if (dobMonth === currentMonth) {
            if (dobDate >= currentDate && dobDate <= currentDate + 7) {
              ans.push(employee[i]);
            }
          } else if (dobMonth === currentMonth + 1) {
            if (dobDate <= 7 - (totalDaysInCurrentMonth - currentDate)) {
              ans.push(employee[i]);
            }
          }
          console.log("7 days called ")
          break;
        case "14days":
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);//Get the end Date as 7days 

          if (dobMonth === currentMonth) {
            if (dobDate >= currentDate && dobDate <= currentDate + 14) {
              ans.push(employee[i]);
            }
          } else if (dobMonth === currentMonth + 1) {
            if (dobDate <= 14 - (totalDaysInCurrentMonth - currentDate)) {
              ans.push(employee[i]);
            }
          }
          console.log("14days called ")
          break;
        case "1month":
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);//Get the end Date as 7days 
          console.log(currentMonth);
          if (dobMonth === currentMonth) {
            if (dobDate >= currentDate && dobDate <= currentDate + 30) {
              ans.push(employee[i]);
            }
          } else if (dobMonth === currentMonth + 1) {
            if (dobDate <= 30 - (totalDaysInCurrentMonth - currentDate)) {
              ans.push(employee[i]);
            }
          }
          break;
        case "6months":
          const nextMonth = (today.getMonth() + 6) % 12;
          const nextYear = today.getFullYear() + Math.floor((today.getMonth() + 6) / 12);

          const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
           endDate = new Date(nextYear, nextMonth, today.getDate());

          for (let i = 0; i < employee.length; i++) {
            const dob = new Date(employee[i].dob);
            const dobMonth = dob.getMonth() + 1;
            const dobDate = dob.getDate();
           
           
           if(isDateInrange(dob)){
            ans.push(employee[i]);
           }

            
          }
          function isDateInrange(dob){
            // today=new Date(today);
            let sixMonthsLater = new Date();
            sixMonthsLater=new Date(sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6));
            console.log(sixMonthsLater.getMonth())
            return dob >= today && dob <= sixMonthsLater;

          }
          console.log("6 months called");
          break;







        default:
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7) //Get the end Date as 7days 
          currentMonth = today.getMonth() + 1; //On-going month
          dobMonth = dob.getMonth() + 1;//BirthDate month


          currentDate = today.getDate();//todays date
          dobDate = dob.getDate();//BirthDate Date


          //Main logic for calculating birthday
          if (dobMonth === currentMonth) {
            if (dobDate >= currentDate && dobDate <= currentDate + 7) {
              ans.push(employee[i]);
            }
          } else if (dobMonth === currentMonth + 1) {
            if (dobDate <= 7 - (totalDaysInCurrentMonth - currentDate)) {
              ans.push(employee[i]);
            }
          }
          console.log("7 days called ")
          break;
      }







    }

    res.status(200).json(ans);

  } catch (error) {
    console.error('Error in retreving data:', error);
    res.status(500).json({ error: 'Error in retreving data:' });
  }
};

// exports.getUpcomingBirthdays = async (req,res)=>{
//   const days=req.params.days;
//   const today = new Date();
// let nextDate;

// switch (days) {
//   case "7days":
//     nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
//     break;
//   case "14days":
//     nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
//     break;
//   case "1month":
//     nextDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
//     break;
//   case "6months":
//     nextDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
//     break;
//   default:
//     return res.status(400).json({ error: 'Invalid duration' });
// }

// const birthdays = await Employee.find({
//   dob: {
//     $gte: today,
//     $lt: nextDate
//   }
// });

// res.status(200).json(birthdays);
// }