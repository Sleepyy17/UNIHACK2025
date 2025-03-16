import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { createGlobalStyle } from 'styled-components'; 

import PageManager from './PageManager';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Heebo',
    ].join(','),
  },});

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export const API_URL = 'http://localhost:5050';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <PageManager/>
      </Router>
    </>
  );
}

export default App;
