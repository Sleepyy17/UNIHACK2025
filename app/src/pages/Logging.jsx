import React from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors } from '@mui/material'; 
import "./loggin.css";
import { getAiChat } from '../helpers/helpers';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function LoggingPage (token) {
    const navigate = useNavigate();

    const {TeamName} = useParams();
    
    const [standup, setStandup] = React.useState("");
    const [botResponse, setBotResponse] = React.useState("");

    const handleClick = async () => {
        try {
            const res = (await getAiChat(token, TeamName, standup));
            console.log(res.userResponse);
            setBotResponse(res.userResponse);
        } catch (error) {
            console.log(error);
        }
    }
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
        <ArrowBackIosNewIcon sx={{position: 'absolute', margin: '70px', marginTop: '150px', cursor: 'pointer'}} onClick={() => {navigate(`/Teams/${TeamName}`)}}/>
           <Box className="container">
           <Typography variant="h3" align="center" sx={{fontFamily: 'Heebo', fontWeight: 'bold', color: '#3f51b5',}}>
                TeamName Standup
            </Typography>  
            <Box className="questions">
            {give_questions(["What have you done?", "What are you doing?", "Any blockers?"])}
            </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1vw', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                    <Box sx={{ width: '50%', maxWidth: '100%' }}>
                        <TextField 
                            fullWidth
                            label="Type your standup here"
                            multiline
                            rows={10}
                            placeholder="What have you done? What are you doing? Any Blockers?" 
                            id="fullWidth"
                            value={standup}
                            onChange={(e) => setStandup(e.target.value)}
                        />
                    </Box>
                    <Box className="botBox"sx={{ width: '50%', maxWidth: '100%', height: '90%'}}> 
                        <Box sx={{fontFamily: "Inter", backgroundColor: '#ACD7FF', borderRadius: '10px', padding: '10px', width: '80%'}}>
                        <Typography>
                            {botResponse ? botResponse : "Hi, I'm your friendly standup bot! I'm here to help you with your standup. Please type your standup in the box on the left."}
                        </Typography>
                        </Box>
                        
                    </Box>
                </Box>
                <Button 
                    variant="contained" 
                    style={{fontFamily: 'Heebo', backgroundColor: '#3f51b5', color: 'white', marginTop: '20px', width: '20%', height: '50px', fontSize: '30px', borderRadius: '30px'}} 
                    onClick={() => handleClick()}
                >
                    Submit
                </Button>
           </Box>

        </>
    )
}

export default LoggingPage;