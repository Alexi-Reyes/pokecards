'use client';

import { useEffect, useState } from 'react';
import Card from '../components/Card/card';
import Loading from '../components/Loading/loading';
import Navbar from '../components/Navbar/navbar';
import styles from './style.module.css';

import type { GenerationBasicInfo, PokemonData } from '@/types';
import { pokemonAdapter } from '@/adapters/pokemonAdapter';
import { generationAdapter } from '@/adapters/generationAdapter';
import { unlockedPokemonRepository } from '@/repositories/unlockedPokemonRepository';

export default function Boosters() {
  const [generations, setGenerations] = useState<GenerationBasicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState('none');
  const [pokemonOfGen, setPokemonOfGen] = useState<PokemonData[]>([]);
  const [pokemonOfBooster, setPokemonOfBooster] = useState<PokemonData[]>([]);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const results = await generationAdapter.getAll();
        setGenerations(results);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGenerations();
  }, []);

  useEffect(() => {
    const fetchPokemonByGeneration = async () => {
      if (!selectedGeneration || selectedGeneration === 'none') return;

      try {
        const generation = await generationAdapter.getById(selectedGeneration);
        const pokemonPromises = generation.pokemonSpecies.map(async (species) => {
          const extractedPokemonId = species.url.match(/(\d+)(?=\/$)/)?.[0];
          if (!extractedPokemonId) return null;
          return (await pokemonAdapter.getById(extractedPokemonId)) as unknown as PokemonData;
        });
        const pokemonData = await Promise.all(pokemonPromises);
        setPokemonOfGen(pokemonData.filter(Boolean) as PokemonData[]);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchPokemonByGeneration();
  }, [selectedGeneration]);

  const openBooster = () => {
    if (loading) return;

    if (pokemonOfGen.length === 0) {
      console.log('No Pokémon available to open.');
      return;
    }

    let selectedPokemon = [];
    const pokemonOfGenNumber = pokemonOfGen.length;

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * pokemonOfGenNumber);
      const gottenPokemon = pokemonOfGen[randomIndex];

      if (!unlockedPokemonRepository.isUnlocked(gottenPokemon.id)) {
        unlockedPokemonRepository.add({
          id: gottenPokemon.id,
          is_shiny: Math.random() <= 0.1,
        });
      }
      selectedPokemon.push(gottenPokemon);
    }

    setPokemonOfBooster(selectedPokemon);
    setShowCards(true);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <h2 className={styles['page-title']}>Boosters</h2>
      <div className={styles['cards-area']}>
        {showCards &&
          pokemonOfBooster.map((pokemon, index) => (
            <Card key={`${pokemon.id}-${index}`} pokemon={pokemon.id} />
          ))}
      </div>
      <div className={styles['button-div']}>
        <button onClick={openBooster}>Open</button>
        <select
          name="generations"
          id="dropdown-gen"
          value={selectedGeneration}
          onChange={(event) => {
            const value = event.target.value;
            if (value === 'none') {
              setSelectedGeneration('none');
              return;
            }
            setSelectedGeneration(value);
          }}
        >
          <option value="none">Select Generation</option>
          {generations.map((gen) => (
            <option key={gen.name} value={gen.name}>
              {gen.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
