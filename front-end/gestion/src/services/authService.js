// Servicio para manejar la autenticación y JWT
const API_URL = 'http://localhost:8080';

export const AuthService = {
    // Iniciar sesión
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la autenticación');
            }

            const responseData = await response.json();
            
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