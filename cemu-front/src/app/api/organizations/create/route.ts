import { config } from '@/lib/env.loader';
import { NextRequest, NextResponse } from 'next/server';

interface OrganizationCreatePayload {
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload: OrganizationCreatePayload = await req.json();
    console.log('[CreateOrg] payload:', payload);

    const jwt = process.env.JWT_SECRET;
    if (!jwt) {
      console.error('[CreateOrg] Missing process.env.JWT_SECRET');
      return NextResponse.json(
        { message: 'Missing JWT_SECRET in env' },
        { status: 500 },
      );
    }

    const apiRes = await fetch(`${config.apiUrl}/sites/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await apiRes.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    console.log(`[CreateOrg] external status=${apiRes.status}`, data);

    if (!apiRes.ok) {
      return NextResponse.json(
        {
          message: (data && data.message) || 'Error creating organization',
          details: data,
        },
        { status: apiRes.status },
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (err: any) {
    console.error('[CreateOrg] unhandled error:', err);
    return NextResponse.json(
      { message: err.message, stack: err.stack },
      { status: 500 },
    );
  }
}
