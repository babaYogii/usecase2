import React from 'react';
import {  Paper, Typography, TextField, Button, Box, InputAdornment, IconButton, Hidden, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AccountCircle, Https } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
 
  paper: {
    mt: 20,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    paddingY: theme.spacing(4),
    height: '80vh',
     position: 'relative',
    borderRadius:'5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Set full width for smaller devices
      height:'100%',
      borderRadius:'0px'
    },
    
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    gap: theme.spacing(3),
  },
}));

const Signin = () => {
  const classes = useStyles();
  const [user,setUser]=React.useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate=useNavigate();


  const handelChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log(user)
  };

  return (
    <Box maxWidth="100%" sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  }} >
      <Paper className={classes.paper} sx={{borderRadius: isSmallScreen ? '0' : '5%',}}>

        <Box flex={1.7} padding={2} width='80%'>

          <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete='off'>
            <Typography variant='h4' align='center' component='h1' fontSize='2.5rem' fontWeight='700'>Login to Your Account</Typography>
            <TextField
              type="text"
              label="Email"
              name='email'
              required
              onChange={handelChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" margin='0' padding='0'>
                    <IconButton disableRipple>
                      <AccountCircle fontSize="small"  />
                    </IconButton>
                  </InputAdornment>
                ),
                sx:{minWidth:'3.5%'}
              }}
               
            />
            <TextField
              type="password"
              label="Password"
              name='password'
              required
              onChange={handelChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disableRipple>
                      <Https fontSize="small"  />
                    </IconButton>
                  </InputAdornment>
                ),
                sx:{minWidth:'3.5%'}
              }}
            />

            <Button variant="contained" color="primary"  type="submit" sx={{ width: '35%' ,mb:0 }} disableTouchRipple disableFocusRipple>
              Sign In
            </Button>
            {isSmallScreen ?
             <Box fontSize={12}>
                <span>Already have an account? <Link to="/signup" style={{textDecoration:'none'}}>Sign Up</Link></span>
             </Box>:""  
          }
          </form>
        </Box>
        <Hidden mdDown>

          <Box flex={1} sx={{backgroundColor:'#C38154',borderRadius:'0px 20px 20px 0px' ,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Box width={200} display='flex' gap={3.2} flexDirection='column'>

            <Typography variant='h4' component='h1' fontWeight='600' align='center'color='whiteSmoke'>New Here?</Typography>
            <Typography align='center' fontSize='14px' color='whiteSmoke'>Sign up and discover a great amount of new opportunities </Typography>
            <Button variant="contained" color="primary" type="submit" disableTouchRipple disableFocusRipple onClick={()=>{navigate('/signup')}}>
              Sign Up
            </Button>
            </Box>
            
          </Box>
        </Hidden>
      </Paper>
    </Box>
  );
};

export default Signin;
