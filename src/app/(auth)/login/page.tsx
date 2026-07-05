// src/app/(auth)/login/page.tsx
import LoginForm from '@/components/forms/login-form';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <LoginForm />
        </main>
    );
}