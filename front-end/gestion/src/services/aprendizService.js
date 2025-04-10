const API_URL = 'http://localhost:8080';

const AprendizService = {
    // Obtener todos los aprendices
    getAllAprendices: async () => {
        try {
            const response = await fetch(`${API_URL}/aprendiz`);
            if (!response.ok) throw new Error('Error al obtener aprendices');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Obtener un aprendiz por ID
    getAprendizById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/aprendiz/${id}`);
            if (!response.ok) throw new Error('Error al obtener el aprendiz');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Crear un nuevo aprendiz
    createAprendiz: async (aprendizData) => {
        try {
            const response = await fetch(`${API_URL}/aprendiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizData)
            });
            if (!response.ok) throw new Error('Error al crear el aprendiz');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Actualizar un aprendiz
    updateAprendiz: async (id, aprendizData) => {
        try {
            const response = await fetch(`${API_URL}/aprendiz/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aprendizData)
            });
            if (!response.ok) throw new Error('Error al actualizar el aprendiz');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un aprendiz
    deleteAprendiz: async (id) => {
        try {
            const response = await fetch(`${API_URL}/aprendiz/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el aprendiz');
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default AprendizService; 