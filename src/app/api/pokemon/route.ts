import { AppConfig } from '@/config';
import { NextResponse } from 'next/server';
import { cachedFetch } from '@/proxy/apiCache';

export async function GET() {
  const url = `${AppConfig.apiUrl}/pokemon?limit=${AppConfig.pageSize}&offset=0`;

  try {
    const data = await cachedFetch('pokemon', async () => {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    });

    if (!data) {
      return NextResponse.json({ error: 'Pokemons not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
