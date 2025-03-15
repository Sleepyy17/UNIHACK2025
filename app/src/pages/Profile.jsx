import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors } from '@mui/material'; 

function Profile (props) {
    // const { userId } = useParams();
    const [teamData, setTeamData] = React.useState([]);

    const teamName = {
        fontFamily: 'sans-serif',
        fontSize: '2vw',
        fontWeight: 'bold'
    }

    const teamDisplay = {
        padding: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw',
        flexWrap: 'wrap',
    }

    const text = {
        fontFamily: 'sans-serif',
        fontSize: '1.2vw',
        fontWeight: 'bold'
    }

    const teamItem = {
        backgroundColor: '#E4FAEB', 
        // fontSize: '2vw', 
        border: '10px solid green', 
        borderRadius: '750px',
        width: '20vw', 
        height: '120px',
        color: 'black',
        padding: '2vw 3vw 2vw 3vw ',
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '8px', 
        flexDirection: 'column'

    }

    const contentContainer = {
        padding: '2.5vw',
        color: '#f0f0f0',
        display: 'flex',
        height: '80vh',
        justifyContent: 'space-between'

    }

    const pfpStyle = {
        height: '20vw',
        width: '20vw',
    }


    const teamContainer = {
        width: '59vw'
    }

    const footerContainer = {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: '8px', 
        flexDirection: 'row'
    }

    const fetchTeamData = async () => {
        try {
            // const teamData = await getUserTeams(userId);
            throw "HELLO"
            setTeamData(teamData);
        } catch (error) {
            console.error('Error fetching group:', error);
        }
    };

    const navigate = useNavigate();

    React.useEffect(() => {
        setTeamData([
            {
                Name: "OvercookedCookies",
                numMembers: 4,
                numBlockers: 4,
            },{
                Name: "HELLO",
                numMembers: 4,
                numBlockers: 4,
            },{
                Name: "UNIHACK2025",
                numMembers: 4,
                numBlockers: 4,
            },
        ]);
        // fetchTeamData();
    }, []);
    
    const displayTeams = () => {
        if (teamData.length == 0) return (<Typography variant="h5" style={{padding:'8px'}}>BRuh Join a team</Typography>);
        else {
            return (
                <Box sx={teamDisplay}>
                    {
                        teamData.map((team) => (
                            <>
                                <Box style={teamItem}>
                                    <Typography sx={teamName}>{team.Name}</Typography>
                                    <Box sx={footerContainer}>
                                        <Typography variant="p" sx={text}>Members: {team.numMembers}</Typography>
                                    </Box>
                                </Box>
                            </>
                            
                            
                        ))
                    }
                </Box>
            );
        }
    }

    return (
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{height: '60px'}}>
                <Typography>Profile Icon</Typography>
            </Box>
            <Box sx={{background: ' linear-gradient(135deg, #0d1b65 0%, #3750de 100%);', height: '100%'}}>
                <Box sx={contentContainer}>
                    <Box> 
                        <Box>
                            <img src="./imgs/pfp.svg" style={pfpStyle}></img>
                        </Box>
                        <Box style={{fontSize: '2vw', padding:'8px', color:'white'}}>
                            Brian Nguyen<br></br>
                            Teams: {teamData.length}
                        </Box>
                        
                    </Box>
                    <Box sx={teamContainer}>
                        {displayTeams()}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;
