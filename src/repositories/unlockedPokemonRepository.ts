import type { UnlockedPokemon } from '@/types';

const STORAGE_KEY = 'unlockedPokemons';

function readAll(): UnlockedPokemon[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored) as UnlockedPokemon[];
}

function writeAll(pokemons: UnlockedPokemon[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
}

export const unlockedPokemonRepository = {
  getAll(): UnlockedPokemon[] {
    return readAll();
  },

  find(id: number): UnlockedPokemon | undefined {
    return readAll().find((entry) => entry.id === id);
  },

  isUnlocked(id: number): boolean {
    return readAll().some((entry) => entry.id === id);
  },

  add(pokemon: UnlockedPokemon): void {
    const all = readAll();
    if (all.some((entry) => entry.id === pokemon.id)) return;
    writeAll([...all, pokemon]);
  },
};
