import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

function Login() {

  const navigate = useNavigate();

  const handleCertificatesClick = () => {
    navigate('/registro-certificados');
  };


  return (
    <div className="login-container">
      <header className="header">
        <h1>Sistema Académico</h1>
        <button className="certificates-button" onClick={handleCertificatesClick}>Ver Certificados</button>
      </header>
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <input type="text" placeholder="Documento" />
          <select>
            <option value="">Seleccionar tipo de usuario</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;