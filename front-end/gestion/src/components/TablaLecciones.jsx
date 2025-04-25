import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import LeccionesService from '../services/leccionesService';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const TablaLecciones = ({ setActiveSection }) => {
  const [lecciones, setLecciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [leccionEditada, setLeccionEditada] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAuth = () => {
      if (SecurityUtils.isAdmin()) {
        setIsAuthorized(true);
        cargarDatos();
      } else {
        setIsAuthorized(false);
        // Redirigir al login si no está autorizado
        setActiveSection && setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Solicitando datos de lecciones y cursos...');
      
      // Primero obtenemos los cursos 
      const cursosData = await CursosService.getAllCursos();
      console.log('Datos de cursos recibidos:', cursosData);
      setCursos(Array.isArray(cursosData) ? cursosData : []);
      
      // Luego obtenemos las lecciones
      const leccionesData = await LeccionesService.getAllLecciones();
      console.log('Datos de lecciones recibidos:', leccionesData);
      
      // Comprobar la estructura de la respuesta
      if (leccionesData && leccionesData.data) {
        // Si la respuesta tiene estructura { data: [...] }
        setLecciones(leccionesData.data);
      } else if (Array.isArray(leccionesData)) {
        // Si la respuesta es directamente un array
        setLecciones(leccionesData);
      } else {
        // Si la respuesta no tiene una estructura reconocible
        console.error('La respuesta no tiene una estructura reconocible', leccionesData);
        setError('Error: La respuesta del servidor no tiene el formato esperado');
        setLecciones([]);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setError('Error al cargar los datos: ' + (error.message || 'Error desconocido'));
      
      // Verificar si es un error de autenticación
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else {
        alert('Error al cargar los datos: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (leccion) => {
    setEditando(leccion.id_leccion);
    setLeccionEditada({ ...leccion });
  };

  const handleCancelarEdicion = () => {
    setEditando(null);
    setLeccionEditada({});
  };

  const handleGuardarEdicion = async () => {
    try {
      // Verificar que existe token
      const token = AuthService.getToken();
      if (!token) {
        alert('No hay una sesión activa. Por favor inicie sesión nuevamente.');
        setActiveSection('login');
        return;
      }

      setLoading(true);
      await LeccionesService.updateLeccion(editando, leccionEditada);
      alert('Lección actualizada correctamente');
      cargarDatos();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);

      // Mostrar mensaje específico según el tipo de error
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else if (error.message && error.message.includes('403')) {
        alert('No tiene permisos para actualizar esta lección. Por favor verifique su rol.');
      } else {
        alert('Error al actualizar la lección: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setLeccionEditada({
      ...leccionEditada,
      [e.target.name]: e.target.value
    });
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  if (loading) return (
    <Card>
      <CardContent>
        <p className="text-center py-4">Cargando datos de lecciones...</p>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Gestión de Lecciones</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {!lecciones || lecciones.length === 0 ? (
          <div className="text-center py-4">
            <p>No se encontraron lecciones.</p>
            <Button 
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={cargarDatos}
            >
              Reintentar cargar datos
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Ruta</th>
                  <th className="px-4 py-2">Curso</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lecciones.map((leccion) => (
                  <tr key={leccion.id_leccion} className="border-b">
                    {editando === leccion.id_leccion ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            name="nombre_leccion"
                            value={leccionEditada.nombre_leccion || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <textarea
                            name="descripcion"
                            value={leccionEditada.descripcion || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            name="ruta_leccion"
                            value={leccionEditada.ruta_leccion || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            name="id_curso"
                            value={leccionEditada.id_curso || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                          >
                            <option value="">Seleccionar curso</option>
                            {cursos.map(curso => (
                              <option key={curso.idCurso || curso.id_curso} value={curso.idCurso || curso.id_curso}>
                                {curso.nombrePrograma || curso.nombre_programa}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <Button 
                            onClick={handleGuardarEdicion} 
                            className="bg-green-500 hover:bg-green-600 text-white mr-2"
                            disabled={loading}
                          >
                            {loading ? 'Guardando...' : 'Guardar'}
                          </Button>
                          <Button 
                            onClick={handleCancelarEdicion} 
                            className="bg-gray-500 hover:bg-gray-600 text-white"
                            disabled={loading}
                          >
                            Cancelar
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{leccion.nombre_leccion}</td>
                        <td className="px-4 py-2">{leccion.descripcion}</td>
                        <td className="px-4 py-2">{leccion.ruta_leccion}</td>
                        <td className="px-4 py-2">
                          {cursos.find(c => (c.idCurso || c.id_curso) === leccion.id_curso)?.nombrePrograma || 
                           cursos.find(c => (c.idCurso || c.id_curso) === leccion.id_curso)?.nombre_programa || 
                           'No asignado'}
                        </td>
                        <td className="px-4 py-2">
                          <Button 
                            onClick={() => handleEditar(leccion)} 
                            className="bg-blue-500 hover:bg-blue-600 text-white mr-2"
                            disabled={loading}
                          >
                            Editar
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TablaLecciones;