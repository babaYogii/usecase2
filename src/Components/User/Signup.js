import React, { useEffect } from 'react';
import { Paper, Typography, TextField, Button, Box, InputAdornment, IconButton, Hidden, useMediaQuery, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { AccountCircle, Mail, Https } from '@mui/icons-material';
import theme from '../../Theme/theme';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from "../../api/userApi"


const useStyles = makeStyles((theme) => ({
    styledpaper: {
        position: 'relative',
        '&::before, &::after': {
            content: "''",
            position: 'absolute',
            width: '40%',
            height: '30%',
            backgroundColor: theme.palette.secondary.main, // replace with your desired color
            // opacity:0.8
        },
        '&::before': {
            top: 0,
            left: 0,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            // borderRadius: '20px 0 20px 0'
        },
        '&::after': {
            bottom: -1,
            right: 0,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            borderRadius: '0 0 20px 0px',

        }
    },

    paper: {
        padding: theme.spacing(6),
        maxWidth: 400,
        // minWidth:300,
        width: '100%',
        // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
    },
    textField: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        marginLeft: theme.spacing(1),
    },
    circleWithAnimation: {
        zIndex: '1', width: '20em', height: '20em',
        animation: '$circleAnimation 8s infinite', borderRadius: '50%', backgroundColor: '#FFC26F',
        position: 'absolute', top: "20%", opacity: "0.9",
    },
    '@keyframes circleAnimation': {
        '0%': {
            transform: 'scale(0.85)',
        },
        '25%': {
            transform: 'sacle(0.40) '
        },
        '50%': {
            transform: 'scale(0.5)  ',
        },

        '100%': {
            transform: 'scale(0.85) ',
        },
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

}));






const Signup = () => {
     const navigate=useNavigate();
    const classes = useStyles();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    console.log(isSmallScreen)

    const [userData, setUserData] = React.useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = React.useState({ message: '' });
    const [errorState, setErrorState] = React.useState(false);


    const handelChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ ...userData });
            console.log(response.data)
              if(response.status===201){
                navigate('/signin')
              }
        } catch (e) {
            console.log(e.response.data.message)
            setError((prevError) => ({ ...prevError, message: e.response.data.message }));
            // console.log(error)
        }

        // console.log(userData);
    }
    useEffect(() => {
        console.log(error)
        if(error.message.length>0){

            setErrorState(true)
        }
        setTimeout(() => {
            setErrorState(false)
            
        }, 2000);
    }, [error])




    return (
        <Box maxWidth="100%" sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%',

        }}>{(error.message.length>0 && errorState) && 
     <Alert severity='info' sx={{ position: 'absolute',
     top: '8%',
     right: '20%',zIndex:1,
     margin: 0, }}>{error.message}</Alert>
         }   <Paper className={classes.styledpaper} elevation={6}
                sx={{
                    display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', minWidth: 300,
                    width: isSmallScreen ? '100%' : '50%',
                    height: isSmallScreen ? '100%' : 'auto',
                    borderRadius: isSmallScreen ? '0' : '5%'
                }}>
                <Typography variant='h4' position='absolute' sx={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: 30,
                    mb: 5, mt: 2, color: theme.palette.PrimarySecond.main, fontWeight: 600
                }} align='center'  >Register Now</Typography>
                <Hidden mdDown>

                    <Box sx={{ width: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <div className={classes.circleWithAnimation}  >
                            <div className={classes.textContainer}>
                                <Typography sx={{ position: 'absolute', fontWeight: 550 }} variant='h3' align='center' color="#884A39">
                                    Welcome!!! Join us</Typography>
                            </div>
                        </div>
                    </Box>
                </Hidden>





                <Box className={classes.paper} width={isSmallScreen ? '100vw' : 'auto'}
                >

                    <form className={classes.form} onSubmit={handelSubmit} noValidate autoComplete='off'>
                        <Box display="flex" alignItems="center" sx={{ zIndex: 1, mt: 6 }}>
                            <TextField type='text' label="First Name" required name='firstName' onChange={handelChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton disableRipple>
                                                <AccountCircle fontSize='medium' color='tertiary' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { fontSize: '20px' }
                                }}

                                fullWidth
                            />
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ zIndex: 1 }}>
                            <TextField type='text' label="Last Name" required name='lastName' onChange={handelChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton disableRipple>
                                                <AccountCircle fontSize='medium' color='tertiary' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { fontSize: '20px' }
                                }}

                                fullWidth
                            />
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ zIndex: 1 }}>
                            <TextField type='text' label="Email" required name='email' onChange={handelChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton disableRipple >
                                                <Mail fontSize='medium' color='tertiary' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { fontSize: '20px' }

                                }}
                                fullWidth
                            />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ zIndex: 1 }}>
                            <TextField type='password' label="Password" required name='password' onChange={handelChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton disableRipple>
                                                <Https fontSize='medium' color='tertiary' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { fontSize: '24px' }

                                }}
                                fullWidth
                            />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ zIndex: 1 }}>
                            <TextField type='password'
                                sx={{ color: theme.palette.PrimarySecond.main }}
                                label="Confirm password" required name='confirmPassword' onChange={handelChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton disableRipple>
                                                <Https fontSize='medium' color='tertiary' />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { fontSize: '20px' }

                                }}
                                fullWidth
                            />
                        </Box>

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ zIndex: 1, transition: "none", color: theme.palette.PrimaryLight.main, fontWeight: 600 }} disableTouchRipple disableFocusRipple
                            className={classes.submitButton}
                        >
                            Confirm
                        </Button>
                    </form>
                    <Box fontSize={12} zIndex={5} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%', mt: 1 }}>
                        <span style={{ zIndex: 1 }}>Already have an account? <Link to="/signin" style={{ textDecoration: 'none' }}>Sign In</Link></span>
                    </Box>
                </Box>
            </Paper>
        </Box>

    )
}

export default Signup;