// const API_URL = 'http://172.30.5.207:8080';
const API_URL = 'http://localhost:8080';

const AprendizService = {
    // Obtener todos los aprendices
    getAllAprendices: async () => {
        try {
            const response = await fetch(`${API_URL}/api/aprendices/obtener`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener aprendices');
            }
            const responseData = await response.json();
            console.log('Respuesta aprendices:', responseData);
            if (responseData && responseData.data) {
                return responseData.data;
            }
            return [];
        } catch (error) {
            console.error('Error en getAllAprendices:', error);
            throw error;
        }
    },

    // Obtener un aprendiz por ID
    getAprendizById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendices/obtener/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener el aprendiz');
            }
            const responseData = await response.json();
            return responseData.data;
        } catch (error) {
            console.error('Error en getAprendizById:', error);
            throw error;
        }
    },

    // Verificar credenciales de aprendiz
    verifyCredentials: async (documento, tipoUsuario) => {
        try {
            // Buscamos entre todos los aprendices
            const aprendices = await AprendizService.getAllAprendices();
            
            // Convertimos documento a número (eliminar comas si las hay)
            const documentoNum = parseInt(documento.replace(/,/g, ''));
            
            // Buscamos el aprendiz con el documento proporcionado
            const aprendiz = aprendices.find(a => a.numeroDocumento === documentoNum);
            
            // Si no se encuentra el aprendiz
            if (!aprendiz) {
                throw new Error('Documento no encontrado');
            }
            
            console.log('Aprendiz encontrado:', aprendiz);
            console.log('Tipo usuario en BD:', aprendiz.tipoUsuario);
            console.log('Tipo usuario seleccionado:', tipoUsuario);
            
            // Verificamos el tipo de usuario
            // tipoUsuario en la UI: '1' es Administrador, '2' es Aprendiz
            // En el modelo: 0 es Administrador, 1 es Aprendiz
            
            // Si el usuario es admin (0) en BD pero intenta entrar como aprendiz ('2')
            if (aprendiz.tipoUsuario === 0 && tipoUsuario === '2') {
                throw new Error('Tipo de usuario incorrecto');
            }
            
            // Si el usuario es aprendiz (1) en BD pero intenta entrar como admin ('1')
            if (aprendiz.tipoUsuario === 1 && tipoUsuario === '1') {
                throw new Error('Tipo de usuario incorrecto');
            }
            
            return aprendiz;
        } catch (error) {
            console.error('Error en la solicitud:', error);
            throw error;
        }
    },

    // Crear un nuevo aprendiz
    createAprendiz: async (aprendizData) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendices/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el aprendiz');
            }
            const responseData = await response.json();
            return responseData.data;
        } catch (error) {
            console.error('Error en createAprendiz:', error);
            throw error;
        }
    },

    // Actualizar un aprendiz
    updateAprendiz: async (id, aprendizData) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendices/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el aprendiz');
            }
            const responseData = await response.json();
            return responseData.data;
        } catch (error) {
            console.error('Error en updateAprendiz:', error);
            throw error;
        }
    },

    // Eliminar un aprendiz
    deleteAprendiz: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendices/eliminar/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el aprendiz');
            }
            return true;
        } catch (error) {
            console.error('Error en deleteAprendiz:', error);
            throw error;
        }
    }
};

export default AprendizService;