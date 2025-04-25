/**
 * Configuración centralizada de las URLs de la API
 * Todas las rutas de la API deben estar definidas aquí para facilitar su mantenimiento
 */

// URL base de la API
export const API_URL = ''; // nula porque la manda el backend

// Endpoints de autenticación
export const AUTH_ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`
};

// Endpoints para cursos
export const CURSOS_ENDPOINTS = {
    GET_ALL: `${API_URL}/cursos`,
    GET_BY_ID: (id) => `${API_URL}/cursos/${id}`,
    CREATE: `${API_URL}/cursos`,
    UPDATE: (id) => `${API_URL}/cursos/actualizar/${id}`,
    DELETE: (id) => `${API_URL}/cursos/eliminar/${id}`
};

// Endpoints para aprendices
export const APRENDIZ_ENDPOINTS = {
    GET_ALL: `${API_URL}/aprendiz/obtener`,
    GET_BY_ID: (id) => `${API_URL}/aprendiz/obtener/${id}`,
    CREATE: `${API_URL}/aprendiz/create`,
    UPDATE: (id) => `${API_URL}/aprendiz/actualizar/${id}`,
    DELETE: (id) => `${API_URL}/aprendiz/eliminar/${id}`
};

// Endpoints para la relación aprendiz-curso
export const APRENDIZ_CURSO_ENDPOINTS = {
    GET_ALL: `${API_URL}/aprendices-cursos/obtener`,
    GET_BY_ID: (id) => `${API_URL}/aprendices-cursos/obtener/${id}`,
    GET_BY_APRENDIZ: (id) => `${API_URL}/aprendices-cursos/aprendiz/${id}`,
    GET_BY_CURSO: (id) => `${API_URL}/aprendices-cursos/curso/${id}`,
    CREATE: `${API_URL}/aprendices-cursos/create`,
    UPDATE: (id) => `${API_URL}/aprendices-cursos/actualizar/${id}`,
    DELETE: (id) => `${API_URL}/aprendices-cursos/eliminar/${id}`
};

// Endpoints para lecciones
export const LECCIONES_ENDPOINTS = {
    GET_ALL: `${API_URL}/lecciones/obtener`,
    GET_BY_ID: (id) => `${API_URL}/lecciones/obtener/${id}`,
    GET_BY_CURSO: (id) => `${API_URL}/lecciones/curso/${id}`,
    CREATE: `${API_URL}/lecciones/create`,
    UPDATE: (id) => `${API_URL}/lecciones/actualizar/${id}`,
    DELETE: (id) => `${API_URL}/lecciones/eliminar/${id}`
};

// Endpoints para certificados
export const CERTIFICADOS_ENDPOINTS = {
    GET_ALL: `${API_URL}/certificados/obtener`,
    GET_BY_ID: (id) => `${API_URL}/certificados/obtener/${id}`,
    GET_BY_APRENDIZ: (id) => `${API_URL}/certificados/aprendiz/${id}`,
    CREATE: `${API_URL}/certificados/create`,
    UPDATE: (id) => `${API_URL}/certificados/actualizar/${id}`,
    DELETE: (id) => `${API_URL}/certificados/eliminar/${id}`
};