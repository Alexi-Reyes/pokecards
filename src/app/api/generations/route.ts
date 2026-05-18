export async function GET() {
    const request = "https://pokeapi.co/api/v2/generation"

    try {
        const res = await fetch(request);
        if (res.ok) {
            const data = await res.json();
            return Response.json({ data });
        } else {
            return new Response('Generations not found', { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching Generations:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}