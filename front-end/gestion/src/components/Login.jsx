import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const Login = ({ setActiveSection, formStyles }) => {
  const [credentials, setCredentials] = useState({
    documento: '',
    tipoUsuario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      // Aquí iría la llamada al servicio de autenticación
      // Por ahora simulamos la autenticación
      if (credentials.tipoUsuario === '1') {
        setActiveSection('admin');
      } else if (credentials.tipoUsuario === '2') {
        setActiveSection('aprendiz');
      } else {
        alert('Por favor seleccione un tipo de usuario');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Iniciar Sesión</h2>
        <input 
          className={formStyles} 
          name="documento" 
          placeholder="Documento" 
          type="text" 
          value={credentials.documento}
          onChange={handleChange} 
        />
        <select 
          className={formStyles} 
          name="tipoUsuario" 
          value={credentials.tipoUsuario}
          onChange={handleChange}
        >
          <option value="">Seleccionar tipo de usuario</option>
          <option value="1">Administrador</option>
          <option value="2">Aprendiz</option>
        </select>
        <Button 
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
          onClick={handleLogin}
        >
          Ingresar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;