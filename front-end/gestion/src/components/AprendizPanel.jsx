import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizCursoService from '../services/aprendizCursoService';
import CursosService from '../services/cursosService';
import CertificadosService from '../services/certificadosService';

const AprendizPanel = ({ aprendizId }) => {
  const [cursos, setCursos] = useState([]);
  const [misCursos, setMisCursos] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [aprendizId]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      // Cargar cursos disponibles
      const cursosDisponibles = await CursosService.getAllCursos();
      setCursos(cursosDisponibles);

      // Cargar cursos inscritos
      const misInscripciones = await AprendizCursoService.getCursosByAprendiz(aprendizId);
      setMisCursos(misInscripciones);

      // Cargar certificados del aprendiz
      const misCertificados = await CertificadosService.getCertificadosByAprendiz(aprendizId);
      setCertificados(misCertificados);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const inscribirseEnCurso = async (cursoId) => {
    try {
      setLoading(true);
      await AprendizCursoService.createAprendizCurso({
        id_aprendiz: aprendizId,
        id_curso: cursoId,
        fecha_inscripcion: new Date().toISOString()
      });
      alert('Inscripción exitosa');
      await cargarDatos();
    } catch (error) {
      console.error('Error al inscribirse:', error);
      alert('Error al inscribirse al curso');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Mis Certificados</h2>
          {loading ? (
            <p>Cargando certificados...</p>
          ) : certificados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificados.map((certificado) => (
                <Card key={certificado.idCertificado} className="bg-white shadow">
                  <CardContent>
                    <h3 className="font-bold">{certificado.nombreCertificado}</h3>
                    <p>Fecha: {new Date(certificado.fechaFin).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No tienes certificados aún</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Mis Cursos</h2>
          {loading ? (
            <p>Cargando cursos...</p>
          ) : misCursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misCursos.map((inscripcion) => (
                <Card key={inscripcion.id_aprendiz_curso} className="bg-white shadow">
                  <CardContent>
                    <h3 className="font-bold">{inscripcion.curso.nombrePrograma}</h3>
                    <p>Fecha inscripción: {new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No estás inscrito en ningún curso</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Cursos Disponibles</h2>
          {loading ? (
            <p>Cargando cursos disponibles...</p>
          ) : cursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cursos
                .filter(curso => !misCursos.some(mc => mc.curso.idCurso === curso.idCurso))
                .map((curso) => (
                  <Card key={curso.idCurso} className="bg-white shadow">
                    <CardContent>
                      <h3 className="font-bold">{curso.nombrePrograma}</h3>
                      <p className="mb-2">{curso.descripcion}</p>
                      <Button
                        onClick={() => inscribirseEnCurso(curso.idCurso)}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Inscribirse
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <p>No hay cursos disponibles</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AprendizPanel;