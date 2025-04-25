import HttpClient from '../utils/httpClient';

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