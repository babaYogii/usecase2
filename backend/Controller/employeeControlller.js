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
      
      const requiredFields = ['employeeid', 'employeename', 'employeeemail', 'dob', 'dateofjoining', 'favouriteColour', 'favouritefood', 'placeofinterest', 'profileimage', 'profession'];
      const missingFields = requiredFields.filter((field) => !jsonData[0].hasOwnProperty(field));
      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Required fields are missing: ${missingFields.join(', ')}` });
      }
      
      const hasEmptyField = jsonData.some((item) => {
        return Object.values(item).some((value) => {
          return value === null || value === '';
        });
      });
      if (hasEmptyField) {
        return res.status(400).json({ message: "Incomplete data. Some fields are empty." });
      }

      // Check for missing values in all columns
      const missingValues = [];
      jsonData.forEach((item, index) => {
        const missingColumns = requiredFields.filter((field) => !item[field]);
        if (missingColumns.length > 0) {
          missingValues.push({ row: index + 1, missingColumns });
        }
      });

      if (missingValues.length > 0) {
        return res.status(400).json({ message: "Missing values in some columns", missingValues });
      }

      const data = jsonData.map((item) => {
        // Validate date format for 'dob' and 'dateofjoining' columns
        const dob = moment.utc(item.dob, 'YYYY/MM/DD').format('YYYY-MM-DD');
        const dateofjoining = moment.utc(item.dateofjoining, 'YYYY/MM/DD').format('YYYY-MM-DD');
        if (!moment(dob, 'YYYY-MM-DD', true).isValid() || !moment(dateofjoining, 'YYYY-MM-DD', true).isValid()) {
          throw new Error('Invalid date format in the XLSX file');
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
          profileimage: item.profileimage,
          profession: item.profession
        };
      });

      const existingEmployeeIds = await EmployeeSchema.distinct('employeeid', { employeeid: { $in: data.map((item) => item.employeeid) } });
      const duplicateEmployeeIds = data.filter((item) => existingEmployeeIds.includes(item.employeeid));
      if (duplicateEmployeeIds.length > 0) {
        return res.status(400).json({ message: "Duplicate employee ids found in the XLSX file" });
      }

      // Filter out any row that has an empty value before inserting data
      const validData = data.filter((item) => !Object.values(item).some((value) => value === null || value === ''));
      EmployeeSchema.insertMany(validData);

      await emptyDir('./uploads');
      res.status(200).json({ message: 'File uploaded and data extracted successfully' });
    } else {
      throw new Error('Invalid file type');
    }
  } catch (error) {
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


    const employee = await EmployeeSchema.find();


    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      const eventDate = employee[i].dob;


      switch (days) {
        case "7days":

          if (isUpcomingEventWithinLimit(eventDate, today, 7)) {
            ans.push(employee[i]);
          }

          break;
        case "14days":

          if (isUpcomingEventWithinLimit(eventDate, today, 14)) {
            ans.push(employee[i]);
          }

          break;
        case "1month":
          if (isUpcomingEventWithinLimit(eventDate, today, 30)) {
            ans.push(employee[i]);
          }
          break;
        case "6months":
          if (isUpcomingEventWithinLimit(eventDate, today, 180)) {
            ans.push(employee[i]);
          }
          break;

        default:
          if (isUpcomingEventWithinLimit(eventDate, today, 0)) {
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

    const employee = await EmployeeSchema.find();

    const ans = [];

    for (var i = 0; i < employee.length; i++) {
      var eventDate = employee[i].dateofjoining;

      switch (days) {
        case "7days":

          if (isUpcomingEventWithinLimit(eventDate, today, 7)) {
            ans.push(employee[i]);
          }

          break;
        case "14days":

          if (isUpcomingEventWithinLimit(eventDate, today, 14)) {
            ans.push(employee[i]);
          }

          break;
        case "1month":
          if (isUpcomingEventWithinLimit(eventDate, today, 30)) {
            ans.push(employee[i]);
          }
          break;
        case "6months":
          if (isUpcomingEventWithinLimit(eventDate, today, 180)) {
            ans.push(employee[i]);
          }
          break;

        default:
          if (isUpcomingEventWithinLimit(eventDate, today, 0)) {
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

exports.getAllEmployee = async (req, res) => {

  try {
    const employee = await EmployeeSchema.find();
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error)
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const id=req.params.id;
    const employee=await EmployeeSchema.findOneAndDelete({_id:id});
    if(employee)
    return res.status(204).json({message:'Employee deleted successfully'})
    else{
      return res.status(404).json({message:'Employee not found'})
    }

  } catch (error) {
         console.log(error);
       return res.status(403).json({message:'Error in deleting employee '});
  }
}


exports.findEmployee=async(req,res)=>{
  const searchQuery = req.params.q; // Retrieve the search query from the URL parameter
  try {
    const searchResults = await EmployeeSchema.find({
      $or: [
        { employeename: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive pattern match on the name field
        { employeeemail: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive pattern match on the email field
        { employeeid: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive pattern match on the employeeid field
      ],
    });

    res.status(200).json(searchResults);
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while performing the search.' });
  }
}