// src/app/(dashboard)/recommendation/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { recommendationService } from '../../../services/recommendation';
import { RecommendationResult } from '../../../types';
import Link from 'next/link';

export default function RecommendationPage() {
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const data = await recommendationService.getRecommendations();
                setRecommendations(data);
            } catch (error) {
                console.error('Gagal mengambil rekomendasi AI:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Skenario jika pengguna belum memilih skill apa pun di menu Kelola Skill
    if (recommendations.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100 space-y-4">
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full inline-flex">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Belum Ada Skill yang Dipilih</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Sistem AI memerlukan data keahlian Anda untuk melakukan perhitungan kecocokan karier. Silakan pilih skill Anda terlebih dahulu.
                </p>
                <div className="pt-4">
                    <Link href="/skills" className="px-6 py-2.5 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                        Kelola Skill Sekarang
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Halaman */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analisis Rekomendasi Karier AI</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Model AI (BGE-small) membandingkan vektor keahlian Anda dengan standar industri menggunakan perhitungan Cosine Similarity.
                </p>
            </div>

            {/* Grid Hasil Kartu Rekomendasi */}
            <div className="space-y-6">
                {recommendations.map((rec) => {
                    // Mengonversi skor matematika (misal: 0.8567) menjadi persentase bulat (86%)
                    const matchPercentage = (rec.score * 100).toFixed(0);

                    return (
                        <div key={rec.careerId} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start gap-6">

                            {/* Kolom Persentase Kecocokan di Kiri */}
                            <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg w-full md:w-32 shrink-0">
                                <span className="text-sm font-bold text-green-700 uppercase tracking-wider">Kecocokan</span>
                                <span className="text-3xl font-extrabold text-green-600 mt-1">{matchPercentage}%</span>
                            </div>

                            {/* Kolom Informasi Karier & Gap Analysis di Kanan */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{rec.careerTitle}</h3>
                                    <p className="text-xs text-gray-400 mt-1">ID Karier: {rec.careerId}</p>
                                </div>

                                {/* Grid Pembagian Analisis Skill */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* Kolom Skill yang COCOK */}
                                    <div className="p-4 bg-gray-50 rounded-md space-y-2 border border-gray-100">
                                        <h4 className="text-sm font-bold text-green-700 flex items-center">
                                            <span className="mr-1.5">✓</span> Skill yang Sudah Dikuasai ({rec.matchedSkills.length})
                                        </h4>
                                        {rec.matchedSkills.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {rec.matchedSkills.map((skill) => (
                                                    <span key={skill} className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400">Belum ada skill yang cocok</p>
                                        )}
                                    </div>

                                    {/* Kolom Skill yang BELUM DIKUASAI (ROADMAP BELAJAR) */}
                                    <div className="p-4 bg-gray-50 rounded-md space-y-2 border border-gray-100">
                                        <h4 className="text-sm font-bold text-red-700 flex items-center">
                                            <span className="mr-1.5">✗</span> Roadmap Belajar / Skill Kurang ({rec.missingSkills.length})
                                        </h4>
                                        {rec.missingSkills.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {rec.missingSkills.map((skill) => (
                                                    <span key={skill} className="px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-green-600 font-semibold">Selamat! Semua skill sudah Anda kuasai</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}