import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This page sets up the home page.
 */
export default function HomePage ({token}) {
  const navigate = useNavigate();
  const commonBtnStyles = {
    textTransform: 'none', 
    fontWeight: 'bold',
    height: 55,
    fontSize: '1.2em',
    borderRadius: 3.8,
  }

  return (
    <Fragment>
      <Box component='section' sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Box
          component='section' 
          sx={{ 
            background: 'linear-gradient(135deg, #0d1b65 0%, #3750de 100%);',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', color: '#e2dacd', alignItems: 'center', textAlign: 'center' }}>
            <Typography 
              variant='h3' 
              sx={{
                fontWeight: 'bold',  
                '@media (min-width: 569px) and (max-width: 695px)': {
                  width: '80%'
                },
              }}>
              Minimal Effort, Maximum Style
            </Typography>
            <br/>
            <Typography 
              variant='h5' 
              sx={{
                '@media (max-width: 675px)' : {
                  width: 400
                }}}>
                Start Making Flashy Presentations with the Click of a Button
            </Typography>
            {token && 
            <Button
              onClick={() => navigate('/dashboard')}
              variant='contained'
              sx={{ 
                ...commonBtnStyles,
                width: 250,
                color: '#41444d',
                bgcolor: '#e2dacd',
                mt: 6.25
              }}>
                Head to Dashboard
            </Button>
            }
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}
