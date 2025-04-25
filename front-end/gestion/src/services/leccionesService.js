import httpClient from '../utils/httpClient';
import AuthService from './authService';

const BASE_URL = '/lecciones';

const LeccionesService = {
  getAllLecciones: async () => {
    try {
      const response = await httpClient.get(`${BASE_URL}/obtener`);
      return response;
    } catch (error) {
      console.error('Error al obtener lecciones:', error);
      throw error;
    }
  },

  getLeccionById: async (id) => {
    try {
      const response = await httpClient.get(`${BASE_URL}/obtener/${id}`);
      return response;
    } catch (error) {
      console.error(`Error al obtener lección con ID ${id}:`, error);
      throw error;
    }
  },

  createLeccion: async (leccionData) => {
    try {
      console.log('Enviando datos de lección:', leccionData);
      
      // Verificar que exista el token de autenticación
      const token = AuthService.getToken();
      if (!token) {
        console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
        throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
      }
      
      // Mapear los datos para que coincidan con lo que espera el backend
      const mappedData = {
        nombre_leccion: leccionData.nombre_leccion,
        ruta_leccion: leccionData.ruta_leccion,
        descripcion: leccionData.descripcion,
        id_curso: leccionData.id_curso
      };
      
      console.log('Datos mapeados que se enviarán al backend:', mappedData);
      
      const response = await httpClient.post(`${BASE_URL}/create`, mappedData);
      return response;
    } catch (error) {
      console.error('Error al crear lección:', error);
      throw error;
    }
  },

  updateLeccion: async (id, leccionData) => {
    try {
      // Verificar que exista el token de autenticación
      const token = AuthService.getToken();
      if (!token) {
        console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
        throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
      }
      
      const response = await httpClient.put(`${BASE_URL}/actualizar/${id}`, leccionData);
      return response;
    } catch (error) {
      console.error(`Error al actualizar lección con ID ${id}:`, error);
      throw error;
    }
  },

  deleteLeccion: async (id) => {
    try {
      // Verificar que exista el token de autenticación
      const token = AuthService.getToken();
      if (!token) {
        console.warn('No se encontró token de autenticación. La solicitud puede ser rechazada.');
        throw new Error('No hay una sesión activa. Por favor inicie sesión nuevamente.');
      }
      
      const response = await httpClient.delete(`${BASE_URL}/eliminar/${id}`);
      return response;
    } catch (error) {
      console.error(`Error al eliminar lección con ID ${id}:`, error);
      throw error;
    }
  },

  getLeccionesByCursoId: async (cursoId) => {
    try {
      const response = await httpClient.get(`${BASE_URL}/curso/${cursoId}`);
      return response;
    } catch (error) {
      console.error(`Error al obtener lecciones para el curso con ID ${cursoId}:`, error);
      throw error;
    }
  }
};

export default LeccionesService;