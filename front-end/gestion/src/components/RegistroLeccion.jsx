import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import LeccionesService from '../services/leccionesService';
import CursosService from '../services/cursosService';

const RegistroLeccion = ({ setActiveSection, formStyles }) => {
  const [leccion, setLeccion] = useState({
    nombre_leccion: '',
    ruta_leccion: '',
    descripcion: '',
    id_curso: ''
  });
  
  const [errors, setErrors] = useState({
    nombre_leccion: false,
    ruta_leccion: false,
    descripcion: false,
    id_curso: false
  });
  
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(true);

  // Cargar cursos para el selector
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await CursosService.getAllCursos();
        if (response && response.data && Array.isArray(response.data)) {
          setCursos(response.data);
        } else {
          console.error('Respuesta incorrecta al cargar cursos:', response);
        }
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      } finally {
        setLoadingCursos(false);
      }
    };

    fetchCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeccion(prev => ({
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
      nombre_leccion: !leccion.nombre_leccion.trim(),
      ruta_leccion: !leccion.ruta_leccion.trim(),
      descripcion: !leccion.descripcion.trim(),
      id_curso: !leccion.id_curso
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
      // Asegurarnos que id_curso sea un número
      const leccionData = {
        ...leccion,
        id_curso: parseInt(leccion.id_curso)
      };
      
      await LeccionesService.createLeccion(leccionData);
      alert('Lección registrada exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar la lección:', error);
      alert('Error al registrar la lección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Lección</h2>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.nombre_leccion ? 'border-red-500' : ''}`}
            name="nombre_leccion" 
            placeholder="Nombre de la Lección *" 
            type="text" 
            value={leccion.nombre_leccion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.nombre_leccion && (
            <p className="text-red-500 text-sm mt-1">El nombre de la lección es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.ruta_leccion ? 'border-red-500' : ''}`}
            name="ruta_leccion" 
            placeholder="Ruta de la Lección *" 
            type="text" 
            value={leccion.ruta_leccion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.ruta_leccion && (
            <p className="text-red-500 text-sm mt-1">La ruta de la lección es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <textarea
            className={`${formStyles} ${errors.descripcion ? 'border-red-500' : ''}`}
            name="descripcion" 
            placeholder="Descripción de la Lección *" 
            rows="3"
            value={leccion.descripcion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">La descripción es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          {loadingCursos ? (
            <p>Cargando cursos...</p>
          ) : (
            <select
              className={`${formStyles} ${errors.id_curso ? 'border-red-500' : ''}`}
              name="id_curso"
              value={leccion.id_curso}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccionar Curso *</option>
              {cursos.map(curso => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.nombrePrograma || 'Curso sin nombre'} - {curso.codigoFicha || 'Sin código'}
                </option>
              ))}
            </select>
          )}
          {errors.id_curso && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar un curso</p>
          )}
        </div>
        
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Registrar Lección'}
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

export default RegistroLeccion;