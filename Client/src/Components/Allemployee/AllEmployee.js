import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { getAllEmployee } from '../../api/adminApi';
import { Card, IconButton, Typography } from '@mui/material';
import { Delete, Search,Edit } from '@mui/icons-material';
import axios from 'axios';
import { DeleteEmployeeApi, searchEmployee } from '../../api/adminApi';

const AllEmployee = ({ setAllemp, allemp }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [editOpen,setEditOpen]=React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);

    const fetchData = async () => {
        const response = await getAllEmployee();
        setAllemp(response.data);
    };

    const DeleteEmployee = async (id) => {
        try {
            const response = await DeleteEmployeeApi(id);
            setAllemp(allemp.filter(emp => emp._id !== id));
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const searchEmp = async (q) => {
        // console.log(q)
        
        try {
            const response = await searchEmployee(q.replace(/[^a-zA-Z0-9]/g, ''));
            // console.log(response)
            setAllemp(response.data);

        } catch (error) {
            alert(error);
            // console.log(error)
        }
    }

    React.useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);


    const handleInputChange = (event) => {
        const { value } = event.target;
        // console.log(value)
        setSearchQuery(value);
        searchEmp(value); // Call the searchEmp function whenever the value changes
    };
// ---------------------------------------------------------------Edit component-------------------------------------------------------------


const EditModal = ({ isOpen, onClose }) => {
    let [newformData, setnewFormData] = React.useState({...selectedEmployee}); // State to manage form data
    const [image,setImage]=React.useState(null)
    const [imageSizeExceeded,setImageSizeExceeded]=React.useState(false);
    const imageSize=50000;

    // if(image && image.size > fileSize){
    //     console.log("File size exedded",image.size/1000)
    // }else{
    //     console.log("In limit",image && Math.round(image.size/1000))
    // }
    useEffect(()=>{},[image])
  
   
        const handleFormSubmit = async (e) => {
            e.preventDefault();
            // && !image.type.startsWith('image/')
            console.log(image.size,imageSize)
            if(image && image.size < imageSize  ){
                if(image.type.startsWith('image/'))
            try {
              const formData = new FormData();
              formData.append('employeename', newformData.employeename);
              formData.append("employeeid",newformData.employeeid)
              formData.append("profession",newformData.profession)
              formData.append("placeofinterest",newformData.placeofinterest)
              formData.append("favouritefood",newformData.favouritefood)
              formData.append("favouriteColour",newformData.favouriteColour)
              // Append other form data properties here
        
              if (image) {
                formData.append('image', image);
              }
        
              const response = await axios.put('/admin/update', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
        
              console.log('Update successful:', response.data);
              alert("Updated successfully")
              onClose(); // Close the modal after successful submission
            } catch (error) {
              console.error('Error updating:', error);
              alert('An error occurred while updating.');
            }
          }else{
            setImageSizeExceeded(true);
          }
        }
    
    
  
    return (
        <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
        {selectedEmployee!=null &&
        <Box sx={{display:'flex',flexDirection:'column',gap:2}}>
            <Typography >
            {newformData.employeename}
            </Typography>

          <TextField
            label="Favourite color"
            name="employeeName"
            value={newformData.favouriteColour}
            onChange={(e) => setnewFormData({ ...newformData, favouriteColour: e.target.value })}
            />

          <TextField
            label="Favourite Food"
            name="favouritefood"
            value={newformData.favouritefood}
            onChange={(e) => setnewFormData({ ...newformData, favouritefood: e.target.value })}
            />
          <TextField
            label="Favourite Place"
            name="placeofinterest"
            value={newformData.placeofinterest}
            onChange={(e) => setnewFormData({ ...newformData, placeofinterest: e.target.value })}
            />
          <TextField
            label="Current Role"
            name="profession"
            value={newformData.profession}
            onChange={(e) => setnewFormData({ ...newformData, profession: e.target.value })}
            />
            <InputLabel>Choose profile image</InputLabel>
            <Input accept="image/*" 
            type="file"
            inputProps={{ onChange: (event) => {
                setImage(event.target.files[0]);} }}
            />{
                imageSizeExceeded ?
            <Typography variant='caption' color='red'>FileSize cannot be Greater than {Math.round(imageSize/1000)} kb Your file is {image && Math.round(image.size/100)}kb</Typography>
          :
          <Typography variant='caption' color='green'>Good to Go Ahead</Typography>
        }{
            (image && !image.type.startsWith('image/') )&&
        <Typography variant='caption' color='red'>Select a proper image</Typography>
         }   </Box>
       

        }
          {/* Add other form fields similarly */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  













    return (
        <Box
            sx={{
                height: '100vh',
                width: '80vw',
                my: 10

            }}
        >
            <TextField
                label="Search Employee"
                value={searchQuery}
                onChange={handleInputChange}
                sx={{my:2,mt:0}}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <Search />
                      </InputAdornment>
                    ),
                  }}
            />
            {allemp && allemp.length > 0 && (


                <Grid container spacing={4} >

                    {allemp.map((emp, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>

                            <Card
                                sx={{
                                    minWidth: 260,
                                    boxShadow: 6,
                                    height: 335,
                                    position: 'relative',
                                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230099ff' fill-opacity='1' d='M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,186.7C672,203,768,245,864,234.7C960,224,1056,160,1152,160C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") no-repeat`,
                                    backgroundSize: '500%',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            >
                                <IconButton sx={{ position: 'absolute', right: 10, top: 8, }} onClick={() => {
                                    DeleteEmployee(emp._id)
                                }}>
                                    <Delete sx={{ color: 'Amber.main' }} />
                                </IconButton>
                                <IconButton sx={{ position: 'absolute', right: 40, top: 8, }} onClick={() => {
                               setSelectedEmployee(emp)
                               setEditOpen(true);
                               }}>
                                    <Edit sx={{ color: 'Amber.main' }} />
                                </IconButton>
                                <Box className="upper-box" sx={{ p: 3, }}>
                                    <Avatar src={emp.profileimage} sx={{ width: 100, height: 100, border: '8px solid white', }} />
                                </Box>
                                <Box className="lower-box" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography style={{ fontWeight: 550, fontSize: "24px" }}>{emp.employeename}</Typography>
                                        <Typography style={{ fontWeight: 500, fontSize: "12px" }}>{emp.profession}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                        <Box sx={{ fontSize: "14px", display: "flex", alignItems: "baseline" }}>
                                            <Typography sx={{ width: "40px", marginRight: "5px" }}>ID</Typography>
                                            <Typography>:{emp.employeeid}</Typography>
                                        </Box>
                                        <Box sx={{ fontSize: "14px", display: "flex", alignItems: "baseline" }}>
                                            <Typography sx={{ width: "40px", marginRight: "5px" }}>DOB</Typography>
                                            <Typography>:{(emp.dob).toString().slice(0, 10)}</Typography>
                                        </Box>
                                        <Box sx={{ fontSize: "14px", display: "flex", alignItems: "baseline" }}>
                                            <Typography sx={{ width: "40px", marginRight: "5px" }}>DOJ</Typography>
                                            <Typography>:{(emp.dateofjoining).toString().slice(0, 10)}</Typography>
                                        </Box>
                                        <Box sx={{ fontSize: "14px", display: "flex", alignItems: "baseline" }}>
                                            <Typography sx={{ width: "40px", marginRight: "5px" }}>email</Typography>
                                            <Typography>:{(emp.employeeemail)}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <EditModal isOpen={editOpen} onClose={() => setEditOpen(false)} selectedEmployee />
        </Box>
    );
};

export default AllEmployee;
