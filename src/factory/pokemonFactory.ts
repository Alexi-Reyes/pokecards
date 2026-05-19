import { PokemonData, Pokemon } from "@/types";

export class PokemonFactory {
    static createPokemon(data: PokemonData): Pokemon {
        return {
            id: data.id,
            name: data.name,
            order: data.order,
            types: data.types.map((t) => ({
                name: t.type.name,
            })),
            moves: data.moves.map((m) => ({
                name: m.move.name,
            })),
            stats: data.stats.map((s) => ({
                baseStat: s.base_stat,
            })),
            image:
                data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || null,
            shinyImage:
                data.sprites.other?.['official-artwork']?.front_shiny || data.sprites.front_shiny || null,
            };
    }
}