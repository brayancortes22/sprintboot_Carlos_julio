import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const AdminPanel = ({ setActiveSection }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Panel Administrador</h2>
        <Button className="mb-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setActiveSection('curso')}>Registrar Curso</Button>
        <Button className="mb-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setActiveSection('leccion')}>Registrar Lección</Button>
        <Button className="mb-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setActiveSection('certificado')}>Registrar Certificado</Button>
        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveSection('login')}>Cerrar Sesión</Button>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;