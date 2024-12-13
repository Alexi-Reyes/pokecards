'use client'

import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/navbar'
import Loading from '../../components/Loading/loading';
import styles from './style.module.css'
import { useEffect, useState } from 'react';

export default function PokemonDetail({ params }) {
    const { id } =  params;
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setPokemonData(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
  
    return (
        <>
            <Navbar />
            <div className={styles['page-content']}>
                <Card pokemon={pokemonData.name} />
            </div>
        </>
    );
}