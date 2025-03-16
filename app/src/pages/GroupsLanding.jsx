import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Box, Modal, Alert, AlertTitle, colors, getAppBarUtilityClass } from '@mui/material'; 
import { Padding } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import './group.css'
import { getTeamInfo, getUserInfo } from '../helpers/helpers';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function GroupsLanding (token) {
    const navigate = useNavigate();
    const { TeamName } = useParams(); 
    const [groupData, setGroupData] = React.useState({});
    const [userData, setUserData] = React.useState({});

    const fetchGroupData = async () => {
        try {
            const groupData = await getTeamInfo(token, TeamName);
            setGroupData(groupData);
        } catch (error) {
            console.error('Error fetching group:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const userData = await getUserInfo(token);
            setUserData(userData);
            console.log(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    React.useEffect(() => {
        fetchGroupData();
        fetchUserData();
    }, []);
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
        padding: '20px',
        backgroundColor: 'rgb(168, 139, 110)',
    }

    const teamContainer = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 128, 0)',
        paddingTop: '10px',
        borderRadius: '50px',
        padding: '20px 20px',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomLeftRadius: '25px',
        borderBottomRightRadius: '25px',
        height: '65%',
    }

    const teamText = {
        padding: '20px 0px',
        fontFamily: 'Heebo',
        fontSize: '2vw',
        margin: '0px',
        padding: '5px',
        paddingLeft: '10px',
        color: 'rgb(25, 12, 0)',
        fontWeight: 'bold',
        
    }

    const teamMemberContainer = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#99C1B9',
        borderRadius: '20px',
        padding: '20px',
        height: '70%',
        overflow: 'scroll',
        overflowX: 'hidden',
        
    }

    const teamMember = {
        fontFamily: 'Heebo',
        marginLeft: '10px',
        paddingRight: '10px',
    }

    const teamMemberText = {
        marginLeft: '10px',
        fontFamily: 'Inter',
    }

    const blockerBoardContainer = {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(255, 128, 0)',
        width: '50%',
        borderRadius: '20px',
        padding: '50px',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    const BlockerHeaderText = {
    }
    const bb = {
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    }
    const blockerBoard = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#99C1B9',
        borderRadius: '20px',
        padding: '20px',
        height: '500px',

        width: '100%',
        overflow: 'scroll',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        overflowX: 'hidden',
    }  

    const blockerBoard1 = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '10px',
        backgroundColor: '#99C1B9',
        borderRadius: '20px',
        // padding: '20px',
        height: '100%',
        width: '60%',
        overflow: 'scroll',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        overflowX: 'hidden',
    }

    const blocker = {
    }

    const blockerText = {
    }

    const MemberContainer = {
        backgroundColor: '#F2D0A9',
        borderRadius: '50px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        height: '50px',
    }
    
    const HAHAHA = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '50px',
        backgroundColor: '#99C1B9',
        padding: '5px',
        paddingRight: '10px',
        margin: '5px',
        justifyContent: 'space-between',
        gap: '5px',
    }

    const LeftContainer = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '45%',
        padding: '20px',
    }

    const SummaryContainer = {
        backgroundColor: '#F2D0A9',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        padding: '20px',
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
    }

    const StandupNotif = (member) => {
        if (member.currentStatus.localeCompare("No status update") != 0) return <></>
        const formattedDate = new Date(member.lastUpdated).toLocaleDateString('en-GB');
        return (
            <Box>
            <div class="card">
            <div class="img"></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">{member.userName}</p>
                <span class="span">{formattedDate}</span>
                </div>
                <p class="p">StandUp is not updated!</p>
            <div>
            </div></div></div>
            </Box>
        )
    }

    const getuserWork = () => {
        if (groupData.memberStatuses == undefined) return "No status update";
        const work =  groupData.memberStatuses.find(g => g.userId == userData.userId);
        if (work == undefined) return "No status update";
        return work.currentStatus;
    }


    const BlockerNotif = (blocker) => {
        return (
            <Box sx={{width: '47%'}}>
                <div class="cardL">
    <div class="card__wrapper">
        <div class="card___wrapper-acounts">
            <div class="card__score">+3</div>
        </div>
        <div class="card__menu"><svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none"><g fill="#000"><path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path><path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z"></path><path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path></g></svg></div>
    </div>
    <div class="card__title">Web Design templates
        Selection</div>
    <div class="card__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod.</div>
    <div class="card__indicator"><span class="card__indicator-amount">135</span> Works / <span class="card__indicator-percentage">45%</span></div>
    <div class="card__progress"><progress max="100" value="40"></progress></div>
</div>
            </Box>
        )
    }
    return (
        <>
            <Box style={contentContainer}>
                <Box sx={contentHeader}>
                    <Typography sx={headerText}>{groupData.name}</Typography>
                </Box>
                <Box sx={bodyCont}>
                    <Box sx={LeftContainer}>
                        <Box sx={SummaryContainer}>
                            <Typography>Summary</Typography>
                            <Typography>{(groupData.currentSummary) ? groupData.currentSummary : "No summary yet"}</Typography>
                        </Box>
                        <Box sx={teamContainer}>
                            <Box sx={MemberContainer}>
                                    <Box sx={HAHAHA}>
                                        <img src='/imgs/pfp.svg' alt="profile" style={{height: '30px', borderRadius: '50%'}}></img>
                                        <Typography sx={teamMember}>You</Typography>
                                    </Box>
                                    <Typography sx={teamMemberText}>{getuserWork() }</Typography>
                            </Box>
                        
                            <Typography sx={teamText}>Team</Typography>
                            <Box sx={teamMemberContainer}>
                                {groupData.memberStatuses ? 
                                    (groupData.memberStatuses.map((member, index) => (
                                        <Box sx={MemberContainer}>
                                            <Box sx={HAHAHA}>
                                                <img src={`/imgs/pfps/${getRandomInt(1,8)}.svg`} alt="profile" style={{height: '30px', borderRadius: '50%'}}></img>
                                                <Typography sx={teamMember}>{member.userName}</Typography>
                                            </Box>
                                            <Typography sx={teamMemberText}>{member.currentStatus}</Typography>
                                        </Box>
                                    ))) :
                                    (<Typography> No members </Typography>)
                            }
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={blockerBoardContainer}>
                        <Box sx={bb}>
                            <Box onClick={() => {navigate(`/Teams/${groupData.groupName}/form`)}}>
                                <div class="card">
                                <AddIcon sx={{fontSize: '50px', color: 'rgb(25, 12, 0)'}}></AddIcon>
                                <div class="textBox">
                                    <p class="p">Update your Standup here !</p>
                                <div>
                </div></div></div> 
                            </Box>
                            <Box sx={blockerBoard}>
                                <Typography sx={BlockerHeaderText}>Late Standups</Typography>
                                {groupData.memberStatuses ? 
                                        (groupData.memberStatuses.map((member, index) => (
                                            StandupNotif(member)
                                        ))) :
                                        (<Typography> No members </Typography>)
                                }
                            </Box>
                        </Box>
                        <Box sx={blockerBoard1}>
                            
                            {groupData.activeBlockers ? 
                                    (groupData.activeBlockers.map((member, index) => (
                                        BlockerNotif(member)
                                    ))) :
                                    (<Typography> No members </Typography>)
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GroupsLanding;