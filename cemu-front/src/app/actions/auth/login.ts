'use server';

import { cookies } from 'next/headers';

export async function login(
    email: string,
    password: string,
): Promise<{ success: boolean; message?: string }> {
    const apiUrl = process.env.apiUrl || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        return { success: false, message: 'Invalid credentials' };
    }

    const { token } = await res.json();

    (await cookies()).set('auth-token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return { success: true };
}
