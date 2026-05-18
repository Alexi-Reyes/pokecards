export interface GenerationListItem {
    name: string;
    url: string;
    id: number;
}

export interface Generation {
    id: number;
    name: string;
    region: string;
    pokemonSpecies: Array<{
        name: string;
        url: string;
    }>;
}

export interface GenerationData {
    id: number;
    name: string;
    main_region: {
        name: string;
    };
    pokemon_species: Array<{
        name: string;
        url: string;
    }>;
}

export interface GenerationBasicInfo {
    name: string;
}
