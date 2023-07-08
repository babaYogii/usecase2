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
                    // Handle response from the server
                    alert('File uploaded successfully')
                    console.log('File uploaded successfully');
                })
                .catch(error => {
                    // Handle error
                    alert('File contains incomplete Data')
                    console.error('Error uploading file:', error);
                });
        } else {
            alert('Not a valid file')
            console.log('File type not supported');
        }
    };

    return (

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography></Typography>
            <Paper sx={{padding:5}} elevation={3}>
                <Typography variant="h4" component='h1'>Upload File</Typography>
                <Stack gap={5}>
                <TextField
                    
                    id="file-upload"
                    label="Choose File"
                    type="file"
                    onChange={handleFileChange}
                    error={!!error}
                    helperText={error}
                    />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                    </Stack>
            </Paper>
        </Box>

    );
};

export default UploadFile;
