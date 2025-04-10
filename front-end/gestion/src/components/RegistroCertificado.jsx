import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';

const RegistroCertificado = ({ setActiveSection, formStyles }) => {
  const [certificado, setCertificado] = useState({
    nombre: '',
    numeroDocumento: '',
    fechaFin: '',
    idAprendiz: '',
    idLeccion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await CertificadosService.createCertificado(certificado);
      alert('Certificado registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el certificado:', error);
      alert('Error al registrar el certificado');
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Certificado</h2>
        <input 
          className={formStyles} 
          name="nombre" 
          placeholder="Nombre Certificado" 
          type="text" 
          value={certificado.nombre}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="numeroDocumento" 
          placeholder="Número Documento" 
          type="text" 
          value={certificado.numeroDocumento}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="fechaFin" 
          placeholder="Fecha Fin" 
          type="date" 
          value={certificado.fechaFin}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="idAprendiz" 
          placeholder="ID Aprendiz" 
          type="text" 
          value={certificado.idAprendiz}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="idLeccion" 
          placeholder="ID Lección" 
          type="text" 
          value={certificado.idLeccion}
          onChange={handleChange} 
        />
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleSubmit}
        >
          Enviar
        </Button>
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => setActiveSection('admin')}
        >
          Volver
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistroCertificado;