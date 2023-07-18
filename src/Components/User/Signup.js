import React, { useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, Box, InputAdornment, IconButton, Hidden, useMediaQuery } from '@mui/material';
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
        gap: theme.spacing(2),
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
    const navigate = useNavigate();
    const classes = useStyles();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [userData, setUserData] = React.useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

    const [errors, setErrors] = React.useState({});
    const [isSubmit, setisSubmit] = useState(false);


    useEffect(() => {
    
        
        let a = localStorage.getItem('token')

        if (a) {
            navigate('/dashboard')
        }
    },[navigate,errors]
    )



    const handelChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...userData,
            [e.target.name]: e.target.value
          }));
    }

    const handelSubmit = async (e) => {
        e.preventDefault(); 
        setErrors(validate(userData));
        
        
        if(Object.keys(errors).length===0 && isSubmit){
        
        try {
            const response = await signup({ ...userData });
            // console.log(response.data);
            if (response.status === 201) {
                navigate('/signin')
            }
        } catch (e) {
            alert(e.response.data.message)
            // console.log(e.response.data.message)
            // console.log(error)
        }
    }
        setisSubmit(true)

        // console.log(userData);
    }
    


    const validate = (values) => {
        const notFill = {};
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.firstName) {
            notFill.firstName = "First Name is required"
        } else if (values.firstName.trim().length < 2) {
            notFill.firstName = "Name cannot be less than 2 characters"
        }
        if (!values.lastName) {
            notFill.lastName = "Last Name is required"
        }
        if (!values.email) {
            notFill.email = "Email is required"
        } else if (!regex.test(values.email)) {
            notFill.email = "Enter valid email"
        }
        if (!values.password) {
            notFill.password = "Please enter the password"
        } else if (!regularExpression.test(values.password)) {
            notFill.password = "1 special character \n Less than 10 character and greater than 6 character \n1 small case "
        }
        if (values.password !== values.confirmPassword) {
            notFill.confirmPassword = "Password and confirm password does not match"
        }

        return notFill;
    }









    return (
        <Box maxWidth="100%" sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%',

        }}>
            <Paper className={classes.styledpaper} elevation={12} gap={3}
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





                <Box className={classes.paper} width={isSmallScreen ? '100vw' : 'auto'} >

                    <form className={classes.form} onSubmit={handelSubmit} noValidate autoComplete='off'>
                        <Box  sx={{ zIndex: 1, mt: 6 }} display='flex' flexDirection='column' >
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
                             {(errors.firstName && (!userData.firstName || userData.firstName.length < 2)) && <Typography variant='caption' color='red' fontSize="10px">{errors.firstName}</Typography>}

                        </Box>

                        <Box  sx={{ zIndex: 1 }}>
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
                            {(errors.lastName && (!userData.lastName || userData.lastName.length < 2)) && <Typography fontSize="10px" variant='caption' color='red'>{errors.lastName}</Typography>}

                        </Box>

                        <Box  sx={{ zIndex: 1 }}>
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
                            {(errors.email ) && <Typography variant='caption' fontSize="10px" color='red'>{errors.email}</Typography>}

                        </Box>
                        <Box    sx={{ zIndex: 1 }}>
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
                        {(errors.password || (!userData.password)) && <Typography fontSize="10px" sx={{my:4}} variant='caption' color='red'>{errors.password}</Typography>}
                            
                        </Box>
                        <Box  sx={{ zIndex: 1 }}>
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
                           {(errors.confirmPassword && (!userData.confirmPassword || userData.confirmPassword!==userData.password)) && <Typography variant='caption' fontSize="10px" color='red'>{errors.confirmPassword}</Typography>}

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