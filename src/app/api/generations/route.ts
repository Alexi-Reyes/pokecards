import { NextResponse } from 'next/server';

import { AppConfig } from '@/config';

export async function GET() {
  try {
    const res = await fetch(`${AppConfig.apiUrl}/generation`);
    if (res.ok) {
      const listData = await res.json();
      
      // Récupérer les données complètes pour chaque génération
      const detailedGenerations = await Promise.all(
        listData.results.map(async (gen: any) => {
          const idMatch = gen.url.match(/(\d+)(?=\/$)/);
          const genId = idMatch ? idMatch[0] : null;
          if (!genId) return null;
          
          try {
            const genRes = await fetch(`${AppConfig.apiUrl}/generation/${genId}`);
            if (genRes.ok) {
              return await genRes.json();
            }
          } catch (error) {
            console.error(`Error fetching generation ${genId}:`, error);
          }
          return null;
        })
      );
      
      return NextResponse.json({ data: detailedGenerations.filter(Boolean) });
    } else {
      return NextResponse.json({ error: 'Generations not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching Generations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
