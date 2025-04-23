import React, { useState } from 'react';
import RegistroAprendiz from './RegistroAprendiz';
import RegistroCurso from './RegistroCurso';
import RegistroLeccion from './RegistroLeccion';
import RegistroCertificado from './RegistroCertificado';
import TablaAprendices from './TablaAprendices';
import TablaCursos from './TablaCursos';
import TablaLecciones from './TablaLecciones';
import TablaCertificados from './TablaCertificados';
import { Button } from './ui/Button';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('menu');

  const formStyles = "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const renderSection = () => {
    switch (activeSection) {
      case 'registroAprendiz':
        return <RegistroAprendiz setActiveSection={setActiveSection} formStyles={formStyles} />;
      case 'registroCurso':
        return <RegistroCurso setActiveSection={setActiveSection} formStyles={formStyles} />;
      case 'registroLeccion':
        return <RegistroLeccion setActiveSection={setActiveSection} formStyles={formStyles} />;
      case 'registroCertificado':
        return <RegistroCertificado setActiveSection={setActiveSection} formStyles={formStyles} />;
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
                onClick={() => setActiveSection('registroAprendiz')}
              >
                Registrar Aprendiz
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveSection('registroCurso')}
              >
                Registrar Curso
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveSection('registroLeccion')}
              >
                Registrar Lección
              </Button>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setActiveSection('registroCertificado')}
              >
                Registrar Certificado
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Gestión</h3>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveSection('gestionAprendices')}
              >
                Gestionar Aprendices
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveSection('gestionCursos')}
              >
                Gestionar Cursos
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveSection('gestionLecciones')}
              >
                Gestionar Lecciones
              </Button>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setActiveSection('gestionCertificados')}
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
      {activeSection !== 'menu' && (
        <Button 
          className="mb-4 bg-gray-600 hover:bg-gray-700 text-white"
          onClick={() => setActiveSection('menu')}
        >
          Volver al Menú
        </Button>
      )}
      {renderSection()}
    </div>
  );
};

export default AdminPanel;