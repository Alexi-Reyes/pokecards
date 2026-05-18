export interface PokemonType {
    type: {
        name: string;
    };
}

export interface PokemonMove {
    move: {
        name: string;
    };
}

export interface PokemonStat {
    base_stat: number;
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
        "official-artwork"?: {
            front_default?: string | null;
            front_shiny?: string | null;
        };
    };
}

export interface PokemonData {
    id: number;
    name: string;
    order: number;
    types: PokemonType[];
    moves: PokemonMove[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}

export interface Pokemon {
    id: number;
    name: string;
    order: number;
    types: Array<{ name: string }>;
    moves: Array<{ name: string }>;
    stats: Array<{ baseStat: number }>;
    image: string | null;
    shinyImage: string | null;
}

export interface UnlockedPokemon {
    id: number;
    is_shiny: boolean;
}

export interface PokemonListItem {
    name: string;
    url: string;
    id: number;
}
