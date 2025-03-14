import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PageManager from './PageManager';

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
