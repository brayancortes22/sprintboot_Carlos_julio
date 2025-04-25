import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/aprendizService';

const Registro = ({ setActiveSection, formStyles }) => {
  const [aprendiz, setAprendiz] = useState({
    nombre: '',
    numeroDocumento: '',
    correo: '',
    contraseña: '', // Mantenemos este nombre para la interfaz de usuario
    tipoUsuario: '2' // Por defecto, se registra como aprendiz
  });
  
  const [errors, setErrors] = useState({
    nombre: false,
    numeroDocumento: false,
    correo: false,
    contraseña: false
  });
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    
    // Limpiar mensajes
    if (successMessage || errorMessage) {
      setSuccessMessage('');
      setErrorMessage('');
    }
  };
  
  const validateForm = () => {
    const documentNumber = parseInt(aprendiz.numeroDocumento);
    const newErrors = {
      nombre: !aprendiz.nombre.trim(),
      numeroDocumento: !aprendiz.numeroDocumento || isNaN(documentNumber) || documentNumber <= 0 || aprendiz.numeroDocumento.includes('.'),
      correo: !aprendiz.correo.trim() || !/\S+@\S+\.\S+/.test(aprendiz.correo),
      contraseña: !aprendiz.contraseña.trim() || aprendiz.contraseña.length < 4
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const errorMessage = errors.numeroDocumento ? 
        'El número de documento debe ser un número entero positivo' : 
        'Por favor complete todos los campos requeridos correctamente';
      setErrorMessage(errorMessage);
      return;
    }
    
    try {
      setLoading(true);
      console.log('Datos a enviar (original):', aprendiz); // Log para depurar
      
      // Crear un nuevo objeto con los datos formateados y renombrando contraseña a password
      const aprendizData = {
        nombre: aprendiz.nombre,
        numeroDocumento: parseInt(aprendiz.numeroDocumento),
        correo: aprendiz.correo,
        password: aprendiz.contraseña, // Usar 'password' en lugar de 'contraseña' para evitar problemas con la ñ
        tipoUsuario: parseInt(aprendiz.tipoUsuario)
      };
      
      console.log('Datos formateados:', JSON.stringify(aprendizData)); // Log para depurar
      
      await AprendizService.createAprendiz(aprendizData);
      setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.');
      
      // Limpiar el formulario
      setAprendiz({
        nombre: '',
        numeroDocumento: '',
        correo: '',
        contraseña: '',
        tipoUsuario: '2'
      });
      
      // Después de 3 segundos, redirigir al login
      setTimeout(() => {
        setActiveSection('login');
      }, 3000);
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage(error.message || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Crear una cuenta</h2>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
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
        
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarme'}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button 
              className="text-indigo-600 hover:underline" 
              onClick={() => setActiveSection('login')}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Registro;