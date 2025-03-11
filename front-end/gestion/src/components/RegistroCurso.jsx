import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const RegistroCurso = ({ curso, setCurso, handleChange, handleSubmit, setActiveSection, formStyles }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Curso</h2>
        <input className={formStyles} name="nombre" placeholder="Nombre Programa" type="text" onChange={handleChange(setCurso)} />
        <input className={formStyles} name="numeroPrograma" placeholder="Número Programa" type="text" onChange={handleChange(setCurso)} />
        <input className={formStyles} name="descripcion" placeholder="Descripción" type="text" onChange={handleChange(setCurso)} />
        <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleSubmit(curso, 'Registro Curso')}>Enviar</Button>
        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveSection('admin')}>Volver</Button>
      </CardContent>
    </Card>
  );
};

export default RegistroCurso;