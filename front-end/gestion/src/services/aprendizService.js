import HttpClient from '../utils/httpClient';
import { APRENDIZ_ENDPOINTS } from '../config/apiConfig';

const AprendizService = {
  // Obtener todos los aprendices
  getAllAprendices: async () => {
    try {
      const response = await HttpClient.get(APRENDIZ_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los aprendices:', error);
      throw error;
    }
  },

  // Obtener un aprendiz por ID
  getAprendizById: async (id) => {
    try {
      const response = await HttpClient.get(APRENDIZ_ENDPOINTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el aprendiz con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo aprendiz
  createAprendiz: async (aprendizData) => {
    try {
      const response = await HttpClient.post(APRENDIZ_ENDPOINTS.CREATE, aprendizData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el aprendiz:', error);
      throw error;
    }
  },

  // Actualizar un aprendiz existente
  updateAprendiz: async (id, aprendizData) => {
    try {
      const response = await HttpClient.put(APRENDIZ_ENDPOINTS.UPDATE(id), aprendizData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el aprendiz con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un aprendiz
  deleteAprendiz: async (id) => {
    try {
      const response = await HttpClient.delete(APRENDIZ_ENDPOINTS.DELETE(id));
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el aprendiz con ID ${id}:`, error);
      throw error;
    }
  }
};

export default AprendizService;