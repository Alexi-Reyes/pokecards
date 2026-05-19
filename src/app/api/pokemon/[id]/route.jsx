import { NextRequest, NextResponse } from 'next/server';

export async function GET(NextRequest, { params }) {
    const { id } =  await params
    if (!id) {
        return new Response('No ID provided', { status: 400 });
    }

    const request = `https://pokeapi.co/api/v2/pokemon/${id}`

    try {
        const res = await fetch(request);
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json({ data });
        } else {
            return new Response('Pokemon not found', { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}