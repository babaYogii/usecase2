import { Avatar, Box, Grid } from '@mui/material';
import React from 'react';
import { getAllEmployee } from '../../api/userApi';
import { Card,  IconButton, Typography } from '@mui/material';
import {  Delete } from '@mui/icons-material';

const AllEmployee = ({ setAllemp, allemp }) => {
    const fetchData = async () => {
        const response = await getAllEmployee();
        setAllemp(response.data);
    };

    React.useEffect(() => {
        fetchData();
    });

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '80vw',
                my: 55
            }}
        >
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
                                    // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230099ff' fill-opacity='1' d='M0,320L48,309.3C96,299,192,277,288,256C384,235,480,213,576,224C672,235,768,277,864,277.3C960,277,1056,235,1152,202.7C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundSize: '500%',
                                    backgroundRepeat: 'no-repeat',

                                }}
                            >
                                <IconButton sx={{position:'absolute',right:10,top:8,}}>
                                <Delete sx={{color:'Amber.main'}} />
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
        </Box>
    );
};

export default AllEmployee;
