import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { resetPasswordEmail } from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    const handelResetPass = async () => {
        try {
            const response = await resetPasswordEmail(inputValue);
            alert("Email sent Successfull");
            setInputValue('');

        } catch (e) {
            alert(e.response.data.message);
            console.log(e)
        }

    }
    React.useEffect(() => { }, [inputValue])
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <Box sx={{
                flex: 1, backgroundColor: '#C38154',
                opacity: 0.8,
            }}>
                <Typography sx={{ color: 'whitesmoke', p: 4, fontSize: '20px' }}>Wish Master</Typography>
            </Box>
            <Box sx={{ flex: 1.96, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 1.9 }}>
                    <Typography variant='h5' sx={{ fontWeight: 750, fontSize: '24px' }}>Forgot Password?</Typography>
                    <Typography sx={{ fontSize: '14px', py: 1 }}>Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                    </Typography>
                    <Typography sx={{ fontSize: '14px', pb: 1 }}>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</Typography>
                    <Typography variant='h6' sx={{ fontSize: '15px', mt: 2, fontWeight: 600 }}>Email Address</Typography>
                    <TextField variant="standard" sx={{ padding: 0 }} autoComplete='off' style={{ padding: 0 }} value={inputValue} onChange={handleChange} />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                        <Button variant='contained' sx={{ borderRadius: '8px', backgroundColor: '#C38154', color: 'whitesmoke' }} onClick={handelResetPass}>send reset instructions</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default ForgetPassword