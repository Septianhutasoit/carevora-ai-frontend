// src/components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const menuItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                    />
                </svg>
            ),
        },
        {
            name: 'Kelola Skill',
            href: '/skills',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
            ),
        },
        {
            name: 'Rekomendasi Karier',
            href: '/recommendation',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            name: 'Profil Saya',
            href: '/profile',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <aside className="fixed left-0 z-20 flex flex-col w-64 bg-white border-r border-gray-200 top-16 h-[calc(100vh-4rem)]">
            {/* Kartu Info Pengguna (menggantikan logo, karena logo sudah pindah ke Navbar) */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center px-3 py-3 space-x-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white bg-green-600 rounded-full">
                        {(user?.name || 'P').charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Pengguna'}</p>
                        <p className="text-xs text-gray-400 truncate">Selamat datang kembali</p>
                    </div>
                </div>
            </div>

            {/* Daftar Menu */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <p className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Menu
                </p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-green-600 text-white shadow-sm'
                                    : 'text-gray-500 hover:bg-green-50 hover:text-green-700'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}