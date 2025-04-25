import HttpClient from '../utils/httpClient';

const LeccionesService = {
    getAllLecciones: async () => {
        try {
            const response = await HttpClient.get('/api/lecciones/obtener');
            console.log('Respuesta lecciones:', response);
            return response;
        } catch (error) {
            console.error('Error en getAllLecciones:', error);
            throw error;
        }
    },

    // Obtener una lección por ID
    getLeccionById: async (id) => {
        try {
            return await HttpClient.get(`/api/lecciones/obtener/${id}`);
        } catch (error) {
            console.error('Error en getLeccionById:', error);
            throw error;
        }
    },

    // Crear una nueva lección
    createLeccion: async (leccionData) => {
        try {
            return await HttpClient.post('/api/lecciones/create', leccionData);
        } catch (error) {
            console.error('Error en createLeccion:', error);
            throw error;
        }
    },

    // Actualizar una lección
    updateLeccion: async (id, leccionData) => {
        try {
            return await HttpClient.put(`/api/lecciones/actualizar/${id}`, leccionData);
        } catch (error) {
            console.error('Error en updateLeccion:', error);
            throw error;
        }
    },

    // Eliminar una lección
    deleteLeccion: async (id) => {
        try {
            await HttpClient.delete(`/api/lecciones/eliminar/${id}`);
            return true;
        } catch (error) {
            console.error('Error en deleteLeccion:', error);
            throw error;
        }
    }
};

export default LeccionesService;