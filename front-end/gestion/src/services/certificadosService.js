// const API_URL = 'http://172.30.5.207:8080';
const API_URL = 'http://localhost:8080';

const CertificadosService = {
    // Obtener todos los certificados
    getAllCertificados: async () => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/obtener`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener certificados');
            }
            const responseData = await response.json();
            return responseData.data || [];
        } catch (error) {
            console.error('Error en getAllCertificados:', error);
            throw error;
        }
    },

    // Obtener un certificado por ID
    getCertificadoById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/${id}`);
            if (!response.ok) throw new Error('Error al obtener el certificado');
            return await response.json();
        } catch (error) {
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

            return responseData;
        } catch (error) {
            console.error('Error en createCertificado:', error);
            throw error;
        }
    },

    // Actualizar un certificado
    updateCertificado: async (id, certificadoData) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificadoData)
            });
            if (!response.ok) throw new Error('Error al actualizar el certificado');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un certificado
    deleteCertificado: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/certificados/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el certificado');
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default CertificadosService;