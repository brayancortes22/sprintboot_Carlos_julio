import AuthService from '../services/authService';

/**
 * Utilidad para gestionar la seguridad en la aplicación
 */
const SecurityUtils = {
  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} verdadero si el usuario está autenticado
   */
  isAuthenticated: () => {
    return AuthService.isAuthenticated();
  },

  /**
   * Verifica si el usuario tiene el rol especificado
   * @param {number} role - Rol a verificar (1: Admin, 2: Aprendiz)
   * @returns {boolean} verdadero si el usuario tiene el rol especificado
   */
  hasRole: (role) => {
    if (!AuthService.isAuthenticated()) {
      return false;
    }

    const userData = AuthService.getUserData();
    return userData && userData.tipoUsuario === role;
  },

  /**
   * Verifica si el usuario es administrador
   * @returns {boolean} verdadero si el usuario es administrador
   */
  isAdmin: () => {
    return SecurityUtils.hasRole(1);
  },

  /**
   * Verifica si el usuario es aprendiz
   * @returns {boolean} verdadero si el usuario es aprendiz
   */
  isAprendiz: () => {
    return SecurityUtils.hasRole(2);
  },

  /**
   * Obtiene el ID del usuario autenticado
   * @returns {number|null} ID del usuario o null si no está autenticado
   */
  getUserId: () => {
    if (!AuthService.isAuthenticated()) {
      return null;
    }

    const userData = AuthService.getUserData();
    return userData ? userData.id : null;
  },

  /**
   * Obtiene el nombre del usuario autenticado
   * @returns {string|null} Nombre del usuario o null si no está autenticado
   */
  getUserName: () => {
    if (!AuthService.isAuthenticated()) {
      return null;
    }

    const userData = AuthService.getUserData();
    return userData ? userData.nombre : null;
  }
};

export default SecurityUtils;