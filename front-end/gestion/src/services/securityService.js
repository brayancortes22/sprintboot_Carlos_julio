/**
 * Servicio para gestionar el bloqueo de seguridad por uso de herramientas de desarrollo
 */

// const API_URL = 'http://localhost:8080/api/security';
// const API_URL = 'http://172.30.5.207:8080/api/security';
const API_URL = 'http://192.168.1.3:8080/api/security';

export const SecurityService = {
  /**
   * Reporta el uso de herramientas de desarrollo y bloquea al usuario
   */
  blockDevToolsUser: async () => {
    try {
      const response = await fetch(`${API_URL}/block-devtools`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
      return { status: 500, message: 'Error al comunicarse con el servidor' };
    }
  },

  /**
   * Verifica si el usuario actual está bloqueado
   */
  checkIfBlocked: async () => {
    try {
      const response = await fetch(`${API_URL}/check-blocked`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
        console.error('Error al verificar bloqueo:', error);
      // En caso de error, asumimos que el usuario no está bloqueado
      return { status: 200, message: 'Error al verificar bloqueo', data: false };
    }
  }
};