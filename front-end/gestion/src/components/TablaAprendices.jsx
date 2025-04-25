import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/aprendizService';
import SecurityUtils from '../utils/securityUtils';

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
      const data = await AprendizService.getAllAprendices();
      setAprendices(data);
    } catch (error) {
      console.error('Error al cargar aprendices:', error);
      alert('Error al cargar los aprendices');
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
      await AprendizService.updateAprendiz(editando, aprendizEditado);
      alert('Aprendiz actualizado correctamente');
      cargarAprendices();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el aprendiz');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este aprendiz?')) {
      try {
        await AprendizService.deleteAprendiz(id);
        alert('Aprendiz eliminado correctamente');
        cargarAprendices();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el aprendiz');
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
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Documento</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Tipo Usuario</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aprendices.map((aprendiz) => (
                <tr key={aprendiz.id_aprendiz} className="border-b">
                  {editando === aprendiz.id_aprendiz ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="nombre"
                          value={aprendizEditado.nombre || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          name="numeroDocumento"
                          value={aprendizEditado.numeroDocumento || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="email"
                          name="correo"
                          value={aprendizEditado.correo || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          name="tipoUsuario"
                          value={aprendizEditado.tipoUsuario || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        >
                          <option value="1">Administrador</option>
                          <option value="2">Aprendiz</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <Button onClick={handleGuardarEdicion} className="bg-green-500 hover:bg-green-600 text-white mr-2">
                          Guardar
                        </Button>
                        <Button onClick={handleCancelarEdicion} className="bg-gray-500 hover:bg-gray-600 text-white">
                          Cancelar
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{aprendiz.nombre}</td>
                      <td className="px-4 py-2">{aprendiz.numeroDocumento}</td>
                      <td className="px-4 py-2">{aprendiz.correo}</td>
                      <td className="px-4 py-2">{aprendiz.tipoUsuario === 1 ? 'Administrador' : 'Aprendiz'}</td>
                      <td className="px-4 py-2">
                        <Button onClick={() => handleEditar(aprendiz)} className="bg-blue-500 hover:bg-blue-600 text-white mr-2">
                          Editar
                        </Button>
                        <Button onClick={() => handleEliminar(aprendiz.id_aprendiz)} className="bg-red-500 hover:bg-red-600 text-white">
                          Eliminar
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

export default TablaAprendices;