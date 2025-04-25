import AuthService from '../services/authService';

/**
 * Inicializa las protecciones de seguridad de la aplicación
 * Esta función se llama una vez al iniciar la aplicación
 */
export function initializeSecurityProtection() {
  // Verificar token al inicio
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Validar que el token no ha expirado
      const isValid = AuthService.isAuthenticated();
      if (!isValid) {
        // Si el token ha expirado, limpiar el almacenamiento
        AuthService.logout();
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      AuthService.logout();
    }
  }

  // Impedir depuración del sitio en producción
  if (process.env.NODE_ENV === 'production') {
    // Deshabilitar devtools en producción
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Impedir inspección de elementos
    document.addEventListener('keydown', (e) => {
      if (
        // Combinaciones para DevTools
        (e.keyCode === 123) || // F12
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I o Cmd+Shift+I
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C o Cmd+Shift+C
        ((e.ctrlKey || e.metaKey) && e.keyCode === 85) // Ctrl+U o Cmd+U
      ) {
        e.preventDefault();
        return false;
      }
    });
  }
}

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