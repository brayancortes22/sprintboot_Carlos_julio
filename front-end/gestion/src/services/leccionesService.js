// const API_URL = 'http://172.30.5.207:8080';
const API_URL = 'http://localhost:8080';

const LeccionesService = {
    // Obtener todas las lecciones
    getAllLecciones: async () => {
        const response = await fetch(`${API_URL}/api/lecciones`);
        if (!response.ok) throw new Error('Error al obtener lecciones');
        return await response.json();
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