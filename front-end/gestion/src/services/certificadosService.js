const API_URL = 'http://localhost:8080';

const CertificadosService = {
    // Obtener todos los certificados
    getAllCertificados: async () => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/obtener`);
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener certificados');
            }
            
            if (!responseData.data) {
                return [];
            }
            
            return responseData.data;
        } catch (error) {
            console.error('Error en getAllCertificados:', error);
            throw error;
        }
    },

    // Obtener un certificado por ID
    getCertificadoById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/obtener/${id}`);
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener el certificado');
            }
            
            return responseData.data;
        } catch (error) {
            console.error('Error en getCertificadoById:', error);
            throw error;
        }
    },

    // Crear un nuevo certificado
    createCertificado: async (certificadoData) => {
        try {
            console.log('Datos enviados al servidor:', certificadoData);
            const response = await fetch(`${API_URL}/api/certificados/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificadoData)
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al crear el certificado');
            }

            return responseData.data;
        } catch (error) {
            console.error('Error en createCertificado:', error);
            throw error;
        }
    },

    // Actualizar un certificado
    updateCertificado: async (id, certificadoData) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificadoData)
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Error al actualizar el certificado');
            }
            
            return responseData.data;
        } catch (error) {
            console.error('Error en updateCertificado:', error);
            throw error;
        }
    },

    // Eliminar un certificado
    deleteCertificado: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/eliminar/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Error al eliminar el certificado');
            }
            
            return true;
        } catch (error) {
            console.error('Error en deleteCertificado:', error);
            throw error;
        }
    },

    // Obtener certificados por aprendiz
    getCertificadosByAprendiz: async (aprendizId) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/aprendiz/${aprendizId}`);
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener los certificados del aprendiz');
            }
            
            return responseData.data || [];
        } catch (error) {
            console.error('Error en getCertificadosByAprendiz:', error);
            throw error;
        }
    }
};

export default CertificadosService;