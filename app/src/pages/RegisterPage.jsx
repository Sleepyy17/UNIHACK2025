import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, TextField } from '@mui/material';
import "./style.css"
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import { API_URL } from '../App';
/**
 * This page sets up the register page.
 */
export default function RegisterPage({setToken}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return;

    const postParams = {
      email: email,
      password: password,
      name: name
    };

    axios.post(`${API_URL}/api/auth/register`, postParams)
      .then((response) => {
        const userId = response.data.userId;
        setToken(response.data.userId);
        localStorage.setItem('token', response.data.userId);
        navigate(`/profile/${userId}`, {replace: true})
      })
      .catch((error) => {
        console.log(error.response.data.error)
      });
    };

  return (
    <Box className='form-background'  sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(105, 53, 2, 0.6)', backdropFilter: 'blur(3px)'}}>
        <Box sx ={{height: '90%', width: '85%', display: 'flex', justifyContent: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center', bgcolor: '#e8c8a8', height: '100%', width: 'calc(80% - 600px)'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '80%', width: '100%', alignItems: 'center', gap: '10%'}}>
              <Box component="img" sx={{height: '400px'}}src='./imgs/Group 12 (2).svg'/>
              <Typography sx={{fontSize: '4em', fontFamily:'Heebo', fontWeight: 'bold'}}>Ready to Crunch?</Typography>
            </Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', bgcolor: '#d38d48', height: '100%', width: '600px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '50px', bgcolor: '#e8c8a8', height: '85%', width: '440px'}}>
              <Typography sx={{fontSize: '3em', fontWeight: 'bold', fontFamily: 'Heebo'}}>Register</Typography>
              <Box onSubmit={handleSubmit} component='form' sx={{display: 'flex', flexDirection: 'column', gap: '31px', alignItems: 'center', width: '70%'}}>
              <TextField 
                id='register-email' 
                name='register-email'
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
                id='register-name'
                name='register-name'
                label='Name'
                value={name}
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
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id='register-password'
                name='register-password'
                label='Password'
                type='password'
                value={password}
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
              <TextField
                id='register-confirm-password'
                name='register-confirm-password'
                label='Confirm Password'
                type='password'
                value={confirmPassword}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Register
                </Button>
              </Box>
            </Box>
          </Box>
      </Box>
      </Box>
    </Box>
  );
}
