import HttpClient from '../utils/httpClient';
import { APRENDIZ_CURSO_ENDPOINTS } from '../config/apiConfig';
const AprendizCursoService = {
    // Obtener todas las relaciones aprendiz-curso
    getAllAprendizCursos: async () => {
        try {
            const response = await HttpClient.get(APRENDIZ_CURSO_ENDPOINTS.GET_ALL);
            return response;
        } catch (error) {
            console.error('Error en getAllAprendizCursos:', error);
            throw error;
        }
    },

    // Obtener una relación por ID
    getAprendizCursoById: async (id) => {
        try {
            const response = await HttpClient.get(`${APRENDIZ_CURSO_ENDPOINTS.GET_BY_ID}/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getAprendizCursoById:', error);
            throw error;
        }
    },

    // Crear una nueva relación
    createAprendizCurso: async (aprendizCursoData) => {
        try {
            const response = await HttpClient.post(APRENDIZ_CURSO_ENDPOINTS.CREATE, aprendizCursoData);
            return response;
        } catch (error) {
            console.error('Error en createAprendizCurso:', error);
            throw error;
        }
    },

    // Actualizar una relación
    updateAprendizCurso: async (id, aprendizCursoData) => {
        try {
            const response = await HttpClient.put(APRENDIZ_CURSO_ENDPOINTS.UPDATE(id), aprendizCursoData);
            return response;
        } catch (error) {
            console.error('Error en updateAprendizCurso:', error);
            throw error;
        }
    },

    // Eliminar una relación
    deleteAprendizCurso: async (id) => {
        try {
            await HttpClient.delete(APRENDIZ_CURSO_ENDPOINTS.DELETE(id));
            return true;
        } catch (error) {
            console.error('Error en deleteAprendizCurso:', error);
            throw error;
        }
    },

    // Obtener cursos por aprendiz
    getCursosByAprendiz: async (aprendizId) => {
        try {
            const response = await HttpClient.get(`${APRENDIZ_CURSO_ENDPOINTS.GET_CURSOS_BY_APRENDIZ}/${aprendizId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error en getCursosByAprendiz:', error);
            throw error;
        }
    }
};

export default AprendizCursoService;