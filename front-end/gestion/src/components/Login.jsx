import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AuthService from '../services/authService';

const Login = ({ setActiveSection, formStyles, setLoggedUser }) => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contraseña: '',
    tipoUsuario: ''
  });
  const [errors, setErrors] = useState({
    correo: false,
    contraseña: false,
    tipoUsuario: false
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Resetear error del campo al modificarlo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
    // Limpiar mensaje de error general
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateFields = () => {
    const newErrors = {
      correo: !credentials.correo.trim(),
      contraseña: !credentials.contraseña.trim(),
      tipoUsuario: !credentials.tipoUsuario
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleLogin = async () => {
    try {
      // Validar campos antes de continuar
      if (!validateFields()) {
        return;
      }

      setLoading(true);
      setErrorMessage('');

      try {
        // Preparar datos para la autenticación
        const authData = {
          correo: credentials.correo,
          contraseña: credentials.contraseña,
          tipoUsuario: parseInt(credentials.tipoUsuario)
        };
        
        // Llamar al servicio de autenticación
        const response = await AuthService.login(authData);
        console.log("Respuesta completa del login:", response);
        
        // La respuesta ahora contiene la estructura correcta desde las modificaciones a authService
        const userData = AuthService.getUserData();
        console.log("Datos de usuario recuperados:", userData);
        
        if (!userData) {
          throw new Error("No se pudieron obtener los datos del usuario");
        }
        
        // Guardar información del usuario logueado
        setLoggedUser({
          id: userData.id || null,
          nombre: userData.nombre || "Usuario",
          correo: userData.correo || credentials.correo,
          tipoUsuario: userData.tipoUsuario || parseInt(credentials.tipoUsuario)
        });
        
        console.log("Redirigiendo al usuario con tipo:", userData.tipoUsuario);
        
        // Redirigir según el tipo de usuario
        if (userData.tipoUsuario === 1) {
          // Administrador
          setActiveSection('admin');
          console.log("Usuario administrador, redirigiendo a panel admin");
        } else if (userData.tipoUsuario === 2) {
          // Aprendiz
          setActiveSection('aprendizPanel');
          console.log("Usuario aprendiz, redirigiendo a panel aprendiz");
        } else {
          console.error("Tipo de usuario desconocido:", userData.tipoUsuario);
          setErrorMessage("Tipo de usuario no reconocido");
        }
      } catch (error) {
        console.error("Error detallado:", error);
        setErrorMessage(error.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error inesperado al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Iniciar Sesión</h2>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.correo ? 'border-red-500' : ''}`}
            name="correo" 
            placeholder="Correo electrónico" 
            type="email" 
            value={credentials.correo}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.correo && (
            <p className="text-red-500 text-sm mt-1">El correo es requerido</p>
          )}
        </div>
        
        <div className="mb-3">
          <input 
            className={`${formStyles} ${errors.contraseña ? 'border-red-500' : ''}`}
            name="contraseña" 
            placeholder="Contraseña" 
            type="password" 
            value={credentials.contraseña}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.contraseña && (
            <p className="text-red-500 text-sm mt-1">La contraseña es requerida</p>
          )}
        </div>
        
        <div className="mb-3">
          <select 
            className={`${formStyles} ${errors.tipoUsuario ? 'border-red-500' : ''}`}
            name="tipoUsuario" 
            value={credentials.tipoUsuario}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Seleccionar tipo de usuario</option>
            <option value="1">Administrador</option>
            <option value="2">Aprendiz</option>
          </select>
          {errors.tipoUsuario && (
            <p className="text-red-500 text-sm mt-1">Seleccione un tipo de usuario</p>
          )}
        </div>
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Ingresar'}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button 
              className="text-indigo-600 hover:underline" 
              onClick={() => setActiveSection('registro')}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;