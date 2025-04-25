// Servicio para manejar la autenticación y JWT
import HttpClient from '../utils/httpClient';

const API_URL = 'http://localhost:8080';

const AuthService = {
    // Iniciar sesión
    login: async (credentials) => {
        try {
            console.log("Enviando credenciales:", credentials);
            
            // Asegurar que las credenciales tengan el formato correcto para el backend
            const authData = {
                correo: credentials.correo,
                contraseña: credentials.contraseña,
                tipoUsuario: parseInt(credentials.tipoUsuario)
            };
            
            console.log("Datos enviados al servidor:", JSON.stringify(authData));
            
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData)
            });

            console.log("Respuesta del servidor:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error detallado:", errorData);
                throw new Error(errorData.message || 'Error en la autenticación');
            }

            const responseData = await response.json();
            console.log("Datos de respuesta:", responseData);
            
            // Guardar el token en localStorage
            if (responseData.data && responseData.data.token) {
                localStorage.setItem('token', responseData.data.token);
                localStorage.setItem('userData', JSON.stringify({
                    id: responseData.data.id_aprendiz,
                    nombre: responseData.data.nombre,
                    correo: responseData.data.correo,
                    tipoUsuario: responseData.data.tipoUsuario
                }));
            }
            
            return responseData.data;
        } catch (error) {
            console.error('Error en el login:', error);
            throw error;
        }
    },

    // Cerrar sesión
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },

    // Obtener el token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Obtener datos del usuario
    getUserData: () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }
};

export default AuthService;