import type { UnlockedPokemon } from '@/types';

const STORAGE_KEY = 'unlockedPokemons';

export interface BoosterCard {
  id: number;
  name: string;
  isShiny: boolean;
}

export interface Booster {
  cards: BoosterCard[];
}

interface BoosterConfig {
  cardCount: number;
  shinyRate: number;
}

interface PokemonPoolItem {
  id: number;
  name: string;
}

class BoosterFactory {
  private config: BoosterConfig;

  constructor(config: BoosterConfig) {
    this.config = config;
  }

  private getUnlocked(): UnlockedPokemon[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as UnlockedPokemon[];
  }

  private saveUnlocked(pokemons: UnlockedPokemon[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
  }

  open(pool: PokemonPoolItem[]): Booster {
    if (pool.length === 0) return { cards: [] };

    const unlocked = this.getUnlocked();
    const cards: BoosterCard[] = [];

    for (let i = 0; i < this.config.cardCount; i++) {
      const picked = pool[Math.floor(Math.random() * pool.length)];
      const alreadyUnlocked = unlocked.find((entry) => entry.id === picked.id);

      let isShiny = false;
      if (!alreadyUnlocked) {
        isShiny = Math.random() <= this.config.shinyRate;
        unlocked.push({ id: picked.id, is_shiny: isShiny });
      } else {
        isShiny = alreadyUnlocked.is_shiny;
      }

      cards.push({ id: picked.id, name: picked.name, isShiny });
    }

    this.saveUnlocked(unlocked);
    return { cards };
  }
}

export const standardBoosterFactory = new BoosterFactory({ cardCount: 4, shinyRate: 0.1 });
