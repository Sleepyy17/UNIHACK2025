import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors } from '@mui/material'; 
import { Padding } from '@mui/icons-material';

function GroupsLanding (props) {
    const navigate = useNavigate();

    const { groupName } = useParams(); 
    const [groupData, setGroupData] = React.useState({});

    const fetchGroupData = async () => {
        try {
            const groupData = {};
            // const groupData = await group_get_details(props.token, groupId);
            setGroupData(groupData);
        } catch (error) {
            console.error('Error fetching group:', error);
        }
    };
    React.useEffect(() => {
        setGroupData({
            name: 'OverCookedCookies',
            members: [
                {
                    name: 'Member 1',
                    currentWork: 'Work 1',
                    blocker: [
                        {
                            text: 'Blocker 1'
                        }
                    ]
                },
                {
                    name: 'Member 2',
                    currentWork: 'Work 2',
                    blocker: [
                        {
                            text: 'Blocker 2'
                        }
                    ]
                }
            ]
        });
    }, []);
    console.log(groupData);
    const contentContainer = {
        fontFamily: 'Heebo',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // width: '10vw',
        height: '90vh',
        backgroundColor: 'rgb(232, 200, 168)',
    }

    const contentHeader = {
    }

    const headerText = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Heebo',
        fontSize: '3vw',
        fontWeight: '500',
        color: 'rgb(232, 200, 168)',
        filter: 'invert(1)',
    }

    const bodyCont = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '95vw',
        height: '80vh',
        backgroundColor: 'rgb(168, 139, 110)',
    }

    const teamContainer = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 128, 0)',
        width: '20%',
        borderRadius: '50px',
        padding: '50px',
    }

    const teamText = {
        
    }

    const teamMemberContainer = {
    }

    const teamMember = {
    }

    const teamMemberText = {
    }

    const blockerBoardContainer = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 128, 0)',
        width: '65%',
        borderRadius: '50px',
        padding: '50px',
    }

    const BlockerHeaderText = {
    }

    const blockerBoard = {
    }   

    const blocker = {
    }

    const blockerText = {
    }

    return (
        <>  
        
            <Box style={contentContainer}>
                <Box sx={contentHeader}>
                    <Typography sx={headerText}>{groupData.name}</Typography>
                </Box>
                <Box sx={bodyCont}>
                    <Box sx={teamContainer}>
                        <Typography sx={teamText}>Team</Typography>
                        <Box sx={teamMemberContainer}>
                            
                        </Box>
                    </Box>
                    <Box sx={blockerBoardContainer}>
                        <Typography sx={BlockerHeaderText}>Blockers</Typography>
                        <Box sx={blockerBoard}>
                            
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GroupsLanding;