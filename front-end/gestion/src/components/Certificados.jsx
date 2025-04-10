import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import CertificadosService from '../services/certificadosService';

const Certificados = ({ setActiveSection, formStyles }) => {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificados();
  }, []);

  const loadCertificados = async () => {
    try {
      const data = await CertificadosService.getAllCertificados();
      setCertificados(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar certificados:', error);
      alert('Error al cargar los certificados');
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

  if (loading) {
    return <div>Cargando certificados...</div>;
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Certificados</h2>
        <div className="space-y-4">
          {certificados.map((certificado) => (
            <div key={certificado.id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{certificado.nombre}</h3>
              <p>ID Aprendiz: {certificado.idAprendiz}</p>
              <p>ID Curso: {certificado.idCurso}</p>
              <div className="mt-2 space-x-2">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(certificado.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={() => setActiveSection('admin')}
        >
          Volver
        </Button>
      </CardContent>
    </Card>
  );
};

export default Certificados;