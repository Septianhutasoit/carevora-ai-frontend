// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Otomatis alihkan pengguna ke halaman login saat membuka http://localhost:3000/
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-500">
      <div className="flex flex-col items-center space-y-4">
        {/* Loading Spinner Halus */}
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Mengarahkan ke halaman masuk...</p>
      </div>
    </div>
  );
}