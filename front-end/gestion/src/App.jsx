import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Login from './components/Login';
import Certificados from './components/Certificados';
import AdminPanel from './components/AdminPanel';
import RegistroCurso from './components/RegistroCurso';
import RegistroLeccion from './components/RegistroLeccion';
import RegistroCertificado from './components/RegistroCertificado';
import RegistroAprendiz from './components/RegistroAprendiz';
import AprendizPanel from './components/AprendizPanel';
import Registro from './components/Registro';
import { Button } from './components/ui/Button';
import AuthService from './services/authService';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('login');
  const [loggedUser, setLoggedUser] = useState(null);

  // Verificar si hay usuario autenticado al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = () => {
      if (AuthService.isAuthenticated()) {
        const userData = AuthService.getUserData();
        if (userData) {
          setLoggedUser(userData);
          
          // Redireccionar según el tipo de usuario
          if (userData.tipoUsuario === 1) {
            setActiveSection('admin');
          } else if (userData.tipoUsuario === 2) {
            setActiveSection('aprendizPanel');
          }
        }
      }
    };
    
    checkAuthStatus();
  }, []);

  const formStyles = "border p-2 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500";
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    AuthService.logout();
    setLoggedUser(null);
    setActiveSection('login');
  };

  const sections = {
    login: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Login setActiveSection={setActiveSection} formStyles={formStyles} setLoggedUser={setLoggedUser} />
      </motion.div>
    ),
    registro: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Registro setActiveSection={setActiveSection} formStyles={formStyles} />
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
    ),
    aprendizPanel: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <AprendizPanel aprendizId={loggedUser?.id_aprendiz} />
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 shadow-md text-white fixed w-full z-10">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <span className="font-bold text-xl px-4 py-2 mr-auto ">Sistema Académico</span>
          <div className="px-4 py-2 ml-auto">
            {activeSection !== 'login' && activeSection !== 'registro' && (
              <Button 
                className="bg-white text-indigo-600 m-1 px-4 py-2 text-lg shadow-lg hover:bg-gray-100" 
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
            {(activeSection === 'login' || activeSection === 'registro') && (
              <div className="flex space-x-4">
                <Button 
                  className={`${activeSection === 'login' ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white'} px-4 py-2`}
                  onClick={() => setActiveSection('login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  className={`${activeSection === 'registro' ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white'} px-4 py-2`}
                  onClick={() => setActiveSection('registro')}
                >
                  Registrarse
                </Button>
              </div>
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