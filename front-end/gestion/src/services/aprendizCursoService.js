import HttpClient from '../utils/httpClient';

const AprendizCursoService = {
    // Obtener todas las relaciones aprendiz-curso
    getAllAprendizCursos: async () => {
        try {
            const response = await HttpClient.get('/api/aprendiz-curso');
            return response;
        } catch (error) {
            console.error('Error en getAllAprendizCursos:', error);
            throw error;
        }
    },

    // Obtener una relación por ID
    getAprendizCursoById: async (id) => {
        try {
            const response = await HttpClient.get(`/api/aprendiz-curso/${id}`);
            return response;
        } catch (error) {
            console.error('Error en getAprendizCursoById:', error);
            throw error;
        }
    },

    // Crear una nueva relación
    createAprendizCurso: async (aprendizCursoData) => {
        try {
            const response = await HttpClient.post('/api/aprendiz-curso', aprendizCursoData);
            return response;
        } catch (error) {
            console.error('Error en createAprendizCurso:', error);
            throw error;
        }
    },

    // Actualizar una relación
    updateAprendizCurso: async (id, aprendizCursoData) => {
        try {
            const response = await HttpClient.put(`/api/aprendiz-curso/${id}`, aprendizCursoData);
            return response;
        } catch (error) {
            console.error('Error en updateAprendizCurso:', error);
            throw error;
        }
    },

    // Eliminar una relación
    deleteAprendizCurso: async (id) => {
        try {
            await HttpClient.delete(`/api/aprendiz-curso/${id}`);
            return true;
        } catch (error) {
            console.error('Error en deleteAprendizCurso:', error);
            throw error;
        }
    },

    // Obtener cursos por aprendiz
    getCursosByAprendiz: async (aprendizId) => {
        try {
            const response = await HttpClient.get(`/api/aprendiz-curso/aprendiz/${aprendizId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error en getCursosByAprendiz:', error);
            throw error;
        }
    }
};

export default AprendizCursoService;