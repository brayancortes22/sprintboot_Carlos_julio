import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';
import AprendizService from '../services/aprendizService';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';

const TablaCertificados = ({ setActiveSection }) => {
  const [certificados, setCertificados] = useState([]);
  const [aprendices, setAprendices] = useState([]);
  const [cursos, setCursos] = useState([]);
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
      const [certificadosData, aprendicesData, cursosData] = await Promise.all([
        CertificadosService.getAllCertificados(),
        AprendizService.getAllAprendices(),
        CursosService.getAllCursos()
      ]);
      
      setCertificados(certificadosData);
      setAprendices(aprendicesData);
      setCursos(cursosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
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
      await CertificadosService.updateCertificado(editando, certificadoEditado);
      alert('Certificado actualizado correctamente');
      cargarDatos();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el certificado');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este certificado?')) {
      try {
        await CertificadosService.deleteCertificado(id);
        alert('Certificado eliminado correctamente');
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el certificado');
      }
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
                          name="nombre_certificado"
                          value={certificadoEditado.nombreCertificado || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          name="numero_documento_certificado"
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
                          name="id_aprendiz"
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
                          name="id_lecciones"
                          value={certificadoEditado.idLecciones || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        >
                          <option value="">Seleccionar lección</option>
                          {cursos.map(curso => (
                            <option key={curso.id_curso} value={curso.id_curso}>
                              {curso.nombre_curso}
                            </option>
                          ))}
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
                      <td className="px-4 py-2">{certificado.nombreCertificado}</td>
                      <td className="px-4 py-2">{certificado.numeroDocumentoCertificado}</td>
                      <td className="px-4 py-2">{new Date(certificado.fechaFin).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        {aprendices.find(a => a.id_aprendiz === certificado.idAprendiz)?.nombre || 'No asignado'}
                      </td>
                      <td className="px-4 py-2">
                        {cursos.find(c => c.id_curso === certificado.idLecciones)?.nombre_curso || 'No asignado'}
                      </td>
                      <td className="px-4 py-2">
                        <Button onClick={() => handleEditar(certificado)} className="bg-blue-500 hover:bg-blue-600 text-white mr-2">
                          Editar
                        </Button>
                        <Button onClick={() => handleEliminar(certificado.idCertificado)} className="bg-red-500 hover:bg-red-600 text-white">
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

export default TablaCertificados;