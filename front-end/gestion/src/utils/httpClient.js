import AuthService from '../services/authService';

// const API_URL = 'http://localhost:8080/api';
const API_URL = 'http://172.30.1.191:8080/api';

const handleErrorResponse = (response, url) => {
  if (!response.ok) {
    // Manejo específico para errores de autenticación
    if (response.status === 401 || response.status === 403) {
      // Si hay error de autenticación, podemos intentar renovar el token o redirigir al login
      console.error(`Error de autenticación al acceder a ${url}. Código: ${response.status}`);
      
      // Si estamos en un endpoint que no es login o registro, podemos intentar cerrar sesión
      if (!url.includes('/login') && !url.includes('/register')) {
        // AuthService.logout(); // Descomenta esto si quieres cerrar sesión automáticamente
      }
    }
    throw new Error(`Error en la solicitud a ${url}. Código: ${response.status}`);
  }
  return response;
};

const HttpClient = {
  get: async (url) => {
    try {
      const token = AuthService.getToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log(`GET ${url}: Usando token válido`);
      }
      
      const response = await fetch(`${API_URL}${url}`, {
        headers,
        // Cambiado de same-origin a include para permitir CORS con credenciales
        credentials: 'include',
        mode: 'cors'
      });
      
      await handleErrorResponse(response, url);
      return response.json();
    } catch (error) {
      console.error(`Error en GET ${url}:`, error);
      throw error;
    }
  },
  
  post: async (url, data) => {
    try {
      const token = AuthService.getToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Enviando solicitud con token:', token.substring(0, 15) + '...');
      } else {
        console.warn('No se encontró token para la solicitud a:', url);
      }
      
      console.log(`Enviando POST a ${API_URL}${url} con datos:`, data);
      
      const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        // Cambiado a include para permitir CORS con credenciales
        credentials: 'include',
        mode: 'cors'
      });
      
      // Si es un 403, vamos a mostrar más detalles para depuración
      if (response.status === 403) {
        console.error('Error 403 Forbidden. Detalles de la solicitud:');
        console.error('- URL:', `${API_URL}${url}`);
        console.error('- Headers:', headers);
        console.error('- Payload:', data);
        
        // Intenta renovar el token o verificar su validez
        if (AuthService.isAuthenticated()) {
          console.log('El token existe pero posiblemente ha expirado o no tiene permisos suficientes');
        }
      }
      
      await handleErrorResponse(response, url);
      const responseData = await response.json();
      console.log(`Respuesta del servidor para POST ${url}:`, responseData);
      return responseData;
    } catch (error) {
      console.error(`Error en POST ${url}:`, error);
      throw error;
    }
  },
  
  put: async (url, data) => {
    try {
      const token = AuthService.getToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
        // Cambiado a include para permitir CORS con credenciales
        credentials: 'include',
        mode: 'cors'
      });
      
      await handleErrorResponse(response, url);
      return response.json();
    } catch (error) {
      console.error(`Error en PUT ${url}:`, error);
      throw error;
    }
  },
  
  delete: async (url) => {
    try {
      const token = AuthService.getToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}${url}`, {
        method: 'DELETE',
        headers,
        // Cambiado a include para permitir CORS con credenciales
        credentials: 'include',
        mode: 'cors'
      });
      
      await handleErrorResponse(response, url);
      
      // DELETE puede devolver un 204 No Content
      if (response.status === 204) {
        return null;
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error en DELETE ${url}:`, error);
      throw error;
    }
  }
};

export default HttpClient;