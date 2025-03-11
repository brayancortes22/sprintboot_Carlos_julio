import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const RegistroLeccion = ({ leccion, setLeccion, handleChange, handleSubmit, setActiveSection, formStyles }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Lección</h2>
        <input className={formStyles} name="nombre" placeholder="Nombre Lección" type="text" onChange={handleChange(setLeccion)} />
        <input className={formStyles} name="ruta" placeholder="Ruta" type="text" onChange={handleChange(setLeccion)} />
        <input className={formStyles} name="idCurso" placeholder="ID Curso" type="text" onChange={handleChange(setLeccion)} />
        <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleSubmit(leccion, 'Registro Lección')}>Enviar</Button>
        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveSection('admin')}>Volver</Button>
      </CardContent>
    </Card>
  );
};

export default RegistroLeccion;