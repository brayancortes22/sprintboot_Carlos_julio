import HttpClient from '../utils/httpClient';

const CursosService = {
    getAllCursos: async () => {
        try {
            const response = await HttpClient.get('/api/cursos');
            
            // Verificar si la respuesta tiene la estructura esperada
            if (response.data) {
                console.log('Datos de cursos recibidos:', response.data);
                return response.data;
            }
            
            return [];
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Obtener un curso por ID
    getCursoById: async (id) => {
        try {
            const response = await HttpClient.get(`/api/cursos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Crear un nuevo curso
    createCurso: async (cursoData) => {
        try {
            const response = await HttpClient.post('/api/cursos', cursoData);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Actualizar un curso
    updateCurso: async (id, cursoData) => {
        try {
            const response = await HttpClient.put(`/api/cursos/${id}`, cursoData);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Eliminar un curso
    deleteCurso: async (id) => {
        try {
            await HttpClient.delete(`/api/cursos/${id}`);
            return true;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};

export default CursosService;