"use client";
import { useEffect, useState } from "react";
import { recommendationService } from "../../../services/recommendation";
import { RecommendationResult } from "../../../types";
import Link from "next/link";

/** Cincin persentase kecocokan — elemen visual utama halaman ini. */
function MatchRing({
    percentage,
    highlight,
}: {
    percentage: number;
    highlight?: boolean;
}) {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-gray-100"
                />
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={
                        highlight
                            ? "text-emerald-500 transition-all duration-700"
                            : "text-green-600 transition-all duration-700"
                    }
                    stroke="currentColor"
                />
            </svg>
            <span className="absolute text-lg font-bold text-gray-900">
                {percentage}%
            </span>
        </div>
    );
}

/** Skeleton placeholder saat data rekomendasi masih dimuat. */
function RecommendationSkeleton() {
    return (
        <div className="space-y-5">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm animate-pulse"
                >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div className="w-20 h-20 bg-gray-100 rounded-full shrink-0" />
                        <div className="flex-1 space-y-4">
                            <div className="w-1/3 h-5 bg-gray-100 rounded" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="h-20 bg-gray-50 rounded-xl" />
                                <div className="h-20 bg-gray-50 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function RecommendationPage() {
    const [recommendations, setRecommendations] = useState<
        RecommendationResult[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const data = await recommendationService.getRecommendations();
                setRecommendations(data);
            } catch (error) {
                console.error("Gagal mengambil rekomendasi AI:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendations();
    }, []);

    // Urutkan dari kecocokan tertinggi ke terendah agar rekomendasi terbaik selalu tampil di atas
    const sortedRecommendations = [...recommendations].sort(
        (a, b) => b.score - a.score,
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header Halaman */}
            <div className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-green-700 uppercase w-fit">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Didukung oleh AI
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Analisis Rekomendasi Karier
                </h1>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                    Model BGE-small membandingkan vektor keahlian Anda dengan standar
                    industri menggunakan perhitungan Cosine Similarity untuk menemukan
                    jalur karier yang paling relevan.
                </p>
            </div>

            {loading ? (
                <RecommendationSkeleton />
            ) : sortedRecommendations.length === 0 ? (
                // Skenario jika pengguna belum memilih skill apa pun di menu Kelola Skill
                <div className="max-w-xl p-10 mx-auto space-y-4 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="inline-flex p-3 text-amber-600 rounded-full bg-amber-50">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div className="space-y-1.5">
                        <h2 className="text-lg font-bold text-gray-900">
                            Belum ada skill yang dipilih
                        </h2>
                        <p className="max-w-sm mx-auto text-sm text-gray-500">
                            Sistem AI memerlukan data keahlian Anda untuk menghitung kecocokan
                            karier. Pilih skill Anda terlebih dahulu untuk melihat
                            rekomendasi.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/skills"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            Kelola Skill Sekarang
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    {sortedRecommendations.map((rec, index) => {
                        // Mengonversi skor matematika (misal: 0.8567) menjadi persentase bulat (86%)
                        const matchPercentage = Math.round(rec.score * 100);
                        const isTopMatch = index === 0;

                        return (
                            <div
                                key={rec.careerId}
                                className={`relative flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-sm border transition-shadow hover:shadow-md md:flex-row md:items-start ${isTopMatch
                                        ? "border-green-200 ring-1 ring-green-100"
                                        : "border-gray-100"
                                    }`}
                            >
                                {isTopMatch && (
                                    <span className="absolute inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-500 rounded-full -top-3 left-6">
                                        ★ Kecocokan Tertinggi
                                    </span>
                                )}

                                {/* Cincin Persentase Kecocokan */}
                                <div className="flex md:flex-col items-center gap-3 md:gap-2 md:w-24 shrink-0">
                                    <MatchRing
                                        percentage={matchPercentage}
                                        highlight={isTopMatch}
                                    />
                                    <span className="text-xs font-medium text-gray-400 md:text-center">
                                        Kecocokan
                                    </span>
                                </div>

                                {/* Informasi Karier & Gap Analysis */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {rec.careerTitle}
                                        </h3>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            ID Karier: {rec.careerId}
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Skill yang COCOK */}
                                        <div className="p-4 space-y-2.5 border border-gray-100 rounded-xl bg-gray-50/70">
                                            <h4 className="flex items-center text-sm font-semibold text-green-700">
                                                <svg
                                                    className="w-4 h-4 mr-1.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                Skill yang Sudah Dikuasai ({rec.matchedSkills.length})
                                            </h4>
                                            {rec.matchedSkills.length > 0 ? (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {rec.matchedSkills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-400">
                                                    Belum ada skill yang cocok
                                                </p>
                                            )}
                                        </div>

                                        {/* Skill yang BELUM DIKUASAI (ROADMAP BELAJAR) */}
                                        <div className="p-4 space-y-2.5 border border-gray-100 rounded-xl bg-gray-50/70">
                                            <h4 className="flex items-center text-sm font-semibold text-red-700">
                                                <svg
                                                    className="w-4 h-4 mr-1.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                Roadmap Belajar ({rec.missingSkills.length})
                                            </h4>
                                            {rec.missingSkills.length > 0 ? (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {rec.missingSkills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-md"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs font-semibold text-green-600">
                                                    Selamat! Semua skill sudah Anda kuasai
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}