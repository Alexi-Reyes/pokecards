'use client';

import { useEffect, useState } from 'react';
import Card from '../../../components/Card/card';
import Loading from '../../../components/Loading/loading';
import Navbar from '../../../components/Navbar/navbar';
import styles from './style.module.css';
import { AppConfig } from '@/config';

type PokemonData = { name: string };
type PokemonResponse = { data: PokemonData };

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${AppConfig.localApiUrl}/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: PokemonResponse = await response.json();
        setPokemonData(result.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!pokemonData) return <div>No data.</div>;

  return (
    <>
      <Navbar />
      <div className={styles['page-content']}>
        <Card pokemon={pokemonData.name} />
      </div>
    </>
  );
}
