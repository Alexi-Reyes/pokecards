import { AppConfig } from '@/config';
import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  const request = `${AppConfig.apiUrl}/generation/${id}`;

  try {
    const res = await fetch(request);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ error: 'No generation found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching Generations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
