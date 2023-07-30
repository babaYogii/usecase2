import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 4 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" href="/" sx={{ borderRadius: '8px' }}>
        Go Back to Homepage
      </Button>
    </Box>
  );
};

export default ErrorPage;
