import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

const Login = ({ handleChange, handleLogin, formStyles }) => {
  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Iniciar Sesión</h2>
        <input className={formStyles} name="documento" placeholder="Documento" type="text" onChange={handleChange} />
        <select className={formStyles} name="tipoUsuario" onChange={handleChange}>
          <option value="">Seleccionar tipo de usuario</option>
          <option value="1">Administrador</option>
          <option value="2">Aprendiz</option>
        </select>
        <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleLogin}>Ingresar</Button>
      </CardContent>
    </Card>
  );
};

export default Login;