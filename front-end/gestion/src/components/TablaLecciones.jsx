import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import LeccionesService from '../services/leccionesService';
import CursosService from '../services/cursosService';

const TablaLecciones = () => {
  const [lecciones, setLecciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [leccionEditada, setLeccionEditada] = useState({});

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [leccionesData, cursosData] = await Promise.all([
        LeccionesService.getAllLecciones(),
        CursosService.getAllCursos()
      ]);
      setLecciones(leccionesData.data || []);
      setCursos(cursosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
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
      await LeccionesService.updateLeccion(editando, leccionEditada);
      alert('Lección actualizada correctamente');
      cargarDatos();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la lección');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta lección?')) {
      try {
        await LeccionesService.deleteLeccion(id);
        alert('Lección eliminada correctamente');
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la lección');
      }
    }
  };

  const handleChange = (e) => {
    setLeccionEditada({
      ...leccionEditada,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Gestión de Lecciones</h2>
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
                            <option key={curso.idCurso} value={curso.idCurso}>
                              {curso.nombrePrograma}
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
                      <td className="px-4 py-2">{leccion.nombre_leccion}</td>
                      <td className="px-4 py-2">{leccion.descripcion}</td>
                      <td className="px-4 py-2">{leccion.ruta_leccion}</td>
                      <td className="px-4 py-2">
                        {cursos.find(c => c.idCurso === leccion.id_curso)?.nombrePrograma || 'No asignado'}
                      </td>
                      <td className="px-4 py-2">
                        <Button onClick={() => handleEditar(leccion)} className="bg-blue-500 hover:bg-blue-600 text-white mr-2">
                          Editar
                        </Button>
                        <Button onClick={() => handleEliminar(leccion.id_leccion)} className="bg-red-500 hover:bg-red-600 text-white">
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

export default TablaLecciones;