import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroAprendiz from './RegistroAprendiz';
import RegistroCurso from './RegistroCurso';
import RegistroLeccion from './RegistroLeccion';
import RegistroCertificado from './RegistroCertificado';
import TablaAprendices from './TablaAprendices';
import TablaCursos from './TablaCursos';
import TablaLecciones from './TablaLecciones';
import TablaCertificados from './TablaCertificados';
import { Button } from './ui/Button';
import AuthService from '../services/authService';

const AdminPanel = ({ setActiveSection }) => {
  const [activeAdminSection, setActiveAdminSection] = useState('menu');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar autenticación y rol al cargar el componente
    const checkAuth = () => {
      if (AuthService.isAuthenticated()) {
        const userData = AuthService.getUserData();
        // Verificar si el usuario es administrador (tipoUsuario === 1)
        if (userData && userData.tipoUsuario === 1) {
          setIsAuthorized(true);
        } else {
          // Si no es administrador, redirigir al login
          setActiveSection('login');
        }
      } else {
        // Si no está autenticado, redirigir al login
        setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const formStyles = "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500";

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  const renderSection = () => {
    switch (activeAdminSection) {
      case 'registroAprendiz':
        return <RegistroAprendiz setActiveSection={() => setActiveAdminSection('menu')} formStyles={formStyles} />;
      case 'registroCurso':
        return <RegistroCurso setActiveSection={() => setActiveAdminSection('menu')} formStyles={formStyles} />;
      case 'registroLeccion':
        return <RegistroLeccion setActiveSection={() => setActiveAdminSection('menu')} formStyles={formStyles} />;
      case 'registroCertificado':
        return <RegistroCertificado setActiveSection={() => setActiveAdminSection('menu')} formStyles={formStyles} />;
      case 'gestionAprendices':
        return <TablaAprendices />;
      case 'gestionCursos':
        return <TablaCursos />;
      case 'gestionLecciones':
        return <TablaLecciones />;
      case 'gestionCertificados':
        return <TablaCertificados />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Registros</h3>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveAdminSection('registroAprendiz')}
              >
                Registrar Aprendiz
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveAdminSection('registroCurso')}
              >
                Registrar Curso
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveAdminSection('registroLeccion')}
              >
                Registrar Lección
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveAdminSection('registroCertificado')}
              >
                Registrar Certificado
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Gestión</h3>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveAdminSection('gestionAprendices')}
              >
                Gestionar Aprendices
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveAdminSection('gestionCursos')}
              >
                Gestionar Cursos
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveAdminSection('gestionLecciones')}
              >
                Gestionar Lecciones
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveAdminSection('gestionCertificados')}
              >
                Gestionar Certificados
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {activeAdminSection !== 'menu' && (
        <Button 
          className="mb-4 bg-gray-600 hover:bg-gray-700 text-white"
          onClick={() => setActiveAdminSection('menu')}
        >
          Volver al Menú
        </Button>
      )}
      {renderSection()}
    </div>
  );
};

export default AdminPanel;