import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const TablaCursos = ({ setActiveSection }) => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [cursoEditado, setCursoEditado] = useState({});
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
      setLoading(true);
      const data = await CursosService.getAllCursos();
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else {
        alert('Error al cargar los cursos: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (curso) => {
    setEditando(curso.idCurso);
    setCursoEditado({
      ...curso,
      fechaInicio: curso.fechaInicio?.split('T')[0],
      fechaFin: curso.fechaFin?.split('T')[0]
    });
  };

  const handleCancelarEdicion = () => {
    setEditando(null);
    setCursoEditado({});
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
      await CursosService.updateCurso(editando, cursoEditado);
      alert('Curso actualizado correctamente');
      cargarCursos();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      
      // Mostrar mensaje específico según el tipo de error
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else if (error.message && error.message.includes('403')) {
        alert('No tiene permisos para actualizar este curso. Por favor verifique su rol.');
      } else {
        alert('Error al actualizar el curso: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

 
    

  const handleChange = (e) => {
    setCursoEditado({
      ...cursoEditado,
      [e.target.name]: e.target.value
    });
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Gestión de Cursos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3">Nombre del Programa</th>
                <th className="px-6 py-3">Código Ficha</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Fecha Inicio</th>
                <th className="px-6 py-3">Fecha Fin</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.idCurso} className="border-b">
                  {editando === curso.idCurso ? (
                    <>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          name="nombrePrograma"
                          value={cursoEditado.nombrePrograma || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          name="codigoFicha"
                          value={cursoEditado.codigoFicha || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <textarea
                          name="descripcion"
                          value={cursoEditado.descripcion || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="date"
                          name="fechaInicio"
                          value={cursoEditado.fechaInicio || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="date"
                          name="fechaFin"
                          value={cursoEditado.fechaFin || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <Button onClick={handleGuardarEdicion} className="bg-green-500 hover:bg-green-600 text-white mr-2" disabled={loading}>
                          {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                        <Button onClick={handleCancelarEdicion} className="bg-gray-500 hover:bg-gray-600 text-white" disabled={loading}>
                          Cancelar
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3">{curso.nombrePrograma}</td>
                      <td className="px-6 py-3">{curso.codigoFicha}</td>
                      <td className="px-6 py-3">{curso.descripcion}</td>
                      <td className="px-6 py-3">{new Date(curso.fechaInicio).toLocaleDateString()}</td>
                      <td className="px-6 py-3">{new Date(curso.fechaFin).toLocaleDateString()}</td>
                      <td className="px-6 py-3">
                        <Button onClick={() => handleEditar(curso)} className="bg-blue-500 hover:bg-blue-600 text-white mr-2" disabled={loading}>
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
      </CardContent>
    </Card>
  );
};

export default TablaCursos;