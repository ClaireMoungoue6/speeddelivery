    import axios from 'axios';

    const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    });

    // Ajoute automatiquement le token JWT à chaque requête
    API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });

    export const register = (data) => API.post('/auth/register', data);
    export const login = (data) => API.post('/auth/login', data);
    export const getProfile = () => API.get('/auth/profile');

    export default API;