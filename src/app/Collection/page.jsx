'use client';

import Link from 'next/link';
import Card from '../components/Card/card';
import Navbar from '../components/Navbar/navbar'
import styles from './style.module.css'
import { useEffect, useState } from 'react';

export default function Collection() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pokemon/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setPokemon(result.data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Navbar></Navbar>
        <h2 className={styles['collection-title']}>My Collection</h2>
        
        <div className={styles['collection-grid']}>
            {pokemon.map((poke) => (
                <Link 
                    key={poke.name}
                    href={`/Collection/${poke.name}`}
                >
                    <Card pokemon={poke.name} />
                </Link>
            ))}
        </div>
        </>
    )
}