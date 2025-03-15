import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import PageManager from './PageManager';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Heebo',
    ].join(','),
  },});

function App() {
  return (
    <>
    <Router>
      <PageManager/>
    </Router>
   </>
  );
}

export default App;
