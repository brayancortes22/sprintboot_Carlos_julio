import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/aprendizService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const TablaAprendices = ({ setActiveSection }) => {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [aprendizEditado, setAprendizEditado] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAuth = () => {
      if (SecurityUtils.isAdmin()) {
        setIsAuthorized(true);
        cargarAprendices();
      } else {
        setIsAuthorized(false);
        // Redirigir al login si no está autorizado
        setActiveSection && setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const cargarAprendices = async () => {
    try {
      setLoading(true);
      const data = await AprendizService.getAllAprendices();
      setAprendices(data);
    } catch (error) {
      console.error('Error al cargar aprendices:', error);
      
      // Verificar si es un error de autenticación
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else {
        alert('Error al cargar los aprendices: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (aprendiz) => {
    setEditando(aprendiz.id_aprendiz);
    setAprendizEditado({ ...aprendiz });
  };

  const handleCancelarEdicion = () => {
    setEditando(null);
    setAprendizEditado({});
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
      await AprendizService.updateAprendiz(editando, aprendizEditado);
      alert('Aprendiz actualizado correctamente');
      cargarAprendices();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      
      // Mostrar mensaje específico según el tipo de error
      if (error.message && error.message.includes('sesión')) {
        alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
        AuthService.logout();
        setActiveSection('login');
      } else if (error.message && error.message.includes('403')) {
        alert('No tiene permisos para actualizar este aprendiz. Por favor verifique su rol.');
      } else {
        alert('Error al actualizar el aprendiz: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este aprendiz?')) {
      try {
        // Verificar que existe token
        const token = AuthService.getToken();
        if (!token) {
          alert('No hay una sesión activa. Por favor inicie sesión nuevamente.');
          setActiveSection('login');
          return;
        }
        
        setLoading(true);
        await AprendizService.deleteAprendiz(id);
        alert('Aprendiz eliminado correctamente');
        cargarAprendices();
      } catch (error) {
        console.error('Error al eliminar:', error);
        
        // Mostrar mensaje específico según el tipo de error
        if (error.message && error.message.includes('sesión')) {
          alert('Su sesión ha expirado. Por favor inicie sesión nuevamente.');
          AuthService.logout();
          setActiveSection('login');
        } else if (error.message && error.message.includes('403')) {
          alert('No tiene permisos para eliminar este aprendiz. Por favor verifique su rol.');
        } else {
          alert('Error al eliminar el aprendiz: ' + (error.message || 'Error desconocido'));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setAprendizEditado({
      ...aprendizEditado,
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
        <h2 className="text-2xl font-bold mb-4">Gestión de Aprendices</h2>
        <div className="overflow-x-auto">
          <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Correo</th>
              <th>Tipo Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aprendices.map((aprendiz) => (
              <tr key={aprendiz.id_aprendiz}>
                {editando === aprendiz.id_aprendiz ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="nombre"
                        value={aprendizEditado.nombre || ''}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="numeroDocumento"
                        value={aprendizEditado.numeroDocumento || ''}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="correo"
                        value={aprendizEditado.correo || ''}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <select
                        name="tipoUsuario"
                        value={aprendizEditado.tipoUsuario || ''}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="1">Administrador</option>
                        <option value="2">Aprendiz</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={handleGuardarEdicion} 
                        className="btn btn-success me-2"
                        disabled={loading}
                      >
                        {loading ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button 
                        onClick={handleCancelarEdicion} 
                        className="btn btn-secondary"
                        disabled={loading}
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{aprendiz.nombre}</td>
                    <td>{aprendiz.numeroDocumento}</td>
                    <td>{aprendiz.correo}</td>
                    <td>{aprendiz.tipoUsuario === 1 ? 'Administrador' : 'Aprendiz'}</td>
                    <td>
                      <button 
                        onClick={() => handleEditar(aprendiz)} 
                        className="btn btn-primary me-2"
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleEliminar(aprendiz.id_aprendiz)} 
                        className="btn btn-danger"
                        disabled={loading}
                      >
                        Eliminar
                      </button>
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

export default TablaAprendices;