import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Zirve.css';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/Home';
import Study from './components/Study';

function App() {
  return (
    <Router>
      <div className="App">
          
        <Routes>
          <Route path="/" element={<HomePage />} />   
          <Route path="/calis" element={<Study />} />   
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;
