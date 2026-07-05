// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { skillService } from '../../../services/skill';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [skillsCount, setSkillsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const userSkills = await skillService.getUserSkills();
                setSkillsCount(userSkills.length);
            } catch (error) {
                console.error('Gagal memuat statistik dashboard:', error);
            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, []);

    return (
        <div className="space-y-6">
            {/* 1. KARTU SELAMAT DATANG (WELCOME BANNER) */}
            <div className="p-6 text-white shadow-sm bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl">
                <h1 className="text-2xl font-bold">Selamat Datang Kembali, {user?.name || 'Pengguna'}!</h1>
                <p className="max-w-xl mt-2 text-green-100">
                    Carevora AI siap menganalisis keahlian Anda dan memberikan rekomendasi jalur karier terbaik yang cocok untuk masa depan Anda.
                </p>
            </div>

            {/* 2. AREA KARTU STATISTIK (STATS CARDS) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Kartu 1: Jumlah Skill Terdaftar */}
                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Skill yang Anda Kuasai</p>
                        <h3 className="mt-1 text-3xl font-bold text-gray-900">
                            {loading ? '...' : `${skillsCount} Skill`}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">Telah tersimpan di database</p>
                    </div>
                    <div className="p-3 text-green-600 rounded-full bg-green-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                            />
                        </svg>
                    </div>
                </div>

                {/* Kartu 2: Target Jalur Karir AI */}
                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Kandidat Jalur Karier</p>
                        <h3 className="mt-1 text-3xl font-bold text-gray-900">3 Jalur</h3>
                        <p className="mt-1 text-xs text-gray-400">Backend, Frontend, & DevOps</p>
                    </div>
                    <div className="p-3 text-teal-600 rounded-full bg-teal-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Kartu 3: Status Analisis */}
                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Status Rekomendasi</p>
                        <h3 className="mt-2 text-xl font-bold text-green-600">
                            {skillsCount > 0 ? 'Siap Dianalisis' : 'Butuh Input Skill'}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            {skillsCount > 0 ? 'Model AI siap menghitung' : 'Silakan isi skill Anda terlebih dahulu'}
                        </p>
                    </div>
                    <div className="p-3 text-green-600 rounded-full bg-green-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 3. AREA AKSI CEPAT (QUICK ACTIONS) */}
            <div className="p-6 space-y-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h2 className="text-lg font-bold text-gray-900">Langkah Memulai Analisis AI:</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Aksi 1 */}
                    <Link
                        href="/skills"
                        className="flex flex-col justify-between p-4 transition-all border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50/40"
                    >
                        <div>
                            <span className="text-xs font-bold tracking-wider text-green-600 uppercase">Langkah 1</span>
                            <h4 className="mt-1 text-base font-semibold text-gray-900">Pilih & Kelola Keahlian</h4>
                            <p className="mt-1 text-sm text-gray-500">
                                Pilih teknologi dan bahasa pemrograman yang sudah Anda kuasai saat ini.
                            </p>
                        </div>
                        <span className="inline-flex items-center mt-4 text-sm font-medium text-green-600">
                            Kelola Skill &rarr;
                        </span>
                    </Link>

                    {/* Aksi 2 */}
                    <Link
                        href="/recommendation"
                        className="flex flex-col justify-between p-4 transition-all border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/40"
                    >
                        <div>
                            <span className="text-xs font-bold tracking-wider uppercase text-emerald-600">Langkah 2</span>
                            <h4 className="mt-1 text-base font-semibold text-gray-900">Lihat Hasil Rekomendasi</h4>
                            <p className="mt-1 text-sm text-gray-500">
                                Dapatkan kalkulasi persentase kecocokan karier dan analisis skill yang kurang (*gap*).
                            </p>
                        </div>
                        <span className="inline-flex items-center mt-4 text-sm font-medium text-emerald-600">
                            Lihat Analisis AI &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}