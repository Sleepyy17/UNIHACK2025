import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors } from '@mui/material'; 
import "./loggin.css";

function LoggingPage () {
    const navigate = useNavigate();

    React.useEffect(() => {

    }, []);

    const give_questions = (questionArray) => {
        let questions = [];
        for (let i = 0; i < questionArray.length; i++) {
            questions.push(
                    <Typography variant="h6"  sx={{fontFamily: 'Heebo'}}>
                        {questionArray[i]}
                    </Typography>
                
            )
        }
        return questions;
    }


    // Returns a chat box for taling to the bot
    return (
        <>
           <Box className="container">
           <Typography variant="h3" align="center" sx={{fontFamily: 'Heebo', fontWeight: 'bold', color: '#3f51b5',}}>
                TeamName Standup
            </Typography>  
            <Box className="questions">
            {give_questions(["What have you done?", "What are you doing?", "Any blockers?"])}
            </Box>
            
                {/* Text box */}
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <TextField fullWidth
                label="Type your standup here"
                multiline
                rows={10}
                placeholder="What have you done? What are you doing? Any Blockers?" id="fullWidth" />
    </Box>
            <Button variant="contained" style={{fontFamily: 'Heebo', backgroundColor: '#3f51b5', color: 'white', marginTop: '20px', width: '20%', height: '50px', fontSize: '30px', borderRadius: '30px'}} onClick={() => {console.log("SUBMMIT")}}>Submit</Button>
           </Box>

        </>
    )
}

export default LoggingPage;