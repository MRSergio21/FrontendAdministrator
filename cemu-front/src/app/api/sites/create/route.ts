import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { config } from '@/lib/env.loader';

interface SiteCreatePayload {
  name: string;
  domain: string;
  organizationIds: string[];
}

export async function POST(req: NextRequest) {
  try {
    const payload: SiteCreatePayload = await req.json();
    console.log('[CreateSite] payload:', payload);

    const jwt = process.env.JWT_SECRET;
    console.log('[CreateSite] JWT:', jwt);
    if (!jwt) {
      console.error('[CreateSite] Missing process.env.JWT_SECRET');
      return NextResponse.json(
        { message: 'Missing JWT_SECRET in env' },
        { status: 500 },
      );
    }

    const apiRes = await axios.post(`${config.apiUrl}/sites`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    const data = apiRes.data;
    console.log('[CreateSite] external status=2xx', data);

    return NextResponse.json({ site: data });
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.message || err.message;
      return NextResponse.json({ message }, { status });
    }
    console.error('[CreateSite] unexpected error:', err);
    return NextResponse.json(
      { message: err.message || 'Unexpected error' },
      { status: 500 },
    );
  }
}
