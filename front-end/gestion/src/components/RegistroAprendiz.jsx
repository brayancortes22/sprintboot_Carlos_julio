import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import AprendizService from '../services/AprendizService';

const RegistroAprendiz = ({ setActiveSection, formStyles }) => {
  const [aprendiz, setAprendiz] = useState({
    nombre: '',
    numero_documento: '',
    correo: '',
    contraseña: '',
    tipo_usuario: ''
  });
  
  const [errors, setErrors] = useState({
    nombre: false,
    numero_documento: false,
    correo: false,
    contraseña: false,
    tipo_usuario: false
  });
  
  const [loading, setLoading] = useState(false);

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
  };
  
  const validateForm = () => {
    const newErrors = {
      nombre: !aprendiz.nombre.trim(),
      numero_documento: !aprendiz.numero_documento.trim(),
      correo: !aprendiz.correo.trim(),
      contraseña: !aprendiz.contraseña.trim(),
      tipo_usuario: !aprendiz.tipo_usuario
    };
    
    // Validación adicional para el correo electrónico
    if (!newErrors.correo && !/\S+@\S+\.\S+/.test(aprendiz.correo)) {
      newErrors.correo = true;
    }
    
    // Validación para la longitud de la contraseña
    if (!newErrors.contraseña && aprendiz.contraseña.length < 4) {
      newErrors.contraseña = true;
    }
    
    setErrors(newErrors);
    
    // Devuelve true si no hay errores
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    try {
      setLoading(true);
      // Convertir a los tipos de datos correctos
      const aprendizData = {
        ...aprendiz,
        numero_documento: parseInt(aprendiz.numero_documento),
        tipo_usuario: parseInt(aprendiz.tipo_usuario)
      };
      
      await AprendizService.createAprendiz(aprendizData);
      alert('Aprendiz registrado exitosamente');
      setActiveSection('admin');
    } catch (error) {
      console.error('Error al registrar el aprendiz:', error);
      alert('Error al registrar el aprendiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Registro Aprendiz</h2>
        
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
            className={`${formStyles} ${errors.numero_documento ? 'border-red-500' : ''}`} 
            name="numero_documento" 
            placeholder="Número de documento *" 
            value={aprendiz.numero_documento} 
            onChange={handleChange} 
            type="number"
          />
          {errors.numero_documento && <p className="text-red-500 text-sm">El número de documento es requerido</p>}
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
        
        <div className="mb-3">
          <select
            className={`${formStyles} ${errors.tipo_usuario ? 'border-red-500' : ''}`}
            name="tipo_usuario"
            value={aprendiz.tipo_usuario}
            onChange={handleChange}
          >
            <option value="">Seleccione tipo de usuario *</option>
            <option value="1">Administrador</option>
            <option value="2">Aprendiz</option>
          </select>
          {errors.tipo_usuario && <p className="text-red-500 text-sm">Seleccione un tipo de usuario</p>}
        </div>
        
        <div className="flex justify-between">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white mr-2" 
            onClick={() => setActiveSection('admin')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Aprendiz'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistroAprendiz; 