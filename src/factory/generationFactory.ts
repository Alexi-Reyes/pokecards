import { Generation, GenerationData } from "@/types/generation";

export class GenerationFactory {
    static createGeneration(data: GenerationData): Generation {
        return {
            id: data.id,
            name: data.name,
            region: data.main_region.name,
            pokemonSpecies: data.pokemon_species.map((species) => ({
                name: species.name,
                url: species.url,
            })),
        };
    }
}