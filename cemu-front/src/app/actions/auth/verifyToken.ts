import { JWTPayloadDTO } from '@/app/models/token.models';

export async function verifyToken(
  token: string,
): Promise<JWTPayloadDTO | null> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // ✅ Aquí va el token
    },
  });

  if (!res.ok) return null;

  return (await res.json()) as JWTPayloadDTO;
}
