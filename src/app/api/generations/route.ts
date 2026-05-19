import { NextResponse } from 'next/server';

import { AppConfig } from '@/config';
import { cachedFetch } from '@/proxy/apiCache';

export async function GET() {
  try {
    const detailedGenerations = await cachedFetch('generations', async () => {
      const res = await fetch(`${AppConfig.apiUrl}/generation`);
      if (!res.ok) return null;

      const listData = await res.json();

      const results = await Promise.all(
        listData.results.map(async (gen: any) => {
          const idMatch = gen.url.match(/(\d+)(?=\/$)/);
          const genId = idMatch ? idMatch[0] : null;
          if (!genId) return null;

          try {
            const genRes = await fetch(`${AppConfig.apiUrl}/generation/${genId}`);
            if (genRes.ok) return await genRes.json();
          } catch (error) {
            console.error(`Error fetching generation ${genId}:`, error);
          }
          return null;
        })
      );

      return results.filter(Boolean);
    });

    if (!detailedGenerations) {
      return NextResponse.json({ error: 'Generations not found' }, { status: 404 });
    }

    return NextResponse.json({ data: detailedGenerations });
  } catch (error) {
    console.error('Error fetching Generations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
