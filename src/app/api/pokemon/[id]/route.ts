import { AppConfig } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    try {
        const res = await fetch(`${AppConfig.apiUrl}/pokemon/${id}`);
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json({ data });
        } else {
            return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}