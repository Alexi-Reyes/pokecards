import { Generation, GenerationListItem, GenerationData } from "@/types/generation";

export const adaptGeneration = (data: GenerationData): Generation => {
    return {
        id: data.id,
        name: data.name,
        region: data.main_region.name,
        pokemonSpecies: data.pokemon_species.map((species) => ({
            name: species.name,
            url: species.url,
        })),
    };
};

export const adaptGenerationList = (data: any): GenerationListItem[] => {
    return data.results.map((item: any) => {
        const id = parseInt(item.url.split("/").filter(Boolean).pop() || "0");
        return {
            name: item.name,
            url: item.url,
            id: id,
        };
    });
};

const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

export const getGenerations = async (): Promise<GenerationListItem[]> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/generations`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return adaptGenerationList(result.data);
    } catch (error) {
        console.error("Error fetching generations:", error);
        return [];
    }
};

export const getGeneration = async (id: string | number): Promise<Generation> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/generations/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return adaptGeneration(result.data);
    } catch (error) {
        console.error(`Error fetching generation ${id}:`, error);
        throw error;
    }
};

export const getPokemonByGeneration = async (genId: string | number): Promise<string[]> => {
    const generation = await getGeneration(genId);
    return generation.pokemonSpecies.map(species => species.name);
};
