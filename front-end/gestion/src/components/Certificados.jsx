import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';

const Certificados = ({ setActiveSection, formStyles }) => {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCertificados();
  }, []);

  const loadCertificados = async () => {
    try {
      const response = await CertificadosService.getAllCertificados();
      
      // Verificar la estructura de la respuesta
      if (response && response.data && Array.isArray(response.data)) {
        setCertificados(response.data);
      } else {
        console.error('Respuesta incorrecta del servidor:', response);
        setError('La estructura de datos recibida no es válida');
        setCertificados([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar certificados:', error);
      setError(error.message || 'Error al cargar los certificados');
      setCertificados([]);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este certificado?')) {
      try {
        await CertificadosService.deleteCertificado(id);
        alert('Certificado eliminado exitosamente');
        loadCertificados(); // Recargar la lista
      } catch (error) {
        console.error('Error al eliminar certificado:', error);
        alert('Error al eliminar el certificado');
      }
    }
  };

  const handleLogout = () => {
    setActiveSection('login');
  };

  if (loading) {
    return <div>Cargando certificados...</div>;
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Certificados</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {certificados.length === 0 ? (
          <div className="text-center py-4">
            <p>No se encontraron certificados disponibles.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {certificados.map((certificado) => (
              <div key={certificado.idCertificado} className="border p-4 rounded-lg">
                <h3 className="font-bold">{certificado.nombreCertificado}</h3>
                <p>ID Aprendiz: {certificado.id_aprendiz}</p>
                <p>ID Lección: {certificado.id_lecciones}</p>
                <div className="mt-2 space-x-2">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(certificado.idCertificado)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </CardContent>
    </Card>
  );
};

export default Certificados;