const API_URL = 'http://172.30.5.207:8080';

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

    // Verificar credenciales de aprendiz
    verifyCredentials: async (documento, tipoUsuario) => {
        try {
            // Buscamos entre todos los aprendices
            const aprendices = await AprendizService.getAllAprendices();
            
            // Convertimos documento a número (eliminar comas si las hay)
            const documentoNum = parseInt(documento.replace(/,/g, ''));
            
            // Buscamos el aprendiz con el documento proporcionado
            const aprendiz = aprendices.find(a => a.numeroDocumento === documentoNum);
            
            // Si no se encuentra el aprendiz
            if (!aprendiz) {
                throw new Error('Documento no encontrado');
            }
            
            console.log('Aprendiz encontrado:', aprendiz);
            console.log('Tipo usuario en BD:', aprendiz.tipoUsuario);
            console.log('Tipo usuario seleccionado:', tipoUsuario);
            
            // Verificamos el tipo de usuario
            // tipoUsuario en la UI: '1' es Administrador, '2' es Aprendiz
            // En el modelo: 0 es Administrador, 1 es Aprendiz
            
            // Si el usuario es admin (0) en BD pero intenta entrar como aprendiz ('2')
            if (aprendiz.tipoUsuario === 0 && tipoUsuario === '2') {
                throw new Error('Tipo de usuario incorrecto');
            }
            
            // Si el usuario es aprendiz (1) en BD pero intenta entrar como admin ('1')
            if (aprendiz.tipoUsuario === 1 && tipoUsuario === '1') {
                throw new Error('Tipo de usuario incorrecto');
            }
            
            return aprendiz;
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