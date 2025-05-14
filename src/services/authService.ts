import { apiClient } from '../config/api'
import type { LoginResponse, LoginCredentials } from '../types/auth'

export class AuthService {
    static async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const formData = new FormData()
        formData.append('identifier', credentials.identifier)
        formData.append('password', credentials.password)

        const { data } = await apiClient.post<LoginResponse>('/api/auth/local', formData)
        return data
    }

    static async logout(): Promise<void> {
        localStorage.removeItem('jwt')
        // Ajoutez ici d'autres actions de nettoyage si nécessaire
    }
} 