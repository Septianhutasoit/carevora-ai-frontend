export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatarUrl?: string;
    createdAt?: string;
}

// Payload untuk form login (dipakai di login-form.tsx)
export interface LoginPayload {
    email: string;
    password: string;
}

// Payload untuk form register (dipakai di register-form.tsx)
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

// Response standar dari endpoint auth (login/register), berisi token + data user
export interface AuthResponse {
    token: string;
    user: User;
}