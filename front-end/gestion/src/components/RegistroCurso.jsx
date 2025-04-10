import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CursosService from '../services/cursosService';

const RegistroCurso = ({ setActiveSection, formStyles }) => {
  const [curso, setCurso] = useState({
    nombre: '',
    numeroPrograma: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await CursosService.createCurso(curso);
      alert('Curso registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      alert('Error al registrar el curso');
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Curso</h2>
        <input 
          className={formStyles} 
          name="nombre" 
          placeholder="Nombre Programa" 
          type="text" 
          value={curso.nombre}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="numeroPrograma" 
          placeholder="Número Programa" 
          type="text" 
          value={curso.numeroPrograma}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="descripcion" 
          placeholder="Descripción" 
          type="text" 
          value={curso.descripcion}
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

export default RegistroCurso;