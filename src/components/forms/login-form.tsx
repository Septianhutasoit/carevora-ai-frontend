"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../services/auth";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await authService.login(email, password);
            // Simpan token JWT di localStorage secara aman
            localStorage.setItem("token", data.accessToken);
            // Redirect langsung ke dashboard setelah login berhasil
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Email atau password salah");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex w-screen h-screen overflow-hidden">
            {/* PANEL KIRI — Branding (teks + logo, tanpa foto) */}
            <div className="relative flex-col justify-between hidden w-1/2 p-10 overflow-hidden text-white md:flex bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900">
                {/* Aksen bentuk dekoratif, pengganti foto */}
                <div className="absolute rounded-full -top-24 -left-16 w-72 h-72 bg-green-500/10 blur-2xl" />
                <div className="absolute w-64 h-64 rounded-full bottom-10 -right-10 bg-emerald-400/10 blur-2xl" />
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.06]"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 200L200 0L400 200L200 400Z"
                        stroke="white"
                        strokeWidth="1"
                    />
                    <path d="M0 100L300 400" stroke="white" strokeWidth="1" />
                    <path d="M400 100L100 400" stroke="white" strokeWidth="1" />
                </svg>

                {/* Header: Logo + Kembali */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-9 h-9 bg-white/15 rounded-lg backdrop-blur-sm">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-wide">CAREVORA AI</span>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-sm text-green-100/80 hover:text-white transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Headline utama */}
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold leading-tight">
                        Petakan Skill. <br /> Temukan Karier. <br /> Berkembang Lebih Cepat.
                    </h1>
                    <p className="max-w-sm mt-4 text-sm leading-relaxed text-green-100/80">
                        Carevora AI menganalisis keahlian Anda dan memberi rekomendasi jalur
                        karier yang paling sesuai — dalam hitungan menit.
                    </p>
                </div>
            </div>

            {/* PANEL KANAN — Form Login (kartu melayang) */}
            <div className="relative z-10 flex flex-col justify-center w-full p-8 space-y-6 overflow-y-auto bg-white md:w-1/2 sm:p-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Selamat Datang Kembali!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Masuk untuk melanjutkan analisis karier Anda.
                    </p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2.5 text-gray-900 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full px-3 py-2.5 pr-10 text-gray-900 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Masukkan password Anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={
                                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                                }
                            >
                                {showPassword ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.293-3.95m3.05-2.02A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.99 9.99 0 01-4.132 5.411M3 3l18 18"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            Ingat Saya
                        </label>
                        <Link
                            href="/forgot-password"
                            className="font-medium text-green-600 hover:underline"
                        >
                            Lupa Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center w-full gap-2 py-2.5 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading && (
                            <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                        {loading ? "Sedang Masuk..." : "Masuk"}
                    </button>
                </form>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">Atau lanjutkan dengan</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <p className="text-sm text-center text-gray-600">
                    Belum punya akun?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-green-600 hover:underline"
                    >
                        Daftar Gratis
                    </Link>
                </p>
            </div>
        </div>
    );
}