import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AddUser } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const AddAdmin = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
   const navigate=useNavigate();
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleSubmit =async (e) => {
        e.preventDefault();
        // console.log('button clicked');
        // console.log(userData);
        // console.log(selectedRole);
        try{
            const response=await AddUser({...userData,role:selectedRole});
            alert("Success")
            
            console.log(response);
        }catch(error){
            alert(error.response.data.message)
            
            // console.log(error)
        }
        

    };

    const userRole = localStorage.getItem('role');

    React.useEffect(()=>{
        if (userRole.toUpperCase() !== `"ADMIN"`) {
                     navigate('/dashboard'); 
          }
    })


    return (
        <Box sx={{ display: 'flex', width: '70vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={23} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',p:8,gap:2,width: isSmallScreen ? '100%' : 'auto'  }} >
                <Typography variant='h4' sx={{color:'primary.main'}}>Add User</Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <Box sx={{display:'flex',flexDirection:'column', gap:2.5}}>

                        <TextField type="text" label="First Name" required name="firstName" onChange={handleChange}  />


                        <TextField type="text" label="Last Name" required name="lastName" onChange={handleChange}  />


                        <TextField type="text" label="Email" required name="email" onChange={handleChange}  />


                        <TextField type="password" label="Password" required name="password" onChange={handleChange}  />


                        <TextField type="password" label="Confirm Password" required name="confirmPassword" onChange={handleChange}  />


                        <Select
                            value={selectedRole}
                            onChange={handleRoleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select role' }}
                            variant="outlined"
                            fullWidth
                            sx={{ height: 32, width: 270 }}
                        >
                            <MenuItem value="" disabled>
                                Select Role
                            </MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>

                        <Button variant="contained" type="submit" sx={{ display: 'block' }}>
                            Create
                        </Button>
                    </Box>
                </form>
            </Paper >
        </Box >
    );
};

export default AddAdmin;
