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
          
          // La respuesta desde el backend debería incluir los datos del usuario
          // incluyendo el ID del aprendiz (id_aprendiz según la BD)
          let userId = null;
          
          // Intentar obtener el ID del aprendiz de la respuesta
          // La estructura de respuesta desde nuestro backend Spring es:
          // { datos: { id_aprendiz: X, nombre: "...", ... } }
          if (response.datos) {
            userId = response.datos.id_aprendiz || response.datos.id;
          }
          // O podría estar en response.data.datos
          else if (response.data.datos) {
            userId = response.data.datos.id_aprendiz || response.data.datos.id;
          }
          // O podría estar directamente en datos
          else if (response.data) {
            userId = response.data.id_aprendiz || response.data.id || response.data.idAprendiz;
          }
          
          console.log('ID de aprendiz encontrado en respuesta:', userId);
          
          // Si aún no se encuentra, buscar en todas las propiedades
          if (!userId) {
            console.log('Buscando ID en la estructura completa de respuesta...');
            // Función recursiva para buscar en toda la estructura
            const findId = (obj) => {
              if (!obj || typeof obj !== 'object') return null;
              
              if (obj.id_aprendiz !== undefined) return obj.id_aprendiz;
              if (obj.idAprendiz !== undefined) return obj.idAprendiz;
              if (obj.id !== undefined) return obj.id;
              
              for (const key in obj) {
                const result = findId(obj[key]);
                if (result !== null) return result;
              }
              return null;
            };
            
            userId = findId(response);
            console.log('ID encontrado en búsqueda recursiva:', userId);
          }
          
          // Extraer y guardar los datos del usuario
          const userData = {
            id: userId,
            nombre: this.extractValue(response, 'nombre'),
            correo: this.extractValue(response, 'correo') || credentials.correo,
            tipoUsuario: this.extractValue(response, 'tipoUsuario') || parseInt(credentials.tipoUsuario)
          };
          
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log('Datos de usuario almacenados:', userData);
          
          // También guardar el ID de forma independiente para mayor seguridad
          if (userId) {
            localStorage.setItem('userId', userId);
            console.log('ID de usuario guardado separadamente:', userId);
          }
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
  
  // Método auxiliar para extraer valores de objetos anidados
  extractValue(obj, key) {
    if (!obj || typeof obj !== 'object') return null;
    
    if (obj[key] !== undefined) return obj[key];
    if (obj.data && obj.data[key] !== undefined) return obj.data[key];
    if (obj.datos && obj.datos[key] !== undefined) return obj.datos[key];
    if (obj.data && obj.data.datos && obj.data.datos[key] !== undefined) return obj.data.datos[key];
    
    return null;
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
    localStorage.removeItem('userId');
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
   * Obtiene el ID del usuario actual
   * @returns {string|number|null} - ID del usuario o null si no está disponible
   */
  getUserId() {
    // Primero intentar obtener el ID directamente
    const directId = localStorage.getItem('userId');
    if (directId) return directId;
    
    // Si no está disponible, intentar obtenerlo de los datos completos
    const userData = this.getUserData();
    return userData ? userData.id : null;
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