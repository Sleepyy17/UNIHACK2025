import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, TextField } from '@mui/material';
import "./style.css"

export default function LoginPage({setToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    console.log('hello')
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postParams = {
      'email': formData.get('login-email'),
      'password': formData.get('login-password'),
    }

    // axios.post(`${API_URL}/admin/auth/login`, postParams)
    //   .then((response) => {
    //     setError({isError: false, msg: ''});
    //     setToken(response.data.token);
    //     localStorage.setItem('token', response.data.token);
    //     navigate('/dashboard', {replace: true});
    //   })
    //   .catch((error) => {
    //     setError({isError: true, msg: error.response.data.error});
    //   })
  }

  return (
    <>
      <Box className='form-background'  sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(105, 53, 2, 0.6)', backdropFilter: 'blur(3px)'}}>
          <Box sx ={{height: '80%', width: '85%', display: 'flex', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center', bgcolor: '#e8c8a8', height: '100%', width: 'calc(80% - 600px)'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', height: '80%', width: '100%', alignItems: 'center', gap: '10%'}}>
                <Box component="img" sx={{height: '400px'}}src='./imgs/Group 12 (2).svg'/>
                <Typography sx={{fontSize: '4em', fontFamily:'Heebo', fontWeight: 'bold'}}>Time to Crunch!</Typography>
              </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', bgcolor: '#d38d48', height: '100%', width: '600px'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '50px', bgcolor: '#e8c8a8', height: '80%', width: '440px'}}>
                <Typography sx={{fontSize: '3em', fontWeight: 'bold', fontFamily: 'Heebo'}}>Login</Typography>
                <Box onSubmit={handleSubmit} component='form' sx={{display: 'flex', flexDirection: 'column', gap: '31px', alignItems: 'center', width: '70%'}}>
                  <TextField 
                    id='login-email' 
                    name='login-email'
                    label='Email' 
                    value={email}
                    variant='outlined' 
                    type='email' 
                    autoComplete='on'
                    required
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': { 
                        '&.Mui-focused fieldset': { 
                          borderColor: '#d38d48',
                        },
                      },
                      '& label.Mui-focused': {
                        color: 'black'
                      },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id='login-password'
                    name='login-password'
                    label='Password'
                    value={password}
                    type='password'
                    autoComplete='current-password'
                    required
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': { 
                        '&.Mui-focused fieldset': { 
                          borderColor: '#d38d48',
                        },
                      },
                      '& label.Mui-focused': {
                        color: 'black'
                      },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button 
                    type='submit'
                    sx={{
                      bgcolor: '#693502',
                      height: 55,
                      width: '160px',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1.25em',
                      borderRadius: 2,
                    }}>
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </>
  )
}