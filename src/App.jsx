import Main from "./Home";
import { useState } from 'react';
import Contact from './pages/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return ( 
  <Router>
      <Routes>
        <Route path="/" element={<Main />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>

  );
}

export default App;
