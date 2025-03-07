import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './css/RegistroCertificado.css';

const RegistroCertificado = () => {
    /**va el boton volver a el login
     * 
     */
    const navigate = useNavigate();
    const volver = () => {
        navigate('/');
    }
    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <h1 className="title">Sistema Académico</h1>
                    <button className="view-button">Ver Certificados</button>
                </div>
                <div className="form-container">
                    <h2 className="form-title">Registro Certificado</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Nombre Certificado" className="input" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Número Documento" className="input" />
                        </div>
                        <div className="form-group relative">
                            <input type="text" placeholder="dd / mm / aaaa" className="input" />
                            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="ID Aprendiz" className="input" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="ID Lección" className="input" />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="submit-button">Enviar</button>
                            <button type="button" className="back-button"
                            onClick={volver}>Volver</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistroCertificado;