const API_URL = 'http://localhost:8080';

const CertificadosService = {
    // Obtener todos los certificados
    getAllCertificados: async () => {
        try {
            const response = await fetch(`${API_URL}/api/certificados`);
            if (!response.ok) throw new Error('Error al obtener certificados');
            const data = await response.json();
            
            // Devolver la respuesta tal como viene del servidor
            // La estructura esperada es { code: number, message: string, data: array }
            return data;
        } catch (error) {
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
            const response = await fetch(`${API_URL}/api/certificados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificadoData)
            });
            if (!response.ok) throw new Error('Error al crear el certificado');
            return await response.json();
        } catch (error) {
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