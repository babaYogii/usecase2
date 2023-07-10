import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AddUser } from '../../api/adminApi';


const AddAdmin = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('button clicked');
        console.log(userData);
        console.log(selectedRole);
        try{
            const response=await AddUser({...userData,role:selectedRole});
            alert("Success")
            console.log(response);
        }catch(error){
            alert(error.response.data.message)
            
            console.log(error)
        }

    };

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={22} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '25%',p:4,gap:2 }} >
                <Typography variant='h4' sx={{color:'primary.main'}}>Add User</Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <Box sx={{display:'flex',flexDirection:'column', gap:2.5}}>

                        <TextField type="text" label="First Name" required name="firstName" onChange={handleChange} fullWidth />


                        <TextField type="text" label="Last Name" required name="lastName" onChange={handleChange} fullWidth />


                        <TextField type="text" label="Email" required name="email" onChange={handleChange} fullWidth />


                        <TextField type="password" label="Password" required name="password" onChange={handleChange} fullWidth />


                        <TextField type="password" label="Confirm Password" required name="confirmPassword" onChange={handleChange} fullWidth />


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
