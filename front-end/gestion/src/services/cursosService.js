const API_URL = 'http://localhost:8080';

const CursosService = {
    // Obtener todos los cursos
    getAllCursos: async () => {
        try {
            const response = await fetch(`${API_URL}/cursos`);
            if (!response.ok) throw new Error('Error al obtener cursos');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Obtener un curso por ID
    getCursoById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/cursos/${id}`);
            if (!response.ok) throw new Error('Error al obtener el curso');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Crear un nuevo curso
    createCurso: async (cursoData) => {
        try {
            const response = await fetch(`${API_URL}/cursos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoData)
            });
            if (!response.ok) throw new Error('Error al crear el curso');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Actualizar un curso
    updateCurso: async (id, cursoData) => {
        try {
            const response = await fetch(`${API_URL}/cursos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoData)
            });
            if (!response.ok) throw new Error('Error al actualizar el curso');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un curso
    deleteCurso: async (id) => {
        try {
            const response = await fetch(`${API_URL}/cursos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el curso');
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default CursosService; 