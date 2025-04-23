import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CursosService from '../services/cursosService';

const TablaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [cursoEditado, setCursoEditado] = useState({});

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const data = await CursosService.getAllCursos();
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      alert('Error al cargar los cursos');
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
      await CursosService.updateCurso(editando, cursoEditado);
      alert('Curso actualizado correctamente');
      cargarCursos();
      setEditando(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el curso');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este curso?')) {
      try {
        await CursosService.deleteCurso(id);
        alert('Curso eliminado correctamente');
        cargarCursos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el curso');
      }
    }
  };

  const handleChange = (e) => {
    setCursoEditado({
      ...cursoEditado,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Gestión de Cursos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Nombre del Programa</th>
                <th className="px-4 py-2">Código Ficha</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Fecha Inicio</th>
                <th className="px-4 py-2">Fecha Fin</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.idCurso} className="border-b">
                  {editando === curso.idCurso ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          name="nombrePrograma"
                          value={cursoEditado.nombrePrograma || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          name="codigoFicha"
                          value={cursoEditado.codigoFicha || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <textarea
                          name="descripcion"
                          value={cursoEditado.descripcion || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          name="fechaInicio"
                          value={cursoEditado.fechaInicio || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          name="fechaFin"
                          value={cursoEditado.fechaFin || ''}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                        />
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
                      <td className="px-4 py-2">{curso.nombrePrograma}</td>
                      <td className="px-4 py-2">{curso.codigoFicha}</td>
                      <td className="px-4 py-2">{curso.descripcion}</td>
                      <td className="px-4 py-2">{new Date(curso.fechaInicio).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(curso.fechaFin).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <Button onClick={() => handleEditar(curso)} className="bg-blue-500 hover:bg-blue-600 text-white mr-2">
                          Editar
                        </Button>
                        <Button onClick={() => handleEliminar(curso.idCurso)} className="bg-red-500 hover:bg-red-600 text-white">
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

export default TablaCursos;