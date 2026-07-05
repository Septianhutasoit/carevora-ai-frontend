// src/components/layout/shell.tsx
'use client';

import { useAuth } from '../../hooks/useAuth';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface ShellProps {
    children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
    // Gunakan useAuth(true) untuk memproteksi halaman secara otomatis.
    // Jika user belum login, halaman otomatis di-redirect ke /login.
    const { loading } = useAuth(true);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
                <div className="flex flex-col items-center space-y-4">
                    {/* Efek Loading berputar */}
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Memuat halaman analisis...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Header Atas (Lebar Penuh) */}
            <Navbar />

            {/* 2. Sidebar Kiri (Di bawah Header) */}
            <Sidebar />

            {/* 3. Area Konten Utama, digeser oleh lebar sidebar (pl-64) dan tinggi header (pt-16) */}
            <div className="pt-16 pl-64">
                <main className="p-8 min-h-[calc(100vh-4rem)]">{children}</main>
            </div>
        </div>
    );
}