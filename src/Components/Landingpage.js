import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { keyframes,styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import image from '../Orange-Yellow.png'
import logo from '../ExcelWishmaster.png'


const fadeInAnimation = keyframes`
  10% {
    opacity: 0.2;
    
  }
  
 
  100%{
    opacity:1
  }
`;


const AnimatedTypography = styled(Typography)`
  animation: ${fadeInAnimation} 1000ms ease-in infinite;
`;

const LandingPage = () => {
 
    const navigate=useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
      };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                // width:'100vw',
                flexDirection: 'column',
                backgroundImage:`url(${image})` ,
                backgroundRepeat: 'no-repeat',
                backgroundSize:"100% 100%"
            }}
        >
            <Box sx={{display:'flex',my:0}}>

            <AnimatedTypography
                sx={{
                    display: 'inline-block',
                    transform: 'rotate(-30deg)',
                    margin: '0 100px',
                    fontSize: '3rem',
                    my:0
                }}
                >
                 ✩
            </AnimatedTypography>
            <AnimatedTypography
                sx={{
                    display: 'inline-block',
                    transform: 'rotate(30deg)',
                    margin: '0 -80px',
                    fontSize: '3rem',
                }}
                >
                 ✩
            </AnimatedTypography>
           
                </Box>
            <Typography variant="h2" component="h4" sx={{ display: 'inline', fontFamily: 'Rubik',my:0 }}>
                Surprise your{' '}
                <Typography
                    variant="h2"
                    component="h4"
                    sx={{ display: 'inline', backgroundColor: 'Amber.main',my:0,
                     color: 'white', p: 0.2, fontFamily: 'Rubik' }}
                >  
                    colleagues
                </Typography>
            </Typography>
            <Typography
                variant="h4"
                component="h4"
                sx={{ display: 'inline', textAlign: 'center', width: '80vw', fontFamily: 'Rubik', m: 2 }}
            >
                on their
                <Typography variant="h4"
                    component="h4"
                    sx={{ display: 'inline', color: '#E91E63', textAlign: 'center', fontFamily: 'Rubik', mx: 0 }}
                > work anniversary </Typography>
                or
                <Typography variant="h4"
                    component="h4"
                    sx={{ display: 'inline', color: '#03A9F4', textAlign: 'center', fontFamily: 'Rubik', mx: 1 }}
                >

                    birthday
                </Typography>
                to make them feel special.
            </Typography>
            <Box >

            <Button size='30px' variant='contained' onClick={handleClick}>
                View Events
            </Button>
            </Box>
            <Box sx={{position:'absolute',top:4,left:30, }} className='App-logo'>
               <img src={logo}  alt='Logo' style={{width:100,borderRadius:'50%',}}/>
            </Box>
        </Box>
    );
};

export default LandingPage;
