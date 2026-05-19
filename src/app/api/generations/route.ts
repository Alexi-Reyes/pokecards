import { NextResponse } from 'next/server';

import { AppConfig } from '@/app/config';

export async function GET() {
  try {
    const res = await fetch(`${AppConfig.apiUrl}/generation`);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ error: 'Generations not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching Generations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
