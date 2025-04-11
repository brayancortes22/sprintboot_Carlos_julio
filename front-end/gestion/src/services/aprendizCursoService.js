const API_URL = 'http://172.30.5.207:8080';

const AprendizCursoService = {
    // Obtener todas las relaciones aprendiz-curso
    getAllAprendizCursos: async () => {
        try {
            const response = await fetch(`${API_URL}/api/aprendiz-curso`);
            if (!response.ok) throw new Error('Error al obtener relaciones aprendiz-curso');
            return await response.json();
        } catch (error) {
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
            throw error;
        }
    }
};

export default AprendizCursoService; 