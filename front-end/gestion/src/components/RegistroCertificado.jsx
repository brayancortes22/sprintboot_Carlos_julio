import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';
import AprendizService from '../services/aprendizService';
import CursosService from '../services/cursosService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const RegistroCertificado = ({ setActiveSection, formStyles }) => {
  const [certificado, setCertificado] = useState({
    nombreCertificado: '',
    descripcion: '',
    fechaFin: '',
    idAprendiz: '',
    idCurso: ''
  });
  
  const [errors, setErrors] = useState({
    nombreCertificado: false,
    descripcion: false,
    fechaFin: false,
    idAprendiz: false,
    idCurso: false
  });
  
  const [aprendices, setAprendices] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
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
      setLoadingData(true);
      console.log('Solicitando datos al servidor...');
      
      const [aprendicesData, cursosData] = await Promise.all([
        AprendizService.getAllAprendices(),
        CursosService.getAllCursos()
      ]);
      
      console.log('Respuesta de aprendices:', aprendicesData);
      console.log('Respuesta de cursos:', cursosData);
      
      // Verificar si los datos son válidos
      if (Array.isArray(aprendicesData)) {
        setAprendices(aprendicesData);
      } else {
        console.error('Error: Los datos de aprendices no son un array', aprendicesData);
        setAprendices([]);
      }
      
      if (Array.isArray(cursosData)) {
        setCursos(cursosData);
        
        // Mostrar estructura del primer curso para depuración
        if (cursosData.length > 0) {
          console.log('Estructura del primer curso:', Object.keys(cursosData[0]));
          console.log('Ejemplo de curso:', cursosData[0]);
        }
      } else {
        console.error('Error: Los datos de cursos no son un array', cursosData);
        setCursos([]);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificado(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Resetear el error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      nombreCertificado: !certificado.nombreCertificado.trim(),
      descripcion: !certificado.descripcion.trim(),
      fechaFin: !certificado.fechaFin,
      idAprendiz: !certificado.idAprendiz,
      idCurso: !certificado.idCurso
    };
    
    setErrors(newErrors);
    
    // Devuelve true si no hay errores
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    try {
      setLoading(true);
      
      // Verificar que exista el token de autenticación
      const token = AuthService.getToken();
      if (!token) {
        console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
      }
      
      // Convertir los valores numéricos
      const certificadoData = {
        ...certificado,
        idAprendiz: parseInt(certificado.idAprendiz),
        idCurso: parseInt(certificado.idCurso)
      };
      
      console.log('Enviando datos de certificado al servidor:', certificadoData);
      
      const response = await CertificadosService.createCertificado(certificadoData);
      console.log('Respuesta del servidor al crear certificado:', response);
      
      alert('Certificado registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el certificado:', error);
      
      // Mostrar un mensaje más descriptivo según el tipo de error
      if (error.message && error.message.includes('403')) {
        alert('No tienes permisos para registrar certificados. Por favor verifica tu sesión.');
      } else {
        alert('Error al registrar el certificado: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  if (loadingData) return <p>Cargando datos...</p>;

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro de Certificado</h2>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.nombreCertificado ? 'border-red-500' : ''}`}
            name="nombreCertificado" 
            placeholder="Nombre del Certificado *" 
            type="text" 
            value={certificado.nombreCertificado}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.nombreCertificado && (
            <p className="text-red-500 text-sm mt-1">El nombre del certificado es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.descripcion ? 'border-red-500' : ''}`}
            name="descripcion" 
            placeholder="Descripción *" 
            type="text" 
            value={certificado.descripcion}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">La descripción es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Finalización *
          </label>
          <input 
            className={`${formStyles} ${errors.fechaFin ? 'border-red-500' : ''}`}
            name="fechaFin" 
            type="date" 
            value={certificado.fechaFin}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fechaFin && (
            <p className="text-red-500 text-sm mt-1">La fecha de finalización es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <select
            className={`${formStyles} ${errors.idAprendiz ? 'border-red-500' : ''}`}
            name="idAprendiz"
            value={certificado.idAprendiz}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Seleccionar Aprendiz *</option>
            {aprendices.map(aprendiz => (
              <option key={aprendiz.id_aprendiz} value={aprendiz.id_aprendiz}>
                {aprendiz.nombre} - {aprendiz.numeroDocumento}
              </option>
            ))}
          </select>
          {errors.idAprendiz && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar un aprendiz</p>
          )}
        </div>
        
        <div className="mb-3">
          <select
            className={`${formStyles} ${errors.idCurso ? 'border-red-500' : ''}`}
            name="idCurso"
            value={certificado.idCurso}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Seleccionar Curso *</option>
            {cursos.map(curso => {
              // Intentar obtener idCurso o id_curso (diferentes convenciones)
              const id = curso.idCurso || curso.id_curso;
              
              // Intentar obtener nombrePrograma o nombre_curso
              const nombre = curso.nombrePrograma || curso.nombre_curso || curso.nombre || 'Sin nombre';
              
              return (
                <option key={id} value={id}>
                  {nombre} - {curso.codigoFicha || curso.codigo_ficha || ''}
                </option>
              );
            })}
          </select>
          {errors.idCurso && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar un curso</p>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white mr-2" 
            onClick={() => setActiveSection('admin')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Certificado'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistroCertificado;