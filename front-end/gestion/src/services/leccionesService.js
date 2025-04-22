const API_URL = 'http://localhost:8080';

const LeccionesService = {
    getAllLecciones: async () => {
        try {
            const response = await fetch(`${API_URL}/api/lecciones/obtener`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener las lecciones');
            }
            const responseData = await response.json();
            console.log('Respuesta lecciones:', responseData);
            return responseData;
        } catch (error) {
            console.error('Error en getAllLecciones:', error);
            throw error;
        }
    },

    // Obtener una lección por ID
    getLeccionById: async (id) => {
        const response = await fetch(`${API_URL}/api/lecciones/obtener/${id}`);
        if (!response.ok) throw new Error('Error al obtener la lección');
        return await response.json();
    },

    // Crear una nueva lección
    createLeccion: async (leccionData) => {
        const response = await fetch(`${API_URL}/api/lecciones/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leccionData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear la lección');
        }
        
        return await response.json();
    },

    // Actualizar una lección
    updateLeccion: async (id, leccionData) => {
        
        const response = await fetch(`${API_URL}/api/lecciones/Actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leccionData)
        });
        if (!response.ok) throw new Error('Error al actualizar la lección');
        return await response.json();
    },

    // Eliminar una lección
    deleteLeccion: async (id) => {
        const response = await fetch(`${API_URL}/api/lecciones/Eliminar/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la lección');
        return true;
    }
};

export default LeccionesService;