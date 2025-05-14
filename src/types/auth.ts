import type { User } from './user'

export interface LoginResponse {
    jwt: string
    user: User
}

export interface LoginCredentials {
    identifier: string
    password: string
} 