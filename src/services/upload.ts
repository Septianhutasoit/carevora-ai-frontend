import api from '../lib/axios';

export const uploadService = {
    // Mengirim file PDF CV ke backend NestJS menggunakan Multipart Form-Data
    async uploadCv(file: File): Promise<{ message: string; extractedSkills: string[] }> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/uploads/cv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};