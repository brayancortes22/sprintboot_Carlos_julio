const API_URL = 'http://localhost:8080';

const CursosService = {
    getAllCursos: async () => {
        try {
            const response = await fetch(`${API_URL}/api/cursos`);
            if (!response.ok) {
                throw new Error('Error al obtener los cursos');
            }
            const responseData = await response.json();
            
            // Verificar si la respuesta tiene la estructura esperada
            if (responseData && responseData.data) {
                console.log('Datos de cursos recibidos:', responseData.data);
                return responseData.data;
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
            const response = await fetch(`${API_URL}/api/cursos/${id}`);
            if (!response.ok) throw new Error('Error al obtener el curso');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Crear un nuevo curso
    createCurso: async (cursoData) => {
        try {
            const response = await fetch(`${API_URL}/api/cursos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoData)
            });
            if (!response.ok) throw new Error('Error al crear el curso');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Actualizar un curso
    updateCurso: async (id, cursoData) => {
        try {
            const response = await fetch(`${API_URL}/api/cursos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cursoData)
            });
            if (!response.ok) throw new Error('Error al actualizar el curso');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    // Eliminar un curso
    deleteCurso: async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/cursos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el curso');
            return true;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};

export default CursosService;