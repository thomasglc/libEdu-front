import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Intercepteur pour ajouter le token JWT aux requêtes
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}) 