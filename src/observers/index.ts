import { pokemonSubject } from './pokemonSubject';
import { GenerationCompletionObserver } from './generationCompletionObserver';

export function initObservers() {
  if (typeof window === 'undefined') return;

  const generationCompletionObserver = new GenerationCompletionObserver();
  pokemonSubject.attach(generationCompletionObserver);

  console.log('Observers initialized');
}

export * from './subject';
export * from './pokemonSubject';
export * from './generationCompletionObserver';
