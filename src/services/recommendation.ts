// src/services/recommendation.ts
import api from '@/lib/axios';
import { RecommendationResult } from '@/types';

export const recommendationService = {
    // Panggil endpoint backend untuk mendapatkan hasil analisis kecocokan karier
    async getRecommendations(): Promise<RecommendationResult[]> {
        const response = await api.get<RecommendationResult[]>('/recommendations');
        return response.data;
    }
};