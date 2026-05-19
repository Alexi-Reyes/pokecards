'use client';

import Image from 'next/image';
import { useEffect, useState, type MouseEvent } from 'react';
import Loading from '../Loading/loading';
import styles from './card.module.css';
import { AppConfig } from '@/config';
import { withLocked, withShiny } from '@/decorators/cardDecorators';

import type { PokemonData, UnlockedPokemon, ApiResponse, PokemonType, CardFrameComponent } from '@/types';

type CardProps = { pokemon: string | number };

const BaseCardFrame: CardFrameComponent = ({ className, onMouseMove, onMouseLeave, children }) => (
  <div className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
    {children}
  </div>
);

const LockedCardFrame = withLocked(BaseCardFrame);
const ShinyCardFrame = withShiny(BaseCardFrame);

export default function Card({ pokemon }: CardProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${AppConfig.localApiUrl}/pokemon/${pokemon}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApiResponse<PokemonData> = await response.json();

        setPokemonData(result.data);

        const localStorageKey = 'unlockedPokemons';
        const stored = localStorage.getItem(localStorageKey);
        let localStoragePokemon: UnlockedPokemon[] = [];

        if (stored) {
          localStoragePokemon = JSON.parse(stored) as UnlockedPokemon[];
        }

        const foundPokemon = localStoragePokemon.find((entry) => entry.id === result.data.id);
        if (foundPokemon) {
          setIsUnlocked(true);
          setIsShiny(foundPokemon.is_shiny);
        } else {
          setIsUnlocked(false);
          setIsShiny(false);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemon]);

  let DecoratedCardFrame: CardFrameComponent;
  if (!isUnlocked) {
    DecoratedCardFrame = LockedCardFrame;
  } else if (isShiny) {
    DecoratedCardFrame = ShinyCardFrame;
  } else {
    DecoratedCardFrame = BaseCardFrame;
  }

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!pokemonData) return <div>No data.</div>;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 30;
    const rotateY = -((centerX - x) / centerX) * 30;

    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
  };

  const primaryType = pokemonData.types?.[0]?.type?.name ?? 'normal';
  const spriteUrl = isShiny
    ? pokemonData.sprites.other?.['official-artwork']?.front_shiny
    : pokemonData.sprites.other?.['official-artwork']?.front_default;
  const types = pokemonData.types ?? [];
  const moves = pokemonData.moves ?? [];
  const stats = pokemonData.stats ?? [];
  const firstMove = moves[0];
  const secondMove = moves[1];
  const firstStat = stats[0];
  const secondStat = stats[1];

  const cardClassName = [styles.card, styles[`card-type-${primaryType}`]].filter(Boolean).join(' ');

  return (
    <div className={styles['card-container']}>
      <DecoratedCardFrame
        className={cardClassName}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h3 className={styles['card-pokemon-name']}>{pokemonData.name}</h3>
        <div className={styles['image-container']}>
          <div className={styles['card-thumbnail-bg']}></div>
          <Image
            src={spriteUrl || '/pokeball.svg'}
            width={100}
            height={100}
            className={styles.sprite}
            style={{
              height: '100%',
              width: 'auto',
              display: 'block',
            }}
            alt={pokemonData.name}
          />
        </div>
        <ul className={styles.types}>
          {types.map((type: PokemonType, index: number) => (
            <li
              key={`type-${index}`}
              className={[styles.type, styles[`type-${type.type.name}`]].join(' ')}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        <ul>
          <li className={styles.move}>
            <p>{firstMove?.move.name ?? ''}</p>
            <p className={styles['move-number']}>{firstStat?.base_stat ?? ''}</p>
          </li>
          <li className={styles.move}>
            <p>{secondMove?.move.name ?? ''}</p>
            <p className={styles['move-number']}>{secondStat?.base_stat ?? ''}</p>
          </li>
        </ul>
        <p className={styles['pokedex-number']}>#{pokemonData.order ?? pokemonData.id}</p>
      </DecoratedCardFrame>
    </div>
  );
}
