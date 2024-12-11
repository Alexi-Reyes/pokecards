import styles from './card.module.css';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Card({ pokemon }) {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
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
    }, [pokemon]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className={styles['card']}>
                <h3>{pokemonData.name}</h3>
                <div className={styles['image-container']}>
                    <Image
                        src={pokemonData.sprites.other["official-artwork"]["front_default"]}
                        width={200}
                        height={200}
                        alt={pokemonData.name}
                    />
                </div>
                <span>{pokemonData.moves[0].move["name"]}</span>
                <h4>Types:</h4>
                <ul>
                    {pokemonData.types.map(type => (
                        <li key={type.type.name}>{type.type.name}</li>
                    ))}
                </ul>
                <h4>Stats:</h4>
                <ul>
                    {pokemonData.stats.map(stat => (
                        <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}