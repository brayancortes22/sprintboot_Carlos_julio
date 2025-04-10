const API_URL = 'http://localhost:8080';

const LeccionesService = {
    // Obtener todas las lecciones
    getAllLecciones: async () => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones`);
            if (!response.ok) throw new Error('Error al obtener lecciones');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Obtener una lección por ID
    getLeccionById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones/${id}`);
            if (!response.ok) throw new Error('Error al obtener la lección');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Crear una nueva lección
    createLeccion: async (leccionData) => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leccionData)
            });
            if (!response.ok) throw new Error('Error al crear la lección');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Actualizar una lección
    updateLeccion: async (id, leccionData) => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leccionData)
            });
            if (!response.ok) throw new Error('Error al actualizar la lección');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    // Eliminar una lección
    deleteLeccion: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la lección');
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default LeccionesService; 