import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {TextField, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import axios from 'axios';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import "./style.css";
import { API_URL } from '../App';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  let randomInt = getRandomInt(1, 10);

export default function Profile({token}) {
    const [userData, setUserData] = React.useState('');
    const [openJoin, setOpenJoin] = React.useState(false);
    const [addMembers, setAddMembers] = React.useState([])
    const handleClickOpenJoin = () => {
      setOpenJoin(true);
    };
  
    const handleCloseJoin = () => {
      setOpenJoin(false);
    };
  
    const [openCreate, setOpenCreate] = React.useState(false);
    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    };
  
    const handleCloseCreate = () => {
      setOpenCreate(false);
    };

    const teamDisplay = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw',
        flexWrap: 'wrap',
    }

    const contentContainer = {
        color: '#f0f0f0',
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        fontFamily: 'Inter',
        backgroundColor: 'rgb(232, 200, 168)'
    }

    const pfpStyle = {
        height: '20vw',
        width: '20vw',
    }

    const teamContainer = {
        width: '59vw'
    }

    React.useEffect(() => {
      axios.get(`${API_URL}/api/users/me`, {headers: {'X-User-Id': token}})
      .then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        console.log(error.response.data.server);
      })
    }, []);

    React.useEffect(() => {
      displayTeams();
    }, [userData, addMembers])
    
    React.useEffect(() => {
      displayTeams();
    }, [addMembers])

    const displayTeams = () => {
      if (userData && userData.groups.length == 0) return (<Typography variant="h5" style={{padding:'8px'}}>BRuh Join a team</Typography>);
      else {
        return (
          <Box sx={teamDisplay}>
            {userData && userData.groups.map((team) => (<>
            <Link to={`/Teams/${team.groupName}`}>
                <div class="main">
                  <div class="card" style={{backgroundImage: `url(/imgs/BackImages/${getRandomInt(1, 10)}.jpg)`, backgroundSize: 'cover'}}>
                    <div class="card_content" >
                      <label class="switch_738">
                        <input type="checkbox" class="chk_738"></input>
                      </label>
                    </div> 
                  </div>
                  <div class="data" style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '2px', justifyContent: 'left'}}>
                    <div class="img">
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80">
                      <g stroke-width="2.00" fill="none" stroke-linecap="butt">
                      <path stroke="#59afb1" d="M 14.06 0.00
                        Q 13.33 4.09 13.93 7.52
                        A 1.04 1.02 -78.7 0 0 14.37 8.19
                        L 32.87 20.19"></path>
                      <path stroke="#4fa6a8" d="M 32.87 20.19
                        L 42.25 26.79"></path>
                      <path stroke="#69cbc0" d="M 42.25 26.79
                        C 41.40 28.26 24.14 34.92 21.32 36.20"></path>
                      <path stroke="#6fcdbb" d="M 21.32 36.20
                        Q 15.81 38.21 11.00 41.21"></path>
                      <path stroke="#5ec8ab" d="M 11.00 41.21
                        L 9.75 40.96"></path>
                      <path stroke="#5cae9e" d="M 9.75 40.96
                        Q 5.99 37.71 1.71 35.19
                        A 1.00 1.00 0.0 0 0 0.22 35.85
                        L 0.00 36.94"></path>
                      <path stroke="#3190a6" d="M 79.95 6.12
                        L 62.46 11.32"></path>
                      <path stroke="#3a96a3" d="M 62.46 11.32
                        Q 47.42 14.67 32.87 20.19"></path>
                      <path stroke="#22a3be" d="M 80.00 11.06
                        L 64.50 17.46"></path>
                      <path stroke="#28879d" d="M 64.50 17.46
                        L 62.46 11.32"></path>
                      <path stroke="#2ba9bb" d="M 64.50 17.46
                        L 43.00 26.96"></path>
                      <path stroke="#4ab2b2" d="M 43.00 26.96
                        L 42.25 26.79"></path>
                      <path stroke="#45ced3" d="M 80.00 52.31
                        Q 71.64 45.91 62.46 40.67"></path>
                      <path stroke="#13636e" d="M 62.46 40.67
                        Q 62.43 36.88 58.50 36.79"></path>
                      <path stroke="#45ced3" d="M 58.50 36.79
                        Q 50.07 32.95 43.00 26.96"></path>
                      <path stroke="#326b65" d="M 58.50 36.79
                        Q 55.85 40.04 56.86 44.07
                        C 57.53 46.71 60.02 47.68 61.77 45.19
                        Q 61.91 44.99 61.94 44.74
                        L 62.46 40.67"></path>
                      <path stroke="#59d4b5" d="M 40.81 79.86
                        Q 46.22 74.94 52.34 70.94
                        A 1.00 1.00 0.0 0 0 52.39 69.30
                        Q 44.74 63.65 43.10 62.62
                        Q 34.11 56.98 32.50 55.79"></path>
                      <path stroke="#6ad8c5" d="M 32.50 55.79
                        C 36.74 55.42 30.64 48.79 29.79 47.81
                        C 27.54 45.21 26.34 42.09 24.05 39.44
                        Q 22.66 37.82 21.32 36.20"></path>
                      <path stroke="#326b65" d="M 48.75 39.07
                        A 2.30 2.30 0.0 0 0 46.45 36.77
                        L 46.05 36.77
                        A 2.30 2.30 0.0 0 0 43.75 39.07
                        L 43.75 44.21
                        A 2.30 2.30 0.0 0 0 46.05 46.51
                        L 46.45 46.51
                        A 2.30 2.30 0.0 0 0 48.75 44.21
                        L 48.75 39.07"></path>
                      <path stroke="#326b65" d="M 58.63 54.41
                        C 54.90 57.18 50.72 56.87 46.91 54.39
                        A 1.00 0.99 51.9 0 0 46.04 54.28
                        C 42.37 55.52 43.88 58.13 46.28 59.41
                        Q 53.38 63.20 60.15 58.94
                        C 62.54 57.43 62.47 54.80 59.41 54.23
                        A 1.00 1.00 0.0 0 0 58.63 54.41"></path>
                      <path stroke="#4bb793" d="M 9.75 40.96
                        Q 5.15 43.50 0.05 44.46"></path>
                      <path stroke="#5fd6b0" d="M 32.50 55.79
                        L 11.00 41.21"></path>
                      <path stroke="#48d08e" d="M 11.19 80.00
                        Q 12.51 79.61 11.57 78.67
                        Q 5.99 73.11 1.70 65.70
                        C 1.28 64.97 0.74 64.76 0.00 65.19"></path>
                      </g>
                      <path fill="#6ebfb6" d="M 0.00 0.00
                        L 14.06 0.00
                        Q 13.33 4.09 13.93 7.52
                        A 1.04 1.02 -78.7 0 0 14.37 8.19
                        L 32.87 20.19
                        L 42.25 26.79
                        C 41.40 28.26 24.14 34.92 21.32 36.20
                        Q 15.81 38.21 11.00 41.21
                        L 9.75 40.96
                        Q 5.99 37.71 1.71 35.19
                        A 1.00 1.00 0.0 0 0 0.22 35.85
                        L 0.00 36.94
                        L 0.00 0.00
                        Z"></path>
                      <path fill="#439eac" d="M 14.06 0.00
                        L 80.00 0.00
                        L 79.95 6.12
                        L 62.46 11.32
                        Q 47.42 14.67 32.87 20.19
                        L 14.37 8.19
                        A 1.04 1.02 -78.7 0 1 13.93 7.52
                        Q 13.33 4.09 14.06 0.00
                        Z"></path>
                      <path fill="#1f81a0" d="M 79.95 6.12
                        L 80.00 11.06
                        L 64.50 17.46
                        L 62.46 11.32
                        L 79.95 6.12
                        Z"></path>
                      <path fill="#308d99" d="M 62.46 11.32
                        L 64.50 17.46
                        L 43.00 26.96
                        L 42.25 26.79
                        L 32.87 20.19
                        Q 47.42 14.67 62.46 11.32
                        Z"></path>
                      <path fill="#25c5dc" d="M 80.00 11.06
                        L 80.00 52.31
                        Q 71.64 45.91 62.46 40.67
                        Q 62.43 36.88 58.50 36.79
                        Q 50.07 32.95 43.00 26.96
                        L 64.50 17.46
                        L 80.00 11.06
                        Z"></path>
                      <path fill="#64d6ca" d="M 42.25 26.79
                        L 43.00 26.96
                        Q 50.07 32.95 58.50 36.79
                        Q 55.85 40.04 56.86 44.07
                        C 57.53 46.71 60.02 47.68 61.77 45.19
                        Q 61.91 44.99 61.94 44.74
                        L 62.46 40.67
                        Q 71.64 45.91 80.00 52.31
                        L 80.00 80.00
                        L 40.81 79.86
                        Q 46.22 74.94 52.34 70.94
                        A 1.00 1.00 0.0 0 0 52.39 69.30
                        Q 44.74 63.65 43.10 62.62
                        Q 34.11 56.98 32.50 55.79
                        C 36.74 55.42 30.64 48.79 29.79 47.81
                        C 27.54 45.21 26.34 42.09 24.05 39.44
                        Q 22.66 37.82 21.32 36.20
                        C 24.14 34.92 41.40 28.26 42.25 26.79
                        Z
                        M 48.75 39.07
                        A 2.30 2.30 0.0 0 0 46.45 36.77
                        L 46.05 36.77
                        A 2.30 2.30 0.0 0 0 43.75 39.07
                        L 43.75 44.21
                        A 2.30 2.30 0.0 0 0 46.05 46.51
                        L 46.45 46.51
                        A 2.30 2.30 0.0 0 0 48.75 44.21
                        L 48.75 39.07
                        Z
                        M 58.63 54.41
                        C 54.90 57.18 50.72 56.87 46.91 54.39
                        A 1.00 0.99 51.9 0 0 46.04 54.28
                        C 42.37 55.52 43.88 58.13 46.28 59.41
                        Q 53.38 63.20 60.15 58.94
                        C 62.54 57.43 62.47 54.80 59.41 54.23
                        A 1.00 1.00 0.0 0 0 58.63 54.41
                        Z"></path>
                      <path fill="#499c85" d="M 9.75 40.96
                        Q 5.15 43.50 0.05 44.46
                        L 0.00 36.94
                        L 0.22 35.85
                        A 1.00 1.00 0.0 0 1 1.71 35.19
                        Q 5.99 37.71 9.75 40.96
                        Z"></path>
                      <path fill="#70dac0" d="M 21.32 36.20
                        Q 22.66 37.82 24.05 39.44
                        C 26.34 42.09 27.54 45.21 29.79 47.81
                        C 30.64 48.79 36.74 55.42 32.50 55.79
                        L 11.00 41.21
                        Q 15.81 38.21 21.32 36.20
                        Z"></path>
                      <rect fill="#000000" x="43.75" y="36.77" width="5.00" height="9.74" rx="2.30"></rect>
                      <path fill="#000000" d="M 58.50 36.79
                        Q 62.43 36.88 62.46 40.67
                        L 61.94 44.74
                        Q 61.91 44.99 61.77 45.19
                        C 60.02 47.68 57.53 46.71 56.86 44.07
                        Q 55.85 40.04 58.50 36.79
                        Z"></path>
                      <path fill="#4dd1a0" d="M 9.75 40.96
                        L 11.00 41.21
                        L 32.50 55.79
                        Q 34.11 56.98 43.10 62.62
                        Q 44.74 63.65 52.39 69.30
                        A 1.00 1.00 0.0 0 1 52.34 70.94
                        Q 46.22 74.94 40.81 79.86
                        L 11.19 80.00
                        Q 12.51 79.61 11.57 78.67
                        Q 5.99 73.11 1.70 65.70
                        C 1.28 64.97 0.74 64.76 0.00 65.19
                        L 0.05 44.46
                        Q 5.15 43.50 9.75 40.96
                        Z"></path>
                      <path fill="#000000" d="M 46.91 54.39
                        C 50.72 56.87 54.90 57.18 58.63 54.41
                        A 1.00 1.00 0.0 0 1 59.41 54.23
                        C 62.47 54.80 62.54 57.43 60.15 58.94
                        Q 53.38 63.20 46.28 59.41
                        C 43.88 58.13 42.37 55.52 46.04 54.28
                        A 1.00 0.99 51.9 0 1 46.91 54.39
                        Z"></path>
                      <path fill="#43ce7c" d="M 11.19 80.00
                        L 0.00 80.00
                        L 0.00 65.19
                        C 0.74 64.76 1.28 64.97 1.70 65.70
                        Q 5.99 73.11 11.57 78.67
                        Q 12.51 79.61 11.19 80.00
                        Z"></path>
                      </svg>
                    </div>
                    <div class="text">
                      <div class="text_m">{team.groupName}</div>
                      <div class="text_s">{team.ownerName}</div>
                    </div>
                  </div>
                  <div class="btns">
                    <div class="comments" style={{padding: '4px'}}>
                      <Box sx={{display: 'flex'}}>
                        <HourglassTopIcon sx={{color: 'white'}}></HourglassTopIcon>
                        <Typography sx={{color: 'white'}}>12</Typography>
                      </Box>
                    </div>
                  </div>
                </div>
              </Link>
            </>))}
          </Box>
        );
      }
    }
    return (
      <>
        <Box sx={{height: '100%'}}>
          <Box sx={contentContainer}>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '4%', gap: '10%'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', gap: '10px'}}> 
                <Box>
                  <img src="/imgs/pfp.svg" style={pfpStyle}></img>
                </Box>
                <Box style={{fontSize: '50px', padding:'8px', color:'black', fontFamily: 'Heebo', fontWeight: 'bold'}}>
                    {userData && userData.name}<br></br>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '15px'}}>
                  <Button onClick={handleClickOpenJoin} sx={{width: '60%', height: '60px', fontSize: '1.2em', bgcolor: '#d38d48'}} variant='contained'>Join Team</Button>
                  <Dialog
                    open={openJoin}
                    onClose={handleCloseJoin}
                    slotProps={{
                      paper: {
                        component: 'form',
                        onSubmit: (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const group = formData.get('group-name');
                          axios.post(`${API_URL}/api/groups/${group}/join`, {
                            'X-User-Id': token,
                            'groupId': group
                          }).then((response) => {
                            const updatedUser = {
                              ...userData,
                              groups: { ...group, ...response.data }
                            };
                            setUserData(updatedUser)
                          }).catch((error) => {console.log(error.response.data.server)})
                          handleCloseJoin();
                        },
                      },
                    }}
                    sx={{
                      '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                          bgcolor:'#d38d48',
                          width: 400,
                          height: 170,
                        },
                      },
                    }}
                    
                  >
                    <DialogContent>
                      <TextField
                        required
                        fullWidth
                        margin='dense'
                        id='group-name'
                        name='group-name'
                        label='Group Name'
                        variant='standard'
                        autoComplete='off'
                        sx={{
                          '& label.Mui-focused': {
                            color: '#693502'
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#693502'
                          },
                        }}
                      />
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'space-between'}}>
                      <Button sx ={{color: 'white'}}onClick={handleCloseJoin}>Cancel</Button>
                      <Button sx={{color: '#693502'}}type="submit">Join</Button>
                    </DialogActions>
                  </Dialog>
                  <Button onClick={handleClickOpenCreate} sx={{width: '80%', fontSize: '1.3em', bgcolor: '#693502'}} variant='contained'>Create a Team</Button>
                  <Dialog
                    open={openCreate}
                    onClose={handleCloseCreate}
                    slotProps={{
                      paper: {
                        component: 'form',
                        onSubmit: (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const group = formData.get('group-name');
                          const description = formData.get('description')
                          const users = formData.get('users').split(',');
                          axios.post(`${API_URL}/api/groups/create`, 
                            {
                              "groupName": group,
                              "description": description,
                            },
                            {
                              headers: {
                                'X-User-Id': token
                              },
                            }
                          ).then((response) => {setAddMembers(response.data.memberNames)})
                          .catch((error) => {console.log(error.response.data.server)})
                          handleCloseCreate();
                        },
                      },
                    }}
                    sx={{
                      '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                          bgcolor:'#d38d48',
                          width: 400,
                          height: 300,
                        },
                      },
                    }}
                  >
                    <DialogContent>
                      <TextField
                        required
                        fullWidth
                        margin='dense'
                        id='group-name'
                        name='group-name'
                        label='Group Name'
                        variant='standard'
                        autoComplete='off'
                        sx={{
                          '& label.Mui-focused': {
                            color: '#693502'
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#693502'
                          },
                        }}
                      />
                      <TextField
                        required
                        fullWidth
                        margin='dense'
                        id='description'
                        name='description'
                        label='Description'
                        variant='standard'
                        autoComplete='off'
                        sx={{
                          '& label.Mui-focused': {
                            color: '#693502'
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#693502'
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        margin='dense'
                        id='users'
                        name='users'
                        label='Add Users'
                        variant='standard'
                        autoComplete='off'
                        sx={{
                          '& label.Mui-focused': {
                            color: '#693502'
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#693502'
                          },
                        }}
                      />
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'space-between'}}>
                      <Button sx ={{color: 'white'}}onClick={handleCloseCreate}>Cancel</Button>
                      <Button sx={{color: '#693502'}}type="submit">Create</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
              <Box sx={teamContainer}>
                  {displayTeams()}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
}
