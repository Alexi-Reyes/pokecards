import { Observer } from '@/types';
import { generationAdapter } from '@/adapters/generationAdapter';
import { unlockedPokemonRepository } from '@/repositories/unlockedPokemonRepository';

export class GenerationCompletionObserver implements Observer {
  async update(event: string, data?: any): Promise<void> {
    if (event === 'pokemonUnlocked') {
      const { pokemonId } = data;
      console.log(`Checking if generation is complete for pokemon ${pokemonId}`);

      try {
        const generations = await generationAdapter.getAll();

        for (const gen of generations) {
          const isPokemonInGen = gen.pokemonSpecies.some((species) => {
            const id = species.url.match(/(\d+)(?=\/$)/)?.[0];
            return id === String(pokemonId);
          });

          if (isPokemonInGen) {
            const allUnlocked = gen.pokemonSpecies.every((species) => {
              const id = species.url.match(/(\d+)(?=\/$)/)?.[0];
              return id ? unlockedPokemonRepository.isUnlocked(parseInt(id)) : false;
            });

            if (allUnlocked) {
              this.notifyCompletion(gen.name);
            }
            break;
          }
        }
      } catch (error) {
        console.error('Error in GenerationCompletionObserver:', error);
      }
    }
  }

  private notifyCompletion(genName: string): void {
    const message = `🌟 Congratulations! You have unlocked all Pokémon of ${genName}! 🌟`;
    console.log(message);

    if (typeof window !== 'undefined') {
      alert(message);
    }
  }
}
