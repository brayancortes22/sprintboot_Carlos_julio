import HttpClient from '../utils/httpClient';
import { CURSOS_ENDPOINTS } from '../config/apiConfig';

const CursosService = {
  // Obtener todos los cursos
  getAllCursos: async () => {
    try {
      console.log('Llamando a getAllCursos desde el servicio');
      const response = await HttpClient.get(CURSOS_ENDPOINTS.GET_ALL);
      console.log('Respuesta completa de getAllCursos:', response);
      
      // Manejar diferentes posibles estructuras de respuesta
      if (response && response.data) {
        return response.data;
      } else if (Array.isArray(response)) {
        return response;
      } else if (response && response.codigo === 200 && response.datos) {
        return response.datos;
      }
      
      console.warn('Estructura de respuesta no reconocida en getAllCursos:', response);
      return [];
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
      throw error;
    }
  },

  // Obtener un curso por ID
  getCursoById: async (id) => {
    try {
      const response = await HttpClient.get(CURSOS_ENDPOINTS.GET_BY_ID(id));
      return response.data || response;
    } catch (error) {
      console.error(`Error al obtener el curso con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo curso
  createCurso: async (cursoData) => {
    try {
      const response = await HttpClient.post(CURSOS_ENDPOINTS.CREATE, cursoData);
      return response.data || response;
    } catch (error) {
      console.error('Error al crear el curso:', error);
      throw error;
    }
  },

  // Actualizar un curso existente
  updateCurso: async (id, cursoData) => {
    try {
      const response = await HttpClient.put(CURSOS_ENDPOINTS.UPDATE(id), cursoData);
      return response.data || response;
    } catch (error) {
      console.error(`Error al actualizar el curso con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un curso
  deleteCurso: async (id) => {
    try {
      const response = await HttpClient.delete(CURSOS_ENDPOINTS.DELETE(id));
      return response.data || response;
    } catch (error) {
      console.error(`Error al eliminar el curso con ID ${id}:`, error);
      throw error;
    }
  }
};

export default CursosService;