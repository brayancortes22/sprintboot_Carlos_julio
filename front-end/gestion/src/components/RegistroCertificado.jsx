import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const RegistroCertificado = ({ certificado, setCertificado, handleChange, handleSubmit, setActiveSection, formStyles }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Certificado</h2>
        <input className={formStyles} name="nombre" placeholder="Nombre Certificado" type="text" onChange={handleChange(setCertificado)} />
        <input className={formStyles} name="numeroDocumento" placeholder="Número Documento" type="text" onChange={handleChange(setCertificado)} />
        <input className={formStyles} name="fechaFin" placeholder="Fecha Fin" type="date" onChange={handleChange(setCertificado)} />
        <input className={formStyles} name="idAprendiz" placeholder="ID Aprendiz" type="text" onChange={handleChange(setCertificado)} />
        <input className={formStyles} name="idLeccion" placeholder="ID Lección" type="text" onChange={handleChange(setCertificado)} />
        <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleSubmit(certificado, 'Registro Certificado')}>Enviar</Button>
        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveSection('admin')}>Volver</Button>
      </CardContent>
    </Card>
  );
};

export default RegistroCertificado;