import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import LeccionesService from '../services/leccionesService';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const RegistroLeccion = ({ setActiveSection, }) => {
  const [leccion, setLeccion] = useState({
    nombre_leccion: '',
    descripcion: '',
    ruta_leccion: '',
    id_curso: ''
  });
  
  const [errors, setErrors] = useState({
    nombre_leccion: false,
    descripcion: false,
    ruta_leccion: false,
    id_curso: false
  });
  
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAuth = () => {
      if (SecurityUtils.isAdmin()) {
        setIsAuthorized(true);
        cargarCursos();
      } else {
        setIsAuthorized(false);
        // Redirigir al login si no está autorizado
        setActiveSection && setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const cargarCursos = async () => {
    try {
      setLoadingCursos(true);
      const data = await CursosService.getAllCursos();
      console.log("Cursos recibidos en componente:", data);
      
      // Verificar que los datos sean válidos antes de asignarlos al estado
      if (Array.isArray(data) && data.length > 0) {
        // Asegurarse de que tengamos cursos válidos
        const cursosValidos = data.filter(curso => curso && typeof curso === 'object');
        
        // Verificar la estructura de los datos para depuración
        if (cursosValidos.length > 0) {
          console.log("Estructura del primer curso:", Object.keys(cursosValidos[0]));
          console.log("Ejemplo de curso:", cursosValidos[0]);
        }
        
        setCursos(cursosValidos);
      } else {
        console.error('Error: Los datos de cursos no tienen el formato esperado', data);
        setCursos([]);
      }
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      alert('Error al cargar los cursos');
      setCursos([]);
    } finally {
      setLoadingCursos(false);
    }
  };

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const leccionData = {
        ...leccion,
        id_curso: parseInt(leccion.id_curso)
      };
      
      console.log('Enviando datos de lección al servidor:', leccionData);
      
      // Asegurarnos de que el token de autenticación está disponible
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No se encontró token de autenticación. Es posible que la solicitud sea rechazada.');
      }
      
      const response = await LeccionesService.createLeccion(leccionData);
      console.log('Respuesta del servidor:', response);
      
      alert('Lección registrada exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar la lección:', error);
      
      // Mostrar un mensaje más descriptivo
      if (error.message && error.message.includes('403')) {
        alert('No tienes permisos para registrar lecciones. Por favor verifica tu sesión.');
      } else {
        alert('Error al registrar la lección: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  if (loadingCursos) return <p>Cargando cursos...</p>;

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro de Lección</h2>
        
        <form>
          <div className="mb-3">
            <input
              type="text"
              name="nombre_leccion"
              placeholder="Nombre de la lección"
              value={leccion.nombre_leccion}
              onChange={handleChange}
              className={`form-control ${errors.nombre_leccion ? 'is-invalid' : ''}`}
            />
            {errors.nombre_leccion && (
              <div className="invalid-feedback">{errors.nombre_leccion}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="ruta_leccion"
              placeholder="Ruta de la lección"
              value={leccion.ruta_leccion}
              onChange={handleChange}
              className={`form-control ${errors.ruta_leccion ? 'is-invalid' : ''}`}
            />
            {errors.ruta_leccion && (
              <div className="invalid-feedback">{errors.ruta_leccion}</div>
            )}
          </div>

          <div className="mb-3">
            <textarea
              name="descripcion"
              placeholder="Descripción de la lección"
              value={leccion.descripcion}
              onChange={handleChange}
              className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
              rows="3"
            />
            {errors.descripcion && (
              <div className="invalid-feedback">{errors.descripcion}</div>
            )}
          </div>

          <div className="mb-3">
            <select
              name="id_curso"
              value={leccion.id_curso}
              onChange={handleChange}
              className={`form-select ${errors.id_curso ? 'is-invalid' : ''}`}
            >
              <option value="">Seleccione un curso</option>
              {cursos.length > 0 ? (
                cursos.map((curso) => {
                  // Intentar obtener idCurso o id_curso (diferentes convenciones)
                  const id = curso.idCurso || curso.id_curso;
                  
                  // Intentar obtener nombrePrograma o nombre_programa
                  const nombre = curso.nombrePrograma || curso.nombre_programa || 'Sin nombre';
                  
                  // Intentar obtener codigoFicha o codigo_ficha
                  const codigo = curso.codigoFicha || curso.codigo_ficha || 'Sin código';
                  
                  return (
                    <option key={id} value={id}>
                      {nombre} - {codigo}
                    </option>
                  );
                })
              ) : (
                <option value="" disabled>No hay cursos disponibles</option>
              )}
            </select>
            {errors.id_curso && (
              <div className="invalid-feedback">{errors.id_curso}</div>
            )}
          </div>

          <div className="flex justify-between">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white mr-2" 
              onClick={() => setActiveSection('admin')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar Lección'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistroLeccion;