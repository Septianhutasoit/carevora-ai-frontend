// src/components/layout/sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    // Auto-collapse di layar sempit (tablet/mobile), tetap bisa dibuka manual lewat tombol toggle
    useEffect(() => {
        function handleResize() {
            setCollapsed(window.innerWidth < 1024);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: (
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                    />
                </svg>
            ),
        },
        {
            name: "Kelola Skill",
            href: "/skills",
            icon: (
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
            ),
        },
        {
            name: "Rekomendasi Karier",
            href: "/recommendation",
            icon: (
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>
            ),
        },
        {
            name: "Profil Saya",
            href: "/profile",
            icon: (
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <aside
            className={`fixed left-0 top-16 bottom-0 z-20 flex flex-col bg-white/70 backdrop-blur-xl border-r border-gray-200/70 shadow-xl shadow-gray-200/40 transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Tombol Toggle Collapse/Expand */}
            <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
                className="absolute z-30 flex items-center justify-center w-7 h-7 text-gray-500 transition-all bg-white border border-gray-200 rounded-full shadow-md -right-3 top-6 hover:text-green-600 hover:border-green-200"
            >
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Kartu Info Pengguna */}
            <div className="p-4 border-b border-gray-100/80">
                <div
                    className={`flex items-center rounded-xl bg-gray-50/80 ${collapsed ? "justify-center p-2" : "px-3 py-3 space-x-3"}`}
                >
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white shrink-0 bg-green-600 rounded-full">
                        {(user?.name || "P").charAt(0).toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {user?.name || "Pengguna"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                Selamat datang kembali
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Daftar Menu */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
                {!collapsed && (
                    <p className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        Menu
                    </p>
                )}
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group relative flex items-center rounded-xl text-sm font-medium transition-colors ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3"
                                } ${isActive
                                    ? "bg-green-600 text-white shadow-sm shadow-green-200"
                                    : "text-gray-500 hover:bg-green-50 hover:text-green-700"
                                }`}
                        >
                            <span className={collapsed ? "" : "mr-3"}>{item.icon}</span>
                            {!collapsed && item.name}

                            {/* Tooltip nama menu saat sidebar diciutkan */}
                            {collapsed && (
                                <span className="absolute z-40 px-3 py-1.5 ml-3 text-xs font-medium text-white whitespace-nowrap bg-gray-900 rounded-lg shadow-lg opacity-0 pointer-events-none left-full group-hover:opacity-100 transition-opacity">
                                    {item.name}
                                </span>
                            )}

                            {/* Indikator halaman aktif */}
                            {isActive && !collapsed && (
                                <span className="absolute w-1.5 h-1.5 -translate-y-1/2 bg-white rounded-full right-4 top-1/2" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}