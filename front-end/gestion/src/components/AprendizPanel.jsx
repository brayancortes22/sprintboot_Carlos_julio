import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizCursoService from '../services/aprendizCursoService';
import CursosService from '../services/cursosService';
import CertificadosService from '../services/certificadosService';
import AuthService from '../services/authService';

const AprendizPanel = ({ aprendizId, setActiveSection }) => {
  const [cursos, setCursos] = useState([]);
  const [misCursos, setMisCursos] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [filtroFicha, setFiltroFicha] = useState('');
  
  useEffect(() => {
    // Verificar autenticación y rol al cargar el componente
    const checkAuth = () => {
      if (AuthService.isAuthenticated()) {
        const userData = AuthService.getUserData();
        console.log("Datos de usuario recuperados en AprendizPanel:", userData);
        
        // Verificar si el usuario es aprendiz (tipoUsuario === 2)
        if (userData && userData.tipoUsuario === 2) {
          setIsAuthorized(true);
          // Asegurarse de que el ID es un número
          const userId = userData.id ? parseInt(userData.id) : null;
          setUserId(userId);
          return userId;
        } else {
          console.log("Usuario no es aprendiz o datos incompletos:", userData);
          setActiveSection && setActiveSection('login');
        }
      } else {
        console.log("Usuario no autenticado");
        setActiveSection && setActiveSection('login');
      }
      return null;
    };
    
    // Usar el ID proporcionado o verificar la autenticación
    const id = aprendizId || checkAuth();
    
    // Cargar cursos disponibles siempre, incluso si no hay ID
    cargarCursos();
    
    // Si hay ID, cargar los datos relacionados con el aprendiz
    if (id) {
      console.log("ID de aprendiz encontrado, cargando datos:", id);
      cargarDatosAprendiz(id);
    } else {
      console.log("No se encontró ID de aprendiz, solo se cargarán cursos disponibles");
      setLoading(false);
    }
  }, [aprendizId, setActiveSection]);

  // Separar la carga de cursos disponibles
  const cargarCursos = async () => {
    try {
      console.log("Cargando cursos disponibles...");
      const cursosDisponibles = await CursosService.getAllCursos();
      console.log("Respuesta de cursos disponibles:", cursosDisponibles);
      
      if (Array.isArray(cursosDisponibles)) {
        setCursos(cursosDisponibles);
      } else if (cursosDisponibles && Array.isArray(cursosDisponibles.data)) {
        setCursos(cursosDisponibles.data);
      } else {
        console.error("La respuesta de cursos no es un array:", cursosDisponibles);
        setCursos([]);
        setError("No se pudieron cargar los cursos disponibles");
      }
    } catch (error) {
      console.error('Error al cargar cursos disponibles:', error);
      setCursos([]);
      setError("Error al cargar los cursos disponibles");
    }
  };

  // Cargar datos específicos del aprendiz
  const cargarDatosAprendiz = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar token antes de hacer peticiones
      const token = AuthService.getToken();
      if (!token) {
        console.error("No hay token disponible para hacer peticiones");
        setError("Error de autenticación. Por favor, inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      console.log("Cargando cursos inscritos para aprendiz ID:", id);
      // Cargar cursos inscritos
      try {
        const misInscripciones = await AprendizCursoService.getCursosByAprendiz(id);
        console.log("Inscripciones del aprendiz recibidas:", misInscripciones);
        if (Array.isArray(misInscripciones)) {
          setMisCursos(misInscripciones);
        } else if (misInscripciones && Array.isArray(misInscripciones.data)) {
          setMisCursos(misInscripciones.data);
        } else {
          console.error("La respuesta de inscripciones no es un array:", misInscripciones);
          setMisCursos([]);
        }
      } catch (error) {
        console.error('Error al cargar cursos inscritos:', error);
        setError("No se pudieron cargar tus cursos inscritos");
      }

      console.log("Cargando certificados para aprendiz ID:", id);
      // Cargar certificados del aprendiz
      try {
        const misCertificados = await CertificadosService.getCertificadosByAprendiz(id);
        console.log("Certificados del aprendiz recibidos:", misCertificados);
        if (Array.isArray(misCertificados)) {
          setCertificados(misCertificados);
        } else if (misCertificados && Array.isArray(misCertificados.data)) {
          setCertificados(misCertificados.data);
        } else {
          console.error("La respuesta de certificados no es un array:", misCertificados);
          setCertificados([]);
        }
      } catch (error) {
        console.error('Error al cargar certificados:', error);
      }
    } catch (error) {
      console.error('Error general al cargar datos:', error);
      setError("Error al cargar los datos. Por favor, intenta nuevamente");
    } finally {
      setLoading(false);
    }
  };

  const inscribirseEnCurso = async (cursoId) => {
    try {
      setLoading(true);
      setError(null);
      const idToUse = aprendizId || userId;
      
      if (!idToUse) {
        console.error("No se encontró ID de aprendiz para inscripción");
        setError("Error de identificación de usuario. Por favor, inicia sesión nuevamente.");
        return;
      }
      
      console.log(`Inscribiendo al aprendiz ${idToUse} en curso ${cursoId}`);
      
      // Crear fecha actual en formato correcto para MySQL (YYYY-MM-DD)
      const hoy = new Date();
      const fechaFormateada = hoy.toISOString().split('T')[0];
      
      // Datos de inscripción siguiendo exactamente la estructura de la tabla en la base de datos
      const datosInscripcion = {
        // Nota: id_aprendiz_curso es autoincremental, no lo enviamos
        fecha_inscripcion: fechaFormateada,
        id_aprendiz: parseInt(idToUse),
        id_curso: parseInt(cursoId)
      };
      
      console.log("Datos de inscripción según estructura de BD:", datosInscripcion);
      
      // Intentar la inscripción
      const resultado = await AprendizCursoService.createAprendizCurso(datosInscripcion);
      
      if (resultado && resultado.status === 200) {
        alert('Te has inscrito al curso exitosamente');
        // Recargar datos actualizados
        await cargarCursos();
        await cargarDatosAprendiz(idToUse);
      } else {
        setError("La respuesta del servidor no fue la esperada. Intenta nuevamente.");
        console.error("Respuesta inesperada:", resultado);
      }
    } catch (error) {
      console.error('Error al inscribirse:', error);
      
      // Mensaje de error más descriptivo según el tipo de error
      let mensajeError = "Error al inscribirse al curso. ";
      
      if (error.message) {
        if (error.message.includes('403')) {
          mensajeError += "No tienes los permisos necesarios para inscribirte. Contacta al administrador.";
        } else if (error.message.includes('sesión')) {
          mensajeError += "Tu sesión ha expirado. Inicia sesión nuevamente.";
          setTimeout(() => {
            AuthService.logout();
            setActiveSection('login');
          }, 2000);
        } else {
          mensajeError += error.message;
        }
      } else {
        mensajeError += "Por favor, intenta nuevamente más tarde.";
      }
      
      setError(mensajeError);
      alert(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si está inscrito en un curso específico
  const estaInscrito = (cursoId) => {
    return misCursos.some(mc => mc.curso && mc.curso.idCurso === cursoId);
  };

  // Si no está autorizado y no se provee un ID de aprendiz explícito, mostrar mensaje
  if (!isAuthorized && !aprendizId) {
    return <p>Cargando información de usuario...</p>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <Card className="mb-4 whidth:800px">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Mis Certificados</h2>
          {loading ? (
            <p>Cargando certificados...</p>
          ) : certificados.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {/* Dividir en filas de 4 elementos */}
                  {Array.from({ length: Math.ceil(certificados.length / 4) }).map((_, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {certificados.slice(rowIndex * 4, rowIndex * 4 + 4).map((certificado, colIndex) => (
                        <td key={`cell-${rowIndex}-${colIndex}`} className="p-2 text-center align-middle">
                          <div className="border border-danger rounded shadow-sm p-3 bg-white h-100" style={{borderWidth: "2px"}}>
                            <h3 className="font-bold text-lg text-success border-bottom pb-2 mb-2">{certificado.nombreCertificado}</h3>
                            <div className="p-2 border rounded mb-2" style={{backgroundColor: "#f8f9fa"}}>
                              <p className="text-sm text-muted mb-0">
                                <i className="bi bi-calendar-check me-1"></i> Fecha: <span className="fw-bold">{new Date(certificado.fechaFin).toLocaleDateString()}</span>
                              </p>
                            </div>
                            {certificado.curso && (
                              <div className="mt-2 p-1 bg-light rounded">
                                <small className="text-muted">Curso: {certificado.curso.nombrePrograma}</small>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                      {/* Añadir celdas vacías para completar la fila si es necesario */}
                      {Array.from({ length: 4 - (certificados.slice(rowIndex * 4, rowIndex * 4 + 4).length) }).map((_, i) => (
                        <td key={`empty-${rowIndex}-${i}`} className="p-2 border text-center"></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No tienes certificados aún</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Mis Cursos</h2>
          {loading ? (
            <p>Cargando cursos...</p>
          ) : misCursos.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {/* Dividir en filas de 4 elementos */}
                  {Array.from({ length: Math.ceil(misCursos.length / 4) }).map((_, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {misCursos.slice(rowIndex * 4, rowIndex * 4 + 4).map((inscripcion, colIndex) => (
                        <td key={`cell-${rowIndex}-${colIndex}`} className="p-2 text-center align-middle">
                          <div className="border border-danger rounded shadow-sm p-3 bg-white h-100" style={{borderWidth: "2px"}}>
                            <h3 className="font-bold text-lg text-info border-bottom pb-2 mb-2">
                              {inscripcion.curso ? inscripcion.curso.nombrePrograma : 'Curso sin nombre'}
                            </h3>
                            <div className="p-2 border rounded mb-2" style={{backgroundColor: "#f8f9fa"}}>
                              <p className="text-sm text-muted mb-0">
                                <i className="bi bi-calendar3 me-1"></i> Inscrito: 
                                <span className="fw-bold ms-1">
                                  {inscripcion.fechaInscripcion ? new Date(inscripcion.fechaInscripcion).toLocaleDateString() : 'Fecha no disponible'}
                                </span>
                              </p>
                            </div>
                            {inscripcion.curso && inscripcion.curso.codigoFicha && (
                              <div className="mt-2 p-1 bg-light rounded">
                                <small className="text-muted">Ficha: {inscripcion.curso.codigoFicha}</small>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                      {/* Añadir celdas vacías para completar la fila si es necesario */}
                      {Array.from({ length: 4 - (misCursos.slice(rowIndex * 4, rowIndex * 4 + 4).length) }).map((_, i) => (
                        <td key={`empty-${rowIndex}-${i}`} className="p-2 border text-center"></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No estás inscrito en ningún curso</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Cursos Disponibles</h2>
          
          {/* Campo de búsqueda por número de ficha */}
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por número de ficha..."
                value={filtroFicha}
                onChange={(e) => setFiltroFicha(e.target.value)}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setFiltroFicha('')}
              >
                Limpiar
              </button>
            </div>
            <small className="text-muted">Ingresa el número de ficha para filtrar los cursos disponibles</small>
          </div>
          
          {loading ? (
            <p>Cargando cursos disponibles...</p>
          ) : cursos.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {/* Filtrar por ficha y por no estar inscrito */}
                  {Array.from({ 
                    length: Math.ceil(
                      cursos
                        .filter(curso => !estaInscrito(curso.idCurso))
                        .filter(curso => 
                          filtroFicha === '' || 
                          (curso.codigoFicha && curso.codigoFicha.toString().includes(filtroFicha))
                        )
                        .length / 4
                    ) 
                  }).map((_, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {cursos
                        // Primero filtrar por no estar inscrito
                        .filter(curso => !estaInscrito(curso.idCurso))
                        // Luego filtrar por número de ficha
                        .filter(curso => 
                          filtroFicha === '' || 
                          (curso.codigoFicha && curso.codigoFicha.toString().includes(filtroFicha))
                        )
                        .slice(rowIndex * 4, rowIndex * 4 + 4)
                        .map((curso, colIndex) => (
                          <td key={`cell-${rowIndex}-${colIndex}`} className="p-2 text-center align-middle">
                            <div className="border border-danger rounded shadow-sm p-3 bg-white h-100" style={{borderWidth: "2px"}}>
                              <h3 className="font-bold text-lg text-primary border-bottom pb-2 mb-2">{curso.nombrePrograma}</h3>
                              <div className="mb-2 p-1 bg-light rounded">
                                <small className="text-sm text-muted">Ficha: <span className="font-weight-bold">{curso.codigoFicha}</span></small>
                              </div>
                              <div className="p-2 border rounded mb-3" style={{height: "80px", overflow: "hidden", backgroundColor: "#f8f9fa"}}>
                                <p className="text-sm">
                                  {curso.descripcion ? curso.descripcion.substring(0, 100) + (curso.descripcion.length > 100 ? '...' : '') : 'Sin descripción'}
                                </p>
                              </div>
                              <Button
                                onClick={() => inscribirseEnCurso(curso.idCurso)}
                                disabled={loading || !userId}
                                className="btn btn-primary w-100"
                              >
                                Inscribirse
                              </Button>
                            </div>
                          </td>
                      ))} 
                      {/* Añadir celdas vacías para completar la fila si es necesario */}
                      {Array.from({ 
                        length: 4 - (cursos
                          .filter(curso => !estaInscrito(curso.idCurso))
                          .filter(curso => 
                            filtroFicha === '' || 
                            (curso.codigoFicha && curso.codigoFicha.toString().includes(filtroFicha))
                          )
                          .slice(rowIndex * 4, rowIndex * 4 + 4).length) 
                      }).map((_, i) => (
                        <td key={`empty-${rowIndex}-${i}`} className="p-2 border text-center"></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No hay cursos disponibles</p>
          )}
          
          {/* Mensaje cuando no hay resultados con el filtro actual */}
          {cursos.length > 0 && 
           cursos.filter(curso => !estaInscrito(curso.idCurso))
            .filter(curso => 
              filtroFicha === '' || 
              (curso.codigoFicha && curso.codigoFicha.toString().includes(filtroFicha))
            ).length === 0 && (
            <div className="alert alert-info mt-3">
              No se encontraron cursos con el número de ficha "{filtroFicha}". 
              <button 
                className="btn btn-link p-0 ml-2" 
                onClick={() => setFiltroFicha('')}
              >
                Limpiar filtro
              </button>
            </div>
          )}
          
          {/* Mensaje cuando está inscrito en todos los cursos */}
          {cursos.length > 0 && 
           !cursos.some(curso => !estaInscrito(curso.idCurso)) && (
            <p className="mt-2">Ya estás inscrito en todos los cursos disponibles</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AprendizPanel;