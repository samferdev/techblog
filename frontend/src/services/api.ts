import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000', // URL do seu NestJS
});

// Interceptor para injetar o Token automaticamente em todas as rotas
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@DevBlog:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});