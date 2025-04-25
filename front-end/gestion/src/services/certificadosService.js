import HttpClient from '../utils/httpClient';
import AuthService from './authService';
import { CERTIFICADOS_ENDPOINTS } from '../config/apiConfig';

const CertificadosService = {
    // Obtener todos los certificados
    getAllCertificados: async () => {
        try {
            const response = await HttpClient.get(CERTIFICADOS_ENDPOINTS.GET_ALL);
            
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
            const response = await HttpClient.get(CERTIFICADOS_ENDPOINTS.GET_BY_ID(id));
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
            const response = await HttpClient.post(CERTIFICADOS_ENDPOINTS.CREATE, certificadoData);
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
            
            const response = await HttpClient.put(CERTIFICADOS_ENDPOINTS.UPDATE(id), certificadoData);
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
            
            await HttpClient.delete(CERTIFICADOS_ENDPOINTS.DELETE(id));
            return true;
        } catch (error) {
            console.error('Error en deleteCertificado:', error);
            throw error;
        }
    },

    // Obtener certificados por aprendiz
    getCertificadosByAprendiz: async (aprendizId) => {
        try {
            const response = await HttpClient.get(CERTIFICADOS_ENDPOINTS.GET_BY_APRENDIZ(aprendizId));
            return response.data || [];
        } catch (error) {
            console.error('Error en getCertificadosByAprendiz:', error);
            throw error;
        }
    }
};

export default CertificadosService;