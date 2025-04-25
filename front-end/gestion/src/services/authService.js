import HttpClient from '../utils/httpClient';
import { AUTH_ENDPOINTS } from '../config/apiConfig';

/**
 * Servicio para manejar la autenticación de usuarios
 */
class AuthService {
  /**
   * Inicia sesión del usuario
   * @param {Object} credentials - Credenciales del usuario (correo, contraseña)
   * @returns {Promise} - Promesa con los datos del usuario y token
   */
  async login(credentials) {
    try {
      const response = await HttpClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
      console.log('Respuesta login completa:', response);
      
      if (response && response.data) {
        // El token puede estar en response.data.token o directamente en response.data
        const token = response.data.token || response.data.access_token || response.data.accessToken;
        if (token) {
          // Guardar el token en localStorage
          localStorage.setItem('token', token);
          console.log('Token almacenado correctamente');
          
          // Extraer y guardar los datos del usuario
          const userData = response.data.user || response.data.userData || response.data;
          const userDataToStore = {
            id: userData.id || null,
            nombre: userData.nombre || null,
            correo: userData.correo || credentials.correo,
            tipoUsuario: userData.tipoUsuario || parseInt(credentials.tipoUsuario)
          };
          
          localStorage.setItem('userData', JSON.stringify(userDataToStore));
          console.log('Datos de usuario almacenados:', userDataToStore);
        } else {
          console.warn('No se encontró token en la respuesta:', response.data);
        }
      } else {
        console.warn('La respuesta no contiene datos válidos');
      }
      return response;
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Promise} - Promesa con la respuesta del servidor
   */
  async register(userData) {
    try {
      const response = await HttpClient.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - true si está autenticado, false en caso contrario
   */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    // Aquí podría ir una lógica para verificar si el token ha expirado
    // Por ejemplo, decodificar el JWT y verificar su fecha de expiración
    
    return true;
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns {Object|null} - Datos del usuario o null si no está autenticado
   */
  getUserData() {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return null;
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error al parsear datos de usuario:', error);
      // Si hay un error al parsear, limpiamos el localStorage para evitar futuros errores
      localStorage.removeItem('userData');
      return null;
    }
  }

  /**
   * Obtiene el token actual
   * @returns {string|null} - Token o null si no está autenticado
   */
  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();