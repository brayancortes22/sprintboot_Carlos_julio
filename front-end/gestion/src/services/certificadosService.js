import HttpClient from '../utils/httpClient';
import AuthService from './authService';

const CertificadosService = {
    // Obtener todos los certificados
    getAllCertificados: async () => {
        try {
            const response = await HttpClient.get('/certificados/obtener');
            
            if (!response.data) {
                return [];
            }
            
            return response.data;
        } catch (error) {
            console.error('Error en getAllCertificados:', error);
            throw error;
        }
    },

    // Obtener un certificado por ID
    getCertificadoById: async (id) => {
        try {
            const response = await HttpClient.get(`/certificados/obtener/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getCertificadoById:', error);
            throw error;
        }
    },

    // Crear un nuevo certificado
    createCertificado: async (certificadoData) => {
        try {
            // Verificar que exista el token de autenticación
            const token = AuthService.getToken();
            if (!token) {
                console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
                throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            console.log('Datos enviados al servidor:', certificadoData);
            const response = await HttpClient.post('/certificados/create', certificadoData);
            console.log('Respuesta del servidor:', response);
            return response.data;
        } catch (error) {
            console.error('Error en createCertificado:', error);
            throw error;
        }
    },

    // Actualizar un certificado
    updateCertificado: async (id, certificadoData) => {
        try {
            // Verificar que exista el token de autenticación
            const token = AuthService.getToken();
            if (!token) {
                console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
                throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            const response = await HttpClient.put(`/certificados/actualizar/${id}`, certificadoData);
            return response.data;
        } catch (error) {
            console.error('Error en updateCertificado:', error);
            throw error;
        }
    },

    // Eliminar un certificado
    deleteCertificado: async (id) => {
        try {
            // Verificar que exista el token de autenticación
            const token = AuthService.getToken();
            if (!token) {
                console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
                throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            await HttpClient.delete(`/certificados/eliminar/${id}`);
            return true;
        } catch (error) {
            console.error('Error en deleteCertificado:', error);
            throw error;
        }
    },

    // Obtener certificados por aprendiz
    getCertificadosByAprendiz: async (aprendizId) => {
        try {
            const response = await HttpClient.get(`/certificados/aprendiz/${aprendizId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error en getCertificadosByAprendiz:', error);
            throw error;
        }
    }
};

export default CertificadosService;