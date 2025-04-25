import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';
import AprendizService from '../services/aprendizService';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';
import LeccionesService from '../services/leccionesService';

const TablaCertificados = ({ setActiveSection }) => {
  const [certificados, setCertificados] = useState([]);
  const [aprendices, setAprendices] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [certificadoEditado, setCertificadoEditado] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

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
      const [certificadosData, aprendicesData, leccionesData] = await Promise.all([
        CertificadosService.getAllCertificados(),
        AprendizService.getAllAprendices(),
        LeccionesService.getAllLecciones()
      ]);
      
      setCertificados(certificadosData);
      setAprendices(aprendicesData);
      
      if (leccionesData && leccionesData.data) {
        setLecciones(leccionesData.data);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      
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

  const handleEditar = (certificado) => {
    setEditando(certificado.idCertificado);
    setCertificadoEditado({
      ...certificado,
      fecha_fin: new Date(certificado.fechaFin).toISOString().split('T')[0]
    });
  };

  const handleCancelarEdicion = () => {
    setEditando(null);
    setCertificadoEditado({});
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
      await CertificadosService.updateCertificado(editando, certificadoEditado);
      alert('Certificado actualizado correctamente');
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
        alert('No tiene permisos para actualizar este certificado. Por favor verifique su rol.');
      } else {
        alert('Error al actualizar el certificado: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (e) => {
    setCertificadoEditado({
      ...certificadoEditado,
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
        <h2 className="text-2xl font-bold mb-4">Gestión de Certificados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Documento</th>
                <th className="px-4 py-2">Fecha Fin</th>
                <th className="px-4 py-2">Aprendiz</th>
                <th className="px-4 py-2">Lección</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((certificado) => (
                <tr key={certificado.idCertificado} className="border-b">
                  {editando === certificado.idCertificado ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="nombreCertificado"
                          value={certificadoEditado.nombreCertificado || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          name="numeroDocumentoCertificado"
                          value={certificadoEditado.numeroDocumentoCertificado || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          name="fecha_fin"
                          value={certificadoEditado.fecha_fin || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          name="idAprendiz"
                          value={certificadoEditado.idAprendiz || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        >
                          <option value="">Seleccionar aprendiz</option>
                          {aprendices.map(aprendiz => (
                            <option key={aprendiz.id_aprendiz} value={aprendiz.id_aprendiz}>
                              {aprendiz.nombre}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          name="idLecciones"
                          value={certificadoEditado.idLecciones || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        >
                          <option value="">Seleccionar lección</option>
                          {lecciones.map(leccion => (
                            <option key={leccion.id_leccion} value={leccion.id_leccion}>
                              {leccion.nombre_leccion}
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
                      <td className="px-4 py-2">{certificado.nombreCertificado}</td>
                      <td className="px-4 py-2">{certificado.numeroDocumentoCertificado}</td>
                      <td className="px-4 py-2">{new Date(certificado.fechaFin).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        {aprendices.find(a => a.id_aprendiz === certificado.idAprendiz)?.nombre || 'No asignado'}
                      </td>
                      <td className="px-4 py-2">
                        {lecciones.find(l => l.id_leccion === certificado.idLecciones)?.nombre_leccion || 'No asignado'}
                      </td>
                      <td className="px-4 py-2">
                        <Button 
                          onClick={() => handleEditar(certificado)} 
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
      </CardContent>
    </Card>
  );
};

export default TablaCertificados;