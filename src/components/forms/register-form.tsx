'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/auth';
import Link from 'next/link';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.register(name, email, password);
            // Simpan token JWT di localStorage
            localStorage.setItem('token', data.accessToken);
            // Redirect ke dashboard
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registrasi gagal, silakan coba lagi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-100">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Daftar Akun Baru</h2>
                <p className="mt-2 text-sm text-gray-600">Mulai langkah analisis karier Anda</p>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
                    {error}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Min. 6 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                </button>
            </form>

            <div className="text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                    Masuk di Sini
                </Link>
            </div>
        </div>
    );
}