import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import LeccionesService from '../services/leccionesService';
import CursosService from '../services/cursosService';

const RegistroLeccion = ({ setActiveSection }) => {
  // Estados
  const [leccion, setLeccion] = useState({
    nombre_leccion: '',
    ruta_leccion: '',
    descripcion: '',
    id_curso: ''
  });
  
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar cursos al montar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await CursosService.getAllCursos();
        // Verifica si response es un array y tiene elementos
        if (Array.isArray(response) && response.length > 0) {
          // Mapear los datos para que coincidan con la estructura esperada
          const cursosFormateados = response.map(curso => ({
            id_curso: curso.idCurso,
            nombre_programa: curso.nombrePrograma,
            codigo_ficha: curso.codigoFicha
          }));
          console.log('Cursos formateados:', cursosFormateados);
          setCursos(cursosFormateados);
        } else {
          console.log('No se encontraron cursos');
          setCursos([]);
        }
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        alert("Error al cargar la lista de cursos");
        setCursos([]);
      }
    };

    fetchCursos();
  }, []);

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeccion(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!leccion.nombre_leccion.trim()) {
      newErrors.nombre_leccion = 'El nombre de la lección es requerido';
    }
    
    if (!leccion.ruta_leccion.trim()) {
      newErrors.ruta_leccion = 'La ruta es requerida';
    }
    
    if (!leccion.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    
    if (!leccion.id_curso) {
      newErrors.id_curso = 'Debe seleccionar un curso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
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
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Registro Lección
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="nombre_leccion"
              placeholder="Nombre de la lección"
              value={leccion.nombre_leccion}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.nombre_leccion ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.nombre_leccion && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre_leccion}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="ruta_leccion"
              placeholder="Ruta de la lección"
              value={leccion.ruta_leccion}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.ruta_leccion ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.ruta_leccion && (
              <p className="text-red-500 text-sm mt-1">{errors.ruta_leccion}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              name="descripcion"
              placeholder="Descripción de la lección"
              value={leccion.descripcion}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.descripcion ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
            />
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
            )}
          </div>

          <div className="mb-4">
            <select
              name="id_curso"
              value={leccion.id_curso}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.id_curso ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccione un curso</option>
              {Array.isArray(cursos) && cursos.length > 0 ? (
                cursos.map((curso) => (
                  <option key={curso.id_curso} value={curso.id_curso}>
                    {curso.nombre_programa} - {curso.codigo_ficha}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay cursos disponibles</option>
              )}
            </select>
            {errors.id_curso && (
              <p className="text-red-500 text-sm mt-1">{errors.id_curso}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? 'Registrando...' : 'Registrar Lección'}
            </Button>
            
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setActiveSection('admin')}
              className="bg-red-600 hover:bg-red-700"
            >
              Volver
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistroLeccion;