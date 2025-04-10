import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import LeccionesService from '../services/leccionesService';

const RegistroLeccion = ({ setActiveSection, formStyles }) => {
  const [leccion, setLeccion] = useState({
    nombre: '',
    ruta: '',
    idCurso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeccion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await LeccionesService.createLeccion(leccion);
      alert('Lección registrada exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar la lección:', error);
      alert('Error al registrar la lección');
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Lección</h2>
        <input 
          className={formStyles} 
          name="nombre" 
          placeholder="Nombre Lección" 
          type="text" 
          value={leccion.nombre}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="ruta" 
          placeholder="Ruta" 
          type="text" 
          value={leccion.ruta}
          onChange={handleChange} 
        />
        <input 
          className={formStyles} 
          name="idCurso" 
          placeholder="ID Curso" 
          type="text" 
          value={leccion.idCurso}
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

export default RegistroLeccion;