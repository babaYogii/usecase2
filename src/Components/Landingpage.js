import { Box, Typography } from '@mui/material';
import React from 'react';
import { keyframes,styled } from '@mui/system';



const fadeInAnimation = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`;


const AnimatedTypography = styled(Typography)`
  animation: ${fadeInAnimation} 2s ease-in;
`;

const LandingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                flexDirection: 'column',
                backgroundColor: 'common.white'
            }}
        >
            <Box sx={{display:'flex',my:0}}>

            <AnimatedTypography
                sx={{
                    display: 'inline-block',
                    transform: 'rotate(-23deg)',
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
                    transform: 'rotate(23deg)',
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
        </Box>
    );
};

export default LandingPage;
