// const API_URL = 'http://172.30.5.207:8080';
const API_URL = 'http://localhost:8080';
import AuthService from './authService';

const AprendizService = {
    // Obtener todos los aprendices
    getAllAprendices: async () => {
        try {
            const token = AuthService.getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            // Agregar token de autorización si existe
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_URL}/api/aprendices/obtener`, {
                headers
            });
            
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
            const token = AuthService.getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_URL}/api/aprendices/${id}`, {
                headers
            });
            
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

    // Verificar credenciales de aprendiz (esta función será reemplazada por AuthService.login)
    verifyCredentials: async (documento, tipoUsuario) => {
        // Esta función ya no será necesaria una vez que implementemos completamente JWT
        // Se mantiene temporalmente para compatibilidad
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
            
            // Verificamos el tipo de usuario
            if (aprendiz.tipoUsuario !== parseInt(tipoUsuario)) {
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
            const token = AuthService.getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_URL}/api/aprendices/create`, {
                method: 'POST',
                headers,
                body: JSON.stringify(aprendizData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el aprendiz');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.message || 'Error al crear el aprendiz');
        }
    },

    // Actualizar un aprendiz
    updateAprendiz: async (id, aprendizData) => {
        try {
            const token = AuthService.getToken();
            if (!token) {
                console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
                throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_URL}/api/aprendices/actualizar/${id}`, {
                method: 'PUT',
                headers,
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
            const token = AuthService.getToken();
            if (!token) {
                console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
                throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_URL}/api/aprendices/eliminar/${id}`, {
                method: 'DELETE',
                headers
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