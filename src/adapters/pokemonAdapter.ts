import { Pokemon } from '@/types/pokemon';
import { AppConfig } from '@/config';
import { PokemonFactory } from '@/factory/pokemonFactory';
import { Generation } from '@/types';

class PokemonAdapter {
  async getById(id: string | number): Promise<Pokemon> {
    const response = await fetch(`${AppConfig.localApiUrl}/pokemon/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return PokemonFactory.createPokemon(result.data);
  }

  async getAll(): Promise<Pokemon[]> {
    const response = await fetch(`${AppConfig.localApiUrl}/pokemon`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.data.map((item: any) => PokemonFactory.createPokemon(item));
  }

  async getByGeneration(generation: Generation): Promise<string[]> {
    return generation.pokemonSpecies.map((species) => species.name);
  }
}

export const pokemonAdapter = new PokemonAdapter();

