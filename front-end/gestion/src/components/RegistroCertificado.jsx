import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';
import AprendizService from '../services/AprendizService';
import LeccionesService from '../services/leccionesService';

const RegistroCertificado = ({ setActiveSection, formStyles }) => {
  const [certificado, setCertificado] = useState({
    nombre_certificado: '',
    numero_documento_certificado: '',
    fecha_fin: '',
    id_aprendiz: '',
    id_lecciones: ''
  });
  
  const [errors, setErrors] = useState({
    nombre_certificado: false,
    numero_documento_certificado: false,
    fecha_fin: false,
    id_aprendiz: false,
    id_lecciones: false
  });
  
  const [loading, setLoading] = useState(false);
  const [aprendices, setAprendices] = useState([]);
  const [lecciones, setLecciones] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Cargar aprendices y lecciones para los selectores
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar aprendices
        const aprendicesResponse = await AprendizService.getAllAprendices();
        if (Array.isArray(aprendicesResponse)) {
          setAprendices(aprendicesResponse);
        }
        
        // Cargar lecciones
        const leccionesResponse = await LeccionesService.getAllLecciones();
        if (leccionesResponse && leccionesResponse.data && Array.isArray(leccionesResponse.data)) {
          setLecciones(leccionesResponse.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, []);

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
      nombre_certificado: !certificado.nombre_certificado.trim(),
      numero_documento_certificado: !certificado.numero_documento_certificado.trim(),
      fecha_fin: !certificado.fecha_fin,
      id_aprendiz: !certificado.id_aprendiz,
      id_lecciones: !certificado.id_lecciones
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
      // Convertir los valores numéricos
      const certificadoData = {
        ...certificado,
        numero_documento_certificado: parseInt(certificado.numero_documento_certificado),
        id_aprendiz: parseInt(certificado.id_aprendiz),
        id_lecciones: parseInt(certificado.id_lecciones)
      };
      
      await CertificadosService.createCertificado(certificadoData);
      alert('Certificado registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el certificado:', error);
      alert('Error al registrar el certificado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Certificado</h2>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.nombre_certificado ? 'border-red-500' : ''}`}
            name="nombre_certificado" 
            placeholder="Nombre del Certificado *" 
            type="text" 
            value={certificado.nombre_certificado}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.nombre_certificado && (
            <p className="text-red-500 text-sm mt-1">El nombre del certificado es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.numero_documento_certificado ? 'border-red-500' : ''}`}
            name="numero_documento_certificado" 
            placeholder="Número de Documento del Certificado *" 
            type="number" 
            value={certificado.numero_documento_certificado}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.numero_documento_certificado && (
            <p className="text-red-500 text-sm mt-1">El número de documento es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Finalización *
          </label>
          <input 
            className={`${formStyles} ${errors.fecha_fin ? 'border-red-500' : ''}`}
            name="fecha_fin" 
            type="date" 
            value={certificado.fecha_fin}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.fecha_fin && (
            <p className="text-red-500 text-sm mt-1">La fecha de finalización es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          {loadingOptions ? (
            <p>Cargando aprendices...</p>
          ) : (
            <select
              className={`${formStyles} ${errors.id_aprendiz ? 'border-red-500' : ''}`}
              name="id_aprendiz"
              value={certificado.id_aprendiz}
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
          )}
          {errors.id_aprendiz && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar un aprendiz</p>
          )}
        </div>
        
        <div className="mb-3">
          {loadingOptions ? (
            <p>Cargando lecciones...</p>
          ) : (
            <select
              className={`${formStyles} ${errors.id_lecciones ? 'border-red-500' : ''}`}
              name="id_lecciones"
              value={certificado.id_lecciones}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccionar Lección *</option>
              {lecciones.map(leccion => (
                <option key={leccion.id_leccion} value={leccion.id_leccion}>
                  {leccion.nombre_leccion}
                </option>
              ))}
            </select>
          )}
          {errors.id_lecciones && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar una lección</p>
          )}
        </div>
        
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Registrar Certificado'}
        </Button>
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => setActiveSection('admin')}
          disabled={loading}
        >
          Volver
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistroCertificado;