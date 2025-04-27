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
            const response = await HttpClient.get(`${APRENDIZ_CURSO_ENDPOINTS.GET_BY_ID(id)}`);
            return response;
        } catch (error) {
            console.error('Error en getAprendizCursoById:', error);
            throw error;
        }
    },

    // Crear una nueva relación/inscripción
    createAprendizCurso: async (aprendizCursoData) => {
        try {
            // Asegurar que los IDs sean números
            const datosFormateados = {
                id_aprendiz: parseInt(aprendizCursoData.id_aprendiz),
                id_curso: parseInt(aprendizCursoData.id_curso),
                fecha_inscripcion: aprendizCursoData.fecha_inscripcion
            };
            
            console.log('Enviando solicitud de inscripción con datos:', datosFormateados);
            console.log('Usando el endpoint de inscripción:', APRENDIZ_CURSO_ENDPOINTS.CREATE);
            
            // Verificar token antes de hacer la petición
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No hay token disponible para crear inscripción. La petición posiblemente sea rechazada.');
                throw new Error('No hay sesión activa. Por favor inicie sesión nuevamente.');
            }
            
            console.log('Token disponible para petición de inscripción:', token.substring(0, 15) + '...');
            
            // Enviar solicitud al backend
            const response = await HttpClient.post(APRENDIZ_CURSO_ENDPOINTS.CREATE, datosFormateados);
            console.log('Respuesta exitosa de inscripción:', response);
            return response;
        } catch (error) {
            console.error('Error en createAprendizCurso:', error);
            
            // Información detallada sobre el error para depuración
            if (error.message && error.message.includes('403')) {
                console.error('Error de permisos (403): No tienes autorización para inscribirte en este curso.');
                console.error('Verifica que tu cuenta tiene los permisos necesarios y que el curso está disponible.');
            }
            
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
            console.log('Obteniendo cursos para el aprendiz ID:', aprendizId);
            console.log('Endpoint utilizado:', APRENDIZ_CURSO_ENDPOINTS.GET_BY_APRENDIZ(aprendizId));
            const response = await HttpClient.get(APRENDIZ_CURSO_ENDPOINTS.GET_BY_APRENDIZ(aprendizId));
            return response.data || [];
        } catch (error) {
            console.error('Error en getCursosByAprendiz:', error);
            throw error;
        }
    }
};

export default AprendizCursoService;