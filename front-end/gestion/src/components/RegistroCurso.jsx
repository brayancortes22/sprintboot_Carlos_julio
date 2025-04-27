import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';

const RegistroCurso = ({ setActiveSection }) => {
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
            className={`form-control ${errors.nombrePrograma ? 'is-invalid' : ''}`} 
            name="nombrePrograma" 
            placeholder="Nombre del Programa *" 
            type="text" 
            value={curso.nombrePrograma}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.nombrePrograma && (
            <div className="invalid-feedback">El nombre del programa es requerido</div>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`form-control ${errors.codigoFicha ? 'is-invalid' : ''}`} 
            name="codigoFicha" 
            placeholder="Código de Ficha *" 
            type="number" 
            value={curso.codigoFicha}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.codigoFicha && (
            <div className="invalid-feedback">El código de ficha es requerido</div>
          )}
        </div>
        
        <div className="mb-3">
          <textarea
            className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} 
            name="descripcion" 
            placeholder="Descripción *" 
            rows="3"
            value={curso.descripcion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.descripcion && (
            <div className="invalid-feedback">La descripción es requerida</div>
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Fecha de Inicio *
          </label>
          <input 
            className={`form-control ${errors.fechaInicio ? 'is-invalid' : ''}`} 
            name="fechaInicio" 
            type="date" 
            value={curso.fechaInicio}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fechaInicio && (
            <div className="invalid-feedback">La fecha de inicio es requerida</div>
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">
            Fecha de Finalización *
          </label>
          <input 
            className={`form-control ${errors.fechaFin ? 'is-invalid' : ''}`} 
            name="fechaFin" 
            type="date" 
            value={curso.fechaFin}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fechaFin && (
            <div className="invalid-feedback">La fecha de finalización es requerida</div>
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