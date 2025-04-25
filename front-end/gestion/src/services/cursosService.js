import HttpClient from '../utils/httpClient';

const CursosService = {
    getAllCursos: async () => {
        try {
            console.log('Solicitando cursos al servidor...');
            // Notar que usamos la ruta /cursos sin /api porque HttpClient ya incluye el prefijo /api
            const response = await HttpClient.get('/cursos');
            console.log('Respuesta completa del servidor:', response);
            
            // Verificar si la respuesta tiene la estructura correcta de la respuesta genérica
            if (response && typeof response === 'object' && response.data) {
                console.log('Datos encontrados en response.data:', response.data);
                return response.data;
            } 
            // Si la respuesta es un array directamente
            else if (response && Array.isArray(response)) {
                console.log('Respuesta es array directamente:', response);
                return response;
            } 
            // Si no hay datos válidos
            else {
                console.warn('Formato de respuesta inesperado:', response);
                return [];
            }
        } catch (error) {
            console.error('Error en getAllCursos:', error);
            throw error;
        }
    },

    // Obtener un curso por ID
    getCursoById: async (id) => {
        try {
            const response = await HttpClient.get(`/cursos/${id}`);
            // Si la respuesta tiene estructura de respuesta genérica
            if (response && typeof response === 'object' && response.data) {
                return response.data;
            }
            return response;
        } catch (error) {
            console.error('Error en getCursoById:', error);
            throw error;
        }
    },

    // Crear un nuevo curso
    createCurso: async (cursoData) => {
        try {
            const response = await HttpClient.post('/cursos', cursoData);
            if (response && typeof response === 'object' && response.data) {
                return response.data;
            }
            return response;
        } catch (error) {
            console.error('Error en createCurso:', error);
            throw error;
        }
    },

    // Actualizar un curso
    updateCurso: async (id, cursoData) => {
        try {
            const response = await HttpClient.put(`/cursos/${id}`, cursoData);
            if (response && typeof response === 'object' && response.data) {
                return response.data;
            }
            return response;
        } catch (error) {
            console.error('Error en updateCurso:', error);
            throw error;
        }
    },

    // Eliminar un curso
    deleteCurso: async (id) => {
        try {
            const response = await HttpClient.delete(`/cursos/${id}`);
            return response;
        } catch (error) {
            console.error('Error en deleteCurso:', error);
            throw error;
        }
    }
};

export default CursosService;