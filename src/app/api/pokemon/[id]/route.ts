import { AppConfig } from '@/config';
import { NextResponse } from 'next/server';
import { cachedFetch } from '@/proxy/apiCache';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const data = await cachedFetch(`pokemon:${id}`, async () => {
      const res = await fetch(`${AppConfig.apiUrl}/pokemon/${id}`);
      if (!res.ok) return null;
      return await res.json();
    });

    if (!data) {
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
