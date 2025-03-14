import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import Profile from './pages/Profile'

const PageManager = () => {
    // Setting token for login permissions
    const [token, setToken] = React.useState(undefined);

    React.useEffect(() => {
        const checkToken = localStorage.getItem('token');
        if (checkToken) {
          setToken("checkToken");
        }
      }, []);

    // This helps us with links to other pages
    const navigate = useNavigate();

    const logout = async () => {
        // const response = await fetch(`${LOCAL_SERVER}/v2/auth/logout`, {
        //   method: 'PUT',
        //   headers: {
        //     token
        //   }
        // });
        // const data = await response.json();
        // if (data.error) {
        //   alert(data.error);
        // } else {
        //   console.log('Logged out!');
        //   setToken(null);
        //   localStorage.removeItem('token');
        //   navigate('/');
        // }
      };

    return (
        <>

            <Routes>
                {/* <Route path="/" element={<Welcome token={token} setToken={setToken}/>}></Route>
                <Route path="/login" element={<Login token={token} setToken={setToken}/>}></Route>
                <Route path="/register" element={<Register token={token} setToken={setToken}/>}></Route> */}
                <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
        </>
    )
    //     <>
        
    //         {token
    //             ? (
                  
    //             )
    //             : (
    //                 <>
    //                   <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'#292A3B' }}>
    //                     <img src="darklogo.png" alt="LOGO" style={{ width: '100px', height: 'auto', margin: '10px' }}/>
    //                     <Link to="/register">
    //                           <Button variant="contained" style={{ color: 'white', margin:'10px'}}>Register</Button>
    //                       </Link>
    //                       &nbsp;&nbsp;
    //                       <Link to="/login">
    //                           <Button variant="contained" style={{ color: 'white', margin:'10px'}}>Login</Button>
    //                       </Link>
    //                   </div>
    //                 </>
    //             )
    //         }

            
    //     </>
        
    // )
}

export default PageManager;