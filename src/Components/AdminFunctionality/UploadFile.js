import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            setError(null);
        } else {
            setSelectedFile(null);
            setError('Only XLSX files are allowed.');
        }
    };

    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(()=>{
        if (userRole.toUpperCase() !== `"ADMIN"`) {
          
            navigate('/dashboard'); 
          }
    })

    const handleSubmit = () => {
        // Handle the selected file
        if (selectedFile && !error) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('http://localhost:4000/uploadfile', formData)
                .then(response => {
                    alert('File uploaded successfully')
                    navigate('/dashboard');
                    console.log('File uploaded successfully');
                })
                .catch(error => {
                    alert('File contains incomplete/repeated Data/Date format is not in YYYY-MM-DD')
                    console.error('Error uploading file:', error);
                });
        } else {
            alert('File type not supported')
            console.log('File type not supported/Date format is not in YYYY-MM-DD');
        }
    };

    return (

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',width:'70vw' }}>
            <Typography></Typography>
            <Paper sx={{padding:5}} elevation={22}>
                <Typography variant="h4" component='h1' sx={{color:'tertiary.main'}}>Upload File</Typography>
                <Stack gap={5} sx={{p:2}}>
                <TextField
                    accept=".xlsx"
                    id="file-upload"
                    label="Choose File"
                    type="file"
                    onChange={handleFileChange}
                    error={!!error}
                    helperText={error}
                    />
                <Typography variant='caption' fontSize='13px' sx={{color:'#3498db',my:-4.2,fontWeight:550}}>   * All dates must in YYYY-MM-DD Format</Typography>
                    
                <Button variant="contained" type='submit' color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                    </Stack>
            </Paper>
        </Box>

    );
};

export default UploadFile;
