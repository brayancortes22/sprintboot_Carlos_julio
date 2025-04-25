// Utilidad para manejar solicitudes HTTP con JWT
import AuthService from '../services/authService';

// URL base de la API
const API_URL = 'http://localhost:8080';

export const HttpClient = {
    // Método GET con JWT
    get: async (endpoint) => {
        const token = AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error en la solicitud GET a ${endpoint}`);
        }
        
        return await response.json();
    },
    
    // Método POST con JWT
    post: async (endpoint, data) => {
        const token = AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error en la solicitud POST a ${endpoint}`);
        }
        
        return await response.json();
    },
    
    // Método PUT con JWT
    put: async (endpoint, data) => {
        const token = AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error en la solicitud PUT a ${endpoint}`);
        }
        
        return await response.json();
    },
    
    // Método DELETE con JWT
    delete: async (endpoint) => {
        const token = AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error en la solicitud DELETE a ${endpoint}`);
        }
        
        // Para métodos DELETE que no devuelven contenido
        if (response.status === 204) {
            return true;
        }
        
        return await response.json();
    }
};

export default HttpClient;