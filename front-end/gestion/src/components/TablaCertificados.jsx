import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';
import AprendizService from '../services/aprendizService';
import LeccionesService from '../services/leccionesService';

const TablaCertificados = () => {
  const [certificados, setCertificados] = useState([]);
  const [aprendices, setAprendices] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [certificadoEditado, setCertificadoEditado] = useState({});

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [certificadosData, aprendicesData, leccionesData] = await Promise.all([
        CertificadosService.getAllCertificados(),
        AprendizService.getAllAprendices(),
        LeccionesService.getAllLecciones()
      ]);
      setCertificados(certificadosData);
      setAprendices(aprendicesData);
      setLecciones(leccionesData.data || []);
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
                          {lecciones.map(leccion => (
                            <option key={leccion.id_leccion} value={leccion.id_leccion}>
                              {leccion.nombre_leccion}
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
                        {lecciones.find(l => l.id_leccion === certificado.idLecciones)?.nombre_leccion || 'No asignado'}
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