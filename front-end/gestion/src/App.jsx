import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import Login from './components/Login';
import Certificados from './components/Certificados';
import AdminPanel from './components/AdminPanel';
import RegistroCurso from './components/RegistroCurso';
import RegistroLeccion from './components/RegistroLeccion';
import RegistroCertificado from './components/RegistroCertificado';
import RegistroAprendiz from './components/RegistroAprendiz';
import { Button } from './components/ui/Button';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('login');
  const [loggedUser, setLoggedUser] = useState(null);

  const formStyles = "border p-2 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500";
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = {
    login: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Login setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    certificados: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Certificados setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    admin: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <AdminPanel setActiveSection={setActiveSection} />
      </motion.div>
    ),
    registroCurso: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroCurso setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    registroLeccion: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroLeccion setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    registroCertificado: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroCertificado setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    aprendices: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroAprendiz setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="container mx-auto flex justify-between">
          <span className="font-bold">Sistema Académico</span>
          <div>
            {activeSection !== 'login' && (
              <Button 
                className="bg-white text-indigo-600" 
                onClick={() => setActiveSection('login')}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      </nav>
      <div className="p-10 flex justify-center items-center">
        {sections[activeSection]}
      </div>
    </div>
  );
}

export default App;