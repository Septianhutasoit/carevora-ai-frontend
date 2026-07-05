// src/services/skill.ts
import api from '@/lib/axios';
import { Skill } from '@/types';

export const skillService = {
    // Ambil semua daftar master skill yang tersedia di database
    async getAllSkills(): Promise<Skill[]> {
        const response = await api.get<Skill[]>('/skills');
        return response.data;
    },

    // Ambil daftar skill yang sudah dimiliki oleh user saat ini
    async getUserSkills(): Promise<Skill[]> {
        const response = await api.get<Skill[]>('/users/skills');
        return response.data;
    },

    // Update atau simpan daftar skill baru pilihan user
    async saveUserSkills(skillIds: string[]): Promise<void> {
        await api.post('/users/skills', { skillIds });
    }
};