import { Subject } from './subject';

export class PokemonSubject extends Subject {
  private static instance: PokemonSubject;

  private constructor() {
    super();
  }

  public static getInstance(): PokemonSubject {
    if (!PokemonSubject.instance) {
      PokemonSubject.instance = new PokemonSubject();
    }
    return PokemonSubject.instance;
  }

  notifyPokemonUnlocked(pokemonId: number): void {
    this.notify('pokemonUnlocked', { pokemonId });
  }
}

export const pokemonSubject = PokemonSubject.getInstance();
