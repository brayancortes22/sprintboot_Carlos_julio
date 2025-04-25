import HttpClient from '../utils/httpClient';
import { LECCIONES_ENDPOINTS } from '../config/apiConfig';

const LeccionesService = {
  // Obtener todas las lecciones
  getAllLecciones: async () => {
    try {
      const response = await HttpClient.get(LECCIONES_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las lecciones:', error);
      throw error;
    }
  },

  // Obtener una lección por ID
  getLeccionById: async (id) => {
    try {
      const response = await HttpClient.get(LECCIONES_ENDPOINTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la lección con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva lección
  createLeccion: async (leccionData) => {
    try {
      const response = await HttpClient.post(LECCIONES_ENDPOINTS.CREATE, leccionData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la lección:', error);
      throw error;
    }
  },

  // Actualizar una lección existente
  updateLeccion: async (id, leccionData) => {
    try {
      const response = await HttpClient.put(LECCIONES_ENDPOINTS.UPDATE(id), leccionData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la lección con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una lección
  deleteLeccion: async (id) => {
    try {
      const response = await HttpClient.delete(LECCIONES_ENDPOINTS.DELETE(id));
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la lección con ID ${id}:`, error);
      throw error;
    }
  }
};

export default LeccionesService;