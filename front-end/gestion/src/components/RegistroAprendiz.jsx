import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/aprendizService';
import SecurityUtils from '../utils/securityUtils';
import AuthService from '../services/authService';

const RegistroAprendiz = ({ setActiveSection, formStyles }) => {
  const [aprendiz, setAprendiz] = useState({
    nombre: '',
    numeroDocumento: '',
    correo: '',
    contraseña: '',
    tipoUsuario: ''
  });
  
  const [errors, setErrors] = useState({
    nombre: false,
    numeroDocumento: false,
    correo: false,
    contraseña: false,
    tipoUsuario: false
  });
  
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAuth = () => {
      if (SecurityUtils.isAdmin()) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        // Redirigir al login si no está autorizado
        setActiveSection && setActiveSection('login');
      }
    };
    
    checkAuth();
  }, [setActiveSection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAprendiz(prev => ({
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
    const documentNumber = parseInt(aprendiz.numeroDocumento);
    const newErrors = {
      nombre: !aprendiz.nombre.trim(),
      numeroDocumento: !aprendiz.numeroDocumento || isNaN(documentNumber) || documentNumber <= 0 || aprendiz.numeroDocumento.includes('.'),
      correo: !aprendiz.correo.trim() || !/\S+@\S+\.\S+/.test(aprendiz.correo),
      contraseña: !aprendiz.contraseña.trim() || aprendiz.contraseña.length < 4,
      tipoUsuario: !aprendiz.tipoUsuario
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const errorMessage = errors.numeroDocumento ? 
        'El número de documento debe ser un número entero positivo' : 
        'Por favor complete todos los campos requeridos correctamente';
      alert(errorMessage);
      return;
    }
    
    try {
      setLoading(true);
      
      // Verificar que exista el token de autenticación
      const token = AuthService.getToken();
      if (!token) {
        console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
        alert('No hay una sesión activa. Por favor inicie sesión nuevamente.');
        setActiveSection('login');
        return;
      }
      
      const aprendizData = {
        ...aprendiz,
        numeroDocumento: parseInt(aprendiz.numeroDocumento),
        tipoUsuario: parseInt(aprendiz.tipoUsuario)
      };
      
      console.log('Enviando datos de aprendiz al servidor:', aprendizData);
      
      const response = await AprendizService.createAprendiz(aprendizData);
      console.log('Respuesta del servidor al crear aprendiz:', response);
      
      alert('Aprendiz registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el aprendiz:', error);
      
      // Mostrar un mensaje más descriptivo según el tipo de error
      if (error.message && error.message.includes('403')) {
        alert('No tienes permisos para registrar aprendices. Por favor verifica tu sesión.');
      } else {
        alert('Error al registrar el aprendiz: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Si no está autorizado, no renderizar el contenido
  if (!isAuthorized) {
    return null;
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Aprendiz</h2>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.nombre ? 'border-red-500' : ''}`} 
            name="nombre" 
            placeholder="Nombre completo *" 
            value={aprendiz.nombre} 
            onChange={handleChange} 
          />
          {errors.nombre && <p className="text-red-500 text-sm">El nombre es requerido</p>}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.numeroDocumento ? 'border-red-500' : ''}`} 
            name="numeroDocumento" 
            placeholder="Número de documento *" 
            value={aprendiz.numeroDocumento} 
            onChange={handleChange} 
            type="number"
          />
          {errors.numeroDocumento && <p className="text-red-500 text-sm">El número de documento debe ser mayor que 0</p>}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.correo ? 'border-red-500' : ''}`} 
            name="correo" 
            placeholder="Correo electrónico *" 
            value={aprendiz.correo} 
            onChange={handleChange} 
            type="email"
          />
          {errors.correo && <p className="text-red-500 text-sm">Ingrese un correo electrónico válido</p>}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.contraseña ? 'border-red-500' : ''}`} 
            name="contraseña" 
            placeholder="Contraseña *" 
            value={aprendiz.contraseña} 
            onChange={handleChange} 
            type="password"
          />
          {errors.contraseña && <p className="text-red-500 text-sm">La contraseña debe tener al menos 4 caracteres</p>}
        </div>
        
        <div className="mb-3">
          <select
            className={`${formStyles} ${errors.tipoUsuario ? 'border-red-500' : ''}`}
            name="tipoUsuario"
            value={aprendiz.tipoUsuario}
            onChange={handleChange}
          >
            <option value="">Seleccione tipo de usuario *</option>
            <option value="1">Administrador</option>
            <option value="2">Aprendiz</option>
          </select>
          {errors.tipoUsuario && <p className="text-red-500 text-sm">Seleccione un tipo de usuario</p>}
        </div>
        
        <div className="flex justify-between">
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
            {loading ? 'Registrando...' : 'Registrar Aprendiz'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistroAprendiz;