import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/AprendizService';

const Login = ({ setActiveSection, formStyles }) => {
  const [credentials, setCredentials] = useState({
    documento: '',
    tipoUsuario: ''
  });
  const [errors, setErrors] = useState({
    documento: false,
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
      documento: !credentials.documento.trim(),
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
        // Verificar que el documento existe en la base de datos
        const aprendices = await AprendizService.getAllAprendices();
        const documentoNum = parseInt(credentials.documento.replace(/,/g, ''));
        const aprendiz = aprendices.find(a => a.numeroDocumento === documentoNum);
        
        if (!aprendiz) {
          setErrorMessage('El documento ingresado no está registrado en el sistema.');
          setLoading(false);
          return;
        }
        
        // Validar que el tipo de usuario coincida con el seleccionado
        const tipoUsuarioNum = parseInt(credentials.tipoUsuario);
        
        if (aprendiz.tipoUsuario !== tipoUsuarioNum) {
          setErrorMessage('No tienes permisos para acceder con este tipo de usuario.');
          setLoading(false);
          return;
        }
        
        // Redirigir según el tipo de usuario
        if (tipoUsuarioNum === 1) {
          // Administrador
          setActiveSection('admin');
        } else if (tipoUsuarioNum === 2) {
          // Aprendiz
          setActiveSection('certificados');
        }
      } catch (error) {
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
            className={`${formStyles} ${errors.documento ? 'border-red-500' : ''}`}
            name="documento" 
            placeholder="Documento" 
            type="text" 
            value={credentials.documento}
            onChange={handleChange} 
            disabled={loading}
          />
          {errors.documento && (
            <p className="text-red-500 text-sm mt-1">El documento es requerido</p>
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
      </CardContent>
    </Card>
  );
};

export default Login;