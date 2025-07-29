'use server';

import { JWTPayloadDTO } from '../../models/token.models';
export async function getUserFromToken(token: string): Promise<JWTPayloadDTO | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const user = await res.json();
  return user;
}
