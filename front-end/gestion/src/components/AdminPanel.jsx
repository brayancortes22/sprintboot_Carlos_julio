import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const AdminPanel = ({ setActiveSection }) => {
  const menuItems = [
    { title: 'Registro de Cursos', section: 'registroCurso' },
    { title: 'Registro de Lecciones', section: 'registroLeccion' },
    { title: 'Gestión de Certificados', section: 'certificados' },
    { title: 'Gestión de Aprendices', section: 'aprendices' }
  ];

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Panel de Administración</h2>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.section}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => setActiveSection(item.section)}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => setActiveSection('login')}
        >
          Cerrar Sesión
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;