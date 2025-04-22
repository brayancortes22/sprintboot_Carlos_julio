//const API_URL = 'http://172.30.5.207:8080';
const API_URL = 'http://localhost:8080';

const AprendizCursoService = {
    // Obtener todas las relaciones aprendiz-curso
    getAllAprendizCursos: async () => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso`);
            if (!response.ok) throw new Error('Error al obtener relaciones aprendiz-curso');
            return await response.json();
        } catch (error) {
            console.error('Error en getAllAprendizCursos:', error);
            throw error;
        }
    },

    // Obtener una relación por ID
    getAprendizCursoById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso/${id}`);
            if (!response.ok) throw new Error('Error al obtener la relación');
            return await response.json();
        } catch (error) {
            console.error('Error en getAprendizCursoById:', error);
            throw error;
        }
    },

    // Crear una nueva relación
    createAprendizCurso: async (aprendizCursoData) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizCursoData)
            });
            if (!response.ok) throw new Error('Error al crear la relación');
            return await response.json();
        } catch (error) {
            console.error('Error en createAprendizCurso:', error);
            throw error;
        }
    },

    // Actualizar una relación
    updateAprendizCurso: async (id, aprendizCursoData) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizCursoData)
            });
            if (!response.ok) throw new Error('Error al actualizar la relación');
            return await response.json();
        } catch (error) {
            console.error('Error en updateAprendizCurso:', error);
            throw error;
        }
    },

    // Eliminar una relación
    deleteAprendizCurso: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la relación');
            return true;
        } catch (error) {
            console.error('Error en deleteAprendizCurso:', error);
            throw error;
        }
    },

    // Obtener cursos por aprendiz
    getCursosByAprendiz: async (aprendizId) => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso/aprendiz/${aprendizId}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener los cursos del aprendiz');
            }
            const responseData = await response.json();
            return responseData.data || [];
        } catch (error) {
            console.error('Error en getCursosByAprendiz:', error);
            throw error;
        }
    }
};

export default AprendizCursoService;