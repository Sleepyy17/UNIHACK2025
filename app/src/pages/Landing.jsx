import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors } from '@mui/material'; 
import "./landing.css";

function Landing () {
    const navigate = useNavigate();

    React.useEffect(() => {

    }, []);
    
    const contentContainer = {
        fontFamily: 'Heebo',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '10vw',
        height: '90vh',
        backgroundColor: 'rgb(232, 200, 168)',
        gap: '5vw',
        paddingLeft: '15vw',
        paddingRight: '17vw',
    }

    const HeadText = {
        fontFamily: 'Heebo',
        fontSize: '5vw',
        fontWeight: '500',
        color: 'rgb(232, 200, 168)',
        filter: 'invert(1)',
    }

    const BotText = {
        fontFamily: 'Heebo',
        fontSize: '1vw',
        fontWeight: '500',
        width: '30vw',
        color: 'rgb(232, 200, 168)',
        filter: 'invert(1)',
    }


    return (
        <>
            <Box style={contentContainer}>
                <img src='./imgs/Group 3.svg'></img>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '1vw'}}>
                    <Typography sx={HeadText} color="white">
                        Its Crunch Time!
                    </Typography>
                    <Typography sx={BotText} color="white">
                    Our one-stop shop to know who’s doing what, when, and how! Stay on top of tasks, track progress, and keep your team in sync—because teamwork should be crunchy, not chaotic!
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default Landing;