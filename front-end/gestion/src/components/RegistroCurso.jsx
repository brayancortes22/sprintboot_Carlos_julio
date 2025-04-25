import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';

const RegistroCurso = ({ setActiveSection, formStyles }) => {
  const [curso, setCurso] = useState({
    nombrePrograma: '',
    codigoFicha: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  });
  
  const [errors, setErrors] = useState({
    nombrePrograma: false,
    codigoFicha: false,
    descripcion: false,
    fechaInicio: false,
    fechaFin: false
  });
  
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAuth = () => {
      if (SecurityUtils.isAdmin()) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        // Redirigir al login si no está autorizado
        setActiveSection && setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Resetear el error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      nombrePrograma: !curso.nombrePrograma.trim(),
      codigoFicha: !curso.codigoFicha.trim(),
      descripcion: !curso.descripcion.trim(),
      fechaInicio: !curso.fechaInicio,
      fechaFin: !curso.fechaFin
    };
    
    setErrors(newErrors);
    
    // Devuelve true si no hay errores
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    try {
      setLoading(true);
      // Convertir código de ficha a número
      const cursoData = {
        ...curso,
        codigoFicha: parseInt(curso.codigoFicha)
      };
      
      await CursosService.createCurso(cursoData);
      alert('Curso registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      alert('Error al registrar el curso');
    } finally {
      setLoading(false);
    }
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Curso</h2>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.nombrePrograma ? 'border-red-500' : ''}`} 
            name="nombrePrograma" 
            placeholder="Nombre del Programa *" 
            type="text" 
            value={curso.nombrePrograma}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.nombrePrograma && (
            <p className="text-red-500 text-sm mt-1">El nombre del programa es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.codigoFicha ? 'border-red-500' : ''}`} 
            name="codigoFicha" 
            placeholder="Código de Ficha *" 
            type="number" 
            value={curso.codigoFicha}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.codigoFicha && (
            <p className="text-red-500 text-sm mt-1">El código de ficha es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <textarea
            className={`${formStyles} ${errors.descripcion ? 'border-red-500' : ''}`} 
            name="descripcion" 
            placeholder="Descripción *" 
            rows="3"
            value={curso.descripcion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">La descripción es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Inicio *
          </label>
          <input 
            className={`${formStyles} ${errors.fechaInicio ? 'border-red-500' : ''}`} 
            name="fechaInicio" 
            type="date" 
            value={curso.fechaInicio}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fechaInicio && (
            <p className="text-red-500 text-sm mt-1">La fecha de inicio es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Finalización *
          </label>
          <input 
            className={`${formStyles} ${errors.fechaFin ? 'border-red-500' : ''}`} 
            name="fechaFin" 
            type="date" 
            value={curso.fechaFin}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fechaFin && (
            <p className="text-red-500 text-sm mt-1">La fecha de finalización es requerida</p>
          )}
        </div>
        
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Registrar Curso'}
        </Button>
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => setActiveSection('admin')}
          disabled={loading}
        >
          Volver
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistroCurso;