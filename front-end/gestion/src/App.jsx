import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import Login from './components/Login';
import Certificados from './components/Certificados';
import AdminPanel from './components/AdminPanel';
import RegistroCurso from './components/RegistroCurso';
import RegistroLeccion from './components/RegistroLeccion';
import RegistroCertificado from './components/RegistroCertificado';
import { Button } from './components/ui/Button'; // Importa el componente Button
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('login');
  const [loggedUser, setLoggedUser] = useState(null);
  const [aprendiz, setAprendiz] = useState({ nombre: '', correo: '', documento: '', contrasena: '', tipoUsuario: '' });
  const [curso, setCurso] = useState({ nombre: '', numeroPrograma: '', descripcion: '' });
  const [leccion, setLeccion] = useState({ nombre: '', ruta: '', idCurso: '' });
  const [certificado, setCertificado] = useState({ nombre: '', numeroDocumento: '', fechaFin: '', idAprendiz: '', idLeccion: '' });

  const handleChange = (setter) => (e) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    if (aprendiz.documento) {
      setLoggedUser(aprendiz.documento);
      if (aprendiz.tipoUsuario === '1') {
        setActiveSection('admin');
      } else {
        setActiveSection('certificados');
      }
    } else {
      alert('Documento requerido');
    }
  };

  const handleSubmit = (data, name) => {
    alert(`${name}: ${JSON.stringify(data)}`);
  };

  const formStyles = "border p-2 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500";
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = {
    login: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Login handleChange={handleChange(setAprendiz)} handleLogin={handleLogin} formStyles={formStyles} />
      </motion.div>
    ),
    certificados: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Certificados loggedUser={loggedUser} setActiveSection={setActiveSection} />
      </motion.div>
    ),
    admin: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <AdminPanel setActiveSection={setActiveSection} />
      </motion.div>
    ),
    curso: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroCurso curso={curso} setCurso={setCurso} handleChange={handleChange} handleSubmit={handleSubmit} setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    leccion: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroLeccion leccion={leccion} setLeccion={setLeccion} handleChange={handleChange} handleSubmit={handleSubmit} setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    ),
    certificado: (
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <RegistroCertificado certificado={certificado} setCertificado={setCertificado} handleChange={handleChange} handleSubmit={handleSubmit} setActiveSection={setActiveSection} formStyles={formStyles} />
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 shadow-md text-white">
        <div className="container mx-auto flex justify-between">
          <span className="font-bold">Sistema Académico</span>
          <div>
            {loggedUser && (
              <Button className="bg-white text-indigo-600" onClick={() => setActiveSection('certificados')}>Ver Certificados</Button>
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