const User=require('../Model/userModel');
const XLSX = require('xlsx');
const fs = require('fs');
const { emptyDir } = require('fs-extra');
const EmployeeSchema = require('../Model/employeeSchema')
const moment = require('moment');



const { BlobServiceClient } = require('@azure/storage-blob');




// ------------------------------------------------------------------------------------------------------------------    

exports.adminSignUp=async(req,res)=>{

      const {firstName,lastName,password,email,confirmPassword}=req.body;
      let{role,currentUserRole}=req.body;

      if(typeof role=='undefined'|| typeof currentUserRole === 'undefined'){
         return res.status(400).json({message:'Missing some fields'});
      }
          role=role.toLowerCase();
      
         currentUserRole=currentUserRole.toLowerCase();
      
      if(currentUserRole=='admin' ){
      try {
         const user = await User.findOne({ email: req.body.email });
         
         if (user) {
            return res.status(403).json({ message: "User already exists!" });
         }
     
         const _user = new User({ lastName, firstName, email, password, confirmPassword,role });
         const savedUser = await _user.save();
     
         return res.status(201).json({ message: "User created successfully!" });
      
       } catch (error) {
         return res.status(500).json({ message: "Internal server error" });
       }
      }else{
         return res.status(404).json({message:'Unauthorised access'});
      }
      }

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
            
            const requiredFields = ['employeeid', 'employeename', 'employeeemail', 'dob', 'dateofjoining', 'favouriteColour', 'favouritefood', 'placeofinterest', 'profession'];
            const missingFields = requiredFields.filter((field) => !jsonData[0].hasOwnProperty(field));
            if (missingFields.length > 0) {
              return res.status(400).json({ message: `Required fields are missing: ${missingFields.join(', ')}` });
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
                // profileimage: item.profileimage,
                profession: item.profession
              };
            });
      
            const operations = data.map((item) => {
              return {
                updateOne: {
                  filter: { employeeid: item.employeeid }, // Filter by employeeid
                  update: { $set: item }, // Set all the fields for the document
                  upsert: true, // If no matching document, insert a new one
                },
              };
            });
            
            // Execute the bulkWrite operation to perform insert/update
            await EmployeeSchema.bulkWrite(operations);
      
            await emptyDir('./uploads');
            res.status(200).json({ message: 'File uploaded and data extracted successfully' });
          } else {
            throw new Error('Invalid file type');
          }
        } catch (error) {
          res.status(500).json({ error: 'Error uploading file and extracting data',error });
        }
      };

exports.getAllEmployee = async (req, res) => {

        try {
      
          
      
          const employee = await EmployeeSchema.find();
          return res.status(200).json(employee.sort((a,b)=> a.employeeid-b.employeeid));
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



// ------------------------------------------------------Upload to azure blob----------------------------------------------------
async function uploadImageToBlobStorage(blobName, blobContent,profileimage) {
  console.log(profileimage)
  const connectionString = "DefaultEndpointsProtocol=https;AccountName=usecaseblobstorage;AccountKey=DLMrrMFe6dd2EKAjMVY6F/qZXtxi99DcvIxoaGjwWjQkRXQrMYV3xAtVvzAUwFiHkCAxaSQRcQ8u+AStNNoZYg==;EndpointSuffix=core.windows.net";
  const containerName = "profileimages";

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(blobContent, blobContent.length);
    if (profileimage) {
      const previousBlobName = extractBlobNameFromUrl(profileimage);
      const previousBlockBlobClient = containerClient.getBlockBlobClient(previousBlobName);
      await previousBlockBlobClient.deleteIfExists();
      console.log("Previous image deleted");
    }
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading image to blob storage:", error);
    return null;
  }
}
   
//---------------------------------------------Delete previous images of same person----------------------------------------------------------------------------------

function extractBlobNameFromUrl(blobUrl) {
  const urlSegments = blobUrl.split('/');
  return urlSegments[urlSegments.length - 1];
}

//----------------------------------------------Edit employee details based on his inputs-----------------------------------------------------------------------
exports.EditEmployee = async (req, res) => {
  console.log(req.body.employeeid);
  console.log(req.body);

  const userFound = await EmployeeSchema.findOne({ employeeid: req.body.employeeid });
  let uploadedImageUrl=null;
  if (userFound) {

    if(req.file){
    const blobContent = req.file.buffer;
    const getBlobName = originalName => {
      const identifier = Math.random().toString().replace(/0\./, '');
      return `${identifier}-${originalName}`;
    };

    const blobName = getBlobName(req.file.originalname);
       uploadedImageUrl = await uploadImageToBlobStorage(blobName, blobContent,userFound.profileimage);
       console.log(uploadedImageUrl)     
    }
    let profileimage=userFound.profileimage;
    if(uploadedImageUrl){
       profileimage=uploadedImageUrl
    }
          // Update employee schema
          const updateUser = await EmployeeSchema.findOneAndUpdate(
            { employeeid: req.body.employeeid },
            {
              profileimage: profileimage,
              favouriteColour: req.body.favouriteColour,
              favouritefood: req.body.favouritefood,
              placeofinterest: req.body.placeofinterest,
              profession: req.body.profession,
            },
            { new: true }
          );
    
          if (updateUser) {
            return res.status(200).json(updateUser);
          }
          return res.status(403).json({ message: "Error in updating user" });
  }

  res.status(404).json({ message: 'User id does not exist' });
};






  

