import { Pokemon, PokemonListItem, PokemonData } from '@/types/pokemon';
import { AppConfig } from '@/config';

export const adaptPokemon = (data: PokemonData): Pokemon => {
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
};

export const adaptPokemonList = (data: any): PokemonListItem[] => {
  return data.results.map((item: any) => {
    const id = parseInt(item.url.split('/').filter(Boolean).pop() || '0');
    return {
      name: item.name,
      url: item.url,
      id: id,
    };
  });
};


export const getPokemons = async (): Promise<PokemonListItem[]> => {
  try {
    const response = await fetch(`${AppConfig.localApiUrl}/pokemon`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return adaptPokemonList(result.data);
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return [];
  }
};

export const getPokemon = async (id: string | number): Promise<Pokemon> => {
  try {
    const response = await fetch(`${AppConfig.localApiUrl}/pokemon/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return adaptPokemon(result.data);
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    throw error;
  }
};
