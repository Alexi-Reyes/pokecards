import { AppConfig } from '@/config';
import { NextResponse } from 'next/server';

export async function GET() {
  const request = `${AppConfig.apiUrl}/pokemon?limit=${AppConfig.pageSize}&offset=0`;

  try {
    const res = await fetch(request);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ error: 'Pokemons not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
