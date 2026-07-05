// src/services/auth.ts
import api from '@/lib/axios';
import { AuthResponse, User } from '@/types';

export const authService = {
    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', { name, email, password });
        return response.data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', { email, password });
        return response.data;
    },

    async getProfile(): Promise<User> {
        const response = await api.get<User>('/users/profile');
        return response.data;
    }
};