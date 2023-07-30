import React from 'react';
import {  Box, Card,  CardMedia,  IconButton, Typography } from '@mui/material';
import {  ArrowForward } from '@mui/icons-material';
import BasicBirthdayModal from '../../Modal/BirthdayModal';

const MainCard = ({ birthday, index }) => {
    const birthdayCardColor =
        [
            "#CBE4F9", "#CDF5F6", "#EFF9DA", "#F9EBDF", "#F9D8D6", "#D6CDEA", "#FFC26F", "#F9E0BB"
        ]
    const [open, setOpen] = React.useState(false);
    const handleModal = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Card
            key={index}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                minWidth: 160,
                maxWidth: 160,
                boxShadow: 6,
                height: 240,
                mx: 1,
                my: 2,
                position: 'relative', // Add this to make the z-index work
                backgroundColor: birthdayCardColor[Math.floor(Math.random() * birthdayCardColor.length)],
               
            }}
        >
            <Box sx={{ minHeight: '240' }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={birthday.profileimage}
                    alt="Paella dish"
                    sx={{ objectFit: 'cover' }}
                />
            </Box>

            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1,backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',transform:'translateY(30%)',my:0.1,'&:hover': {
                    transform: 'translateY(0%)',
                    transition:'40ms ease-in-out',
                    backdropFilter: 'blur(3px)',
                    
                  },
            }}>
                <Typography variant="body1" sx={{ color: 'black', mx: 1, fontSize: '16px' }}>{birthday.employeename}</Typography>
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Typography  sx={{ mx: 1, color: 'black',fontSize:"11.2px" }}>{birthday.profession}</Typography>
                    <IconButton  onClick={()=>{handleModal()}}>
                        <ArrowForward fontSize="small" color="black" />
                    </IconButton>
                </Box>
                    <Typography  sx={{ mx: 1,  color: 'black' }}>{new Date(birthday.dob).toLocaleString('en-US', { day: 'numeric', month: 'short' })}</Typography>
            </Box>
        <BasicBirthdayModal  open={open} handleClose={handleClose} birthday={birthday} />
       

        </Card>
    );
};

export default MainCard;
