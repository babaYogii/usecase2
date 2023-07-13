import { useState } from 'react';
import React from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import BasicAniversaryModal from '../../Modal/AniversayModal';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MainWorkAniversaryCard = ({ birthday, index }) => {
    const birthdayCardColor =
        [
            "#CBE4F9", "#CDF5F6", "#EFF9DA", "#F9EBDF", "#F9D8D6", "#D6CDEA", "#FFC26F", "#F9E0BB"
        ]
    const [open, setOpen] = React.useState(false);
    const handleModal = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [expanded, setExpanded] = useState(false);
    const trophyCount = new Date().getFullYear() - new Date(birthday.dateofjoining).getFullYear();
    const maxTrophyCount = 10;


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
                position: 'relative', 
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
                    zIndex='-1'
                />
            </Box>

            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1, backdropFilter: 'blur(7px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}>
                <Typography variant="body1" sx={{ color: 'black', mx: 1, fontWeight: 500, fontSize: '16px', m: 0, p: 0 }}>{birthday.employeename}</Typography>
                <Typography variant='caption' display='flex' alignItems='center'>
                    <div style={{ flex: '1' }}>
                        {Array(trophyCount).fill().map((_, index) => (
                            (expanded || index < maxTrophyCount) && (
                                <EmojiEventsIcon sx={{ fontSize: '14px', m: 0, p: 0, color: '#f4ae00' }} key={index} />
                            )
                        ))}
                    </div>
                    {trophyCount > maxTrophyCount && (
                        expanded ? (
                            <IconButton onClick={() => setExpanded(false)}>
                                <ExpandLessIcon sx={{ fontSize: '14px', m: 0, p: 0 }} />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => setExpanded(true)}>
                                <ExpandMoreIcon sx={{ fontSize: '14px', m: 0, p: 0 }} />
                            </IconButton>
                        )
                    )}
                </Typography>


                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography  sx={{ mx: 1, my: 0, color: 'black', display: 'inline-block',fontSize:'11px' }}>{birthday.profession}</Typography>
                    <IconButton onClick={() => { handleModal() }}>
                        <ArrowForward fontSize="small" color="black" sx={{ fontSize: '14px', m: 0, p: 0 }} />
                    </IconButton>
                </Box>
            </Box>
            <BasicAniversaryModal open={open} handleClose={handleClose} birthday={birthday} />


        </Card>
    );
};

export default MainWorkAniversaryCard;
