import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RegistroCertificado from './pages/RegistroCertificado';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro-certificados" element={<RegistroCertificado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;