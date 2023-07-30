import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams,} from 'react-router-dom';
import { resetPassword } from '../../api/userApi';
import {useState } from 'react'

const ResetPassword = () => {
    const navigate=useNavigate()
    const [inputValue, setInputValue] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const { token } = useParams();
    const handleChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
        setErrors(validate({
            ...inputValue,
            [event.target.name]: event.target.value
          }));
    };



    const validate = (values) => {
        const notFill = {};
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        
        if (!values.password) {
            notFill.password = "Please enter the new password"
        } else if (!regularExpression.test(values.password)) {
            notFill.password = "1 special character \n Less than 10 character and greater than 6 character \n1 small case "
        }
        if (values.password !== values.confirmPassword) {
            notFill.confirmPassword = "New Password and confirm password does not match"
        }

        return notFill;
    }
    useEffect(() => {

        let a = localStorage.getItem('token')
        if (a) {
          navigate('/')
        }
    
    
      }, [navigate])

    const resetPass = async () => {
        const { password, confirmPassword } = inputValue;
      
        if (password !== confirmPassword) {
          alert("Password and Confirm Password do not match");
          return;
        }
      try{
          const response = await resetPassword({ token, password,confirmPassword });
          alert(response.data.message);
        //   console.log(response)
          navigate('/signin');

      }catch(error){
        alert(error.response.data.message);
        // console.log(error.response.data.message);
      }
        // Handle the response and any additional logic
      };

      

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', }}>
            <Box sx={{
                flex: 1, backgroundColor: '#fb6767',textAlign:'center',
                opacity: 0.8,boxShadow: 'inset 2px 2px 500px #fb6700',overflow: 'hidden',
            }}>
                <img src="../ExcelWishmaster.png" alt="logo" style={{ position:'absolute',width:120,borderBottomRightRadius:'50%',boxShadow:'0px 0px 40px ',transform:'rotate(45deg)',top:280,left:'12%' }} />
                <Typography sx={{ color: 'whitesmoke', p:2,px: 8, mX:4,mt:1,display:'inline-block',fontSize: '20px',boxShadow:'2px 2px 100px red' }}>Wish Master</Typography>
            </Box>
            <Box sx={{ flex: 1.96, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', }}>
                    <Typography variant='h5' sx={{ fontWeight: 750, fontSize: '24px',mb:1 }}>Reset Password?</Typography>
                    
                    
                    <TextField variant="standard" sx={{ padding: 0 }} autoComplete='off' label={'Password'} style={{ padding: 0,marginTop:4 }} name='password' onChange={handleChange} />
                    {(errors.password || (!inputValue.password)) && <Typography fontSize="10px" sx={{mt:0}} variant='caption' color='red'>{errors.password}</Typography>}
                
                      
                    <TextField variant="standard" sx={{ padding: 0 }} autoComplete='off' label={'Confirm Password'} style={{ padding: 0,marginTop:26 }} name='confirmPassword' onChange={handleChange} />
                    {(errors.confirmPassword && (!inputValue.confirmPassword || inputValue.confirmPassword!==inputValue.password)) && <Typography variant='caption' fontSize="10px" sx={{my:0}} color='red'>{errors.confirmPassword}</Typography>}
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>

                        <Button variant='contained' sx={{ borderRadius: '8px',mt:1 }} onClick={resetPass}>Confirm</Button>
                    </Box>
                </Box>
                <Box display='flex' sx={{flexDirection:'column',gap:1,}} >
                    <Link to='/signin' style={{textDecoration:'none'}}>Already have an account !</Link>
                    <Link to='/signup' style={{textDecoration:'none'}}>Don't have an account ?</Link>
                </Box>
            </Box>
              
        </Box>
    )
}

export default ResetPassword;