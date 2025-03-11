import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const Certificados = ({ loggedUser, setActiveSection }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Certificados</h2>
        <p>Certificados del aprendiz con documento {loggedUser}</p>
        <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setActiveSection('login')}>Cerrar Sesión</Button>
      </CardContent>
    </Card>
  );
};

export default Certificados;