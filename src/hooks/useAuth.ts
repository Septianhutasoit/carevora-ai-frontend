// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth';
import { User } from '../types';

export function useAuth(requireAuth = true) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem('token');

            if (!token) {
                setUser(null);
                setLoading(false);
                if (requireAuth) {
                    router.replace('/login');
                }
                return;
            }

            try {
                const profile = await authService.getProfile();
                setUser(profile);
            } catch (error) {
                // Jika token tidak valid / kadaluarsa, bersihkan localStorage
                localStorage.removeItem('token');
                setUser(null);
                if (requireAuth) {
                    router.replace('/login');
                }
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [requireAuth, router]);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    };

    return { user, loading, logout };
}