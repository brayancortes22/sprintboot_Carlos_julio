import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AuthService from '../services/authService';
import formStyles, { getInputClass, getSelectClass } from '../utils/formStyles';

const Login = ({ setActiveSection, setLoggedUser }) => {
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
        
        // Extraer datos de la respuesta para asegurar que obtengamos el ID
        let userId = null;
        
        // Intentar obtener el ID directamente de la respuesta del login
        if (response && response.data) {
          const responseData = response.data;
          // Buscar el ID en diferentes lugares posibles
          if (responseData.id !== undefined) userId = responseData.id;
          else if (responseData.idUsuario !== undefined) userId = responseData.idUsuario;
          else if (responseData.user && responseData.user.id !== undefined) userId = responseData.user.id;
          else if (responseData.userData && responseData.userData.id !== undefined) userId = responseData.userData.id;
          else if (responseData.aprendiz && responseData.aprendiz.idAprendiz !== undefined) 
            userId = responseData.aprendiz.idAprendiz;
        }
        
        // Verificar si hay ID en el localStorage (puede haberlo guardado authService)
        const userData = AuthService.getUserData() || {};
        if (!userId && userData.id) {
          userId = userData.id;
        }
        
        console.log("ID del usuario encontrado:", userId);
        
        // Si aún no tenemos ID pero tenemos tipoUsuario=2 (aprendiz), generar ID temporal
        // Esto es un workaround si el backend no devuelve ID
        if (!userId && parseInt(credentials.tipoUsuario) === 2) {
          // Usamos el correo como identificador alternativo
          // Esto asume que el correo es único en el sistema
          userId = `temp_${credentials.correo.replace(/[^a-zA-Z0-9]/g, '_')}`;
          console.log("Generado ID temporal basado en correo:", userId);
        }
        
        // Guardar el ID en localStorage independientemente - CRÍTICO para la inscripción
        localStorage.setItem('userId', userId || 'unknown');
        
        // Crear objeto de usuario con datos completos
        const userDataToStore = {
          id: userId,
          nombre: userData.nombre || response.data?.nombre || "Usuario",
          correo: userData.correo || credentials.correo,
          tipoUsuario: userData.tipoUsuario || parseInt(credentials.tipoUsuario)
        };
        
        // Guardar en localStorage (esto es redundante con AuthService, pero es una capa extra de seguridad)
        localStorage.setItem('userData', JSON.stringify(userDataToStore));
        console.log("Datos completos guardados en localStorage:", userDataToStore);
        
        // Actualizar estado de la aplicación
        setLoggedUser(userDataToStore);
        
        console.log("Redirigiendo al usuario con tipo:", userDataToStore.tipoUsuario);
        
        // Redirigir según el tipo de usuario
        if (userDataToStore.tipoUsuario === 1) {
          // Administrador
          setActiveSection('admin');
          console.log("Usuario administrador, redirigiendo a panel admin");
        } else if (userDataToStore.tipoUsuario === 2) {
          // Aprendiz
          setActiveSection('aprendizPanel');
          console.log("Usuario aprendiz, redirigiendo a panel aprendiz");
        } else {
          console.error("Tipo de usuario desconocido:", userDataToStore.tipoUsuario);
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
          <div className={formStyles.errorAlert} role="alert">
            {errorMessage}
          </div>
        )}
        
        <div className={formStyles.formGroup}>
          <input 
            className={getInputClass(errors.correo)}
            name="correo" 
            placeholder="Correo electrónico" 
            type="email" 
            value={credentials.correo}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.correo && (
            <div className={formStyles.errorMessage}>El correo es requerido</div>
          )}
        </div>
        
        <div className={formStyles.formGroup}>
          <input 
            className={getInputClass(errors.contraseña)}
            name="contraseña" 
            placeholder="Contraseña" 
            type="password" 
            value={credentials.contraseña}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.contraseña && (
            <div className={formStyles.errorMessage}>La contraseña es requerida</div>
          )}
        </div>
        
        <div className={formStyles.formGroup}>
          <select 
            className={getSelectClass(errors.tipoUsuario)}
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
            <div className={formStyles.errorMessage}>Seleccione un tipo de usuario</div>
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