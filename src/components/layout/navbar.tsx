// src/components/layout/navbar.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            {/* Kiri: Hamburger + Logo */}
            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100 lg:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-wide text-gray-800">
                        CAREVORA <span className="text-green-600">AI</span>
                    </span>
                </div>
            </div>

            {/* Tengah: Search Bar (dekoratif) */}
            <div className="flex-1 hidden max-w-md mx-8 md:flex">
                <div className="relative w-full">
                    <svg
                        className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Cari halaman..."
                        className="w-full py-2 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Kanan: Ikon Notifikasi/Pengaturan + Profil */}
            <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100" aria-label="Notifikasi">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>

                <button
                    className="flex items-center justify-center text-white bg-green-600 rounded-full w-9 h-9 hover:bg-green-700"
                    aria-label="Pengaturan"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100" aria-label="Mode Gelap">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
                    </svg>
                </button>

                {/* Profil + Dropdown (fitur logout tetap di sini, hanya tampilan diubah) */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu((prev) => !prev)}
                        className="flex items-center pl-3 ml-1 space-x-2 border-l border-gray-200"
                    >
                        <div className="flex items-center justify-center w-9 h-9 font-semibold text-white bg-green-500 rounded-full">
                            {(user?.name || 'P').charAt(0).toUpperCase()}
                        </div>
                        <span className="hidden text-sm font-semibold text-gray-700 sm:block">
                            {user?.name || 'Pengguna'}
                        </span>
                        <svg className="hidden w-4 h-4 text-gray-400 sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 z-40 w-48 py-2 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg">
                            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                                Hai, {user?.name || 'Pengguna'}
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}