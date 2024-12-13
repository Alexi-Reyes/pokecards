import styles from './card.module.css';
import Image from 'next/image';
import Loading from '../Loading/loading';
import { useEffect, useState } from 'react';

export default function Card({ pokemon }) {
    const [pokemonData, setPokemonData] = useState([]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isShiny, setIsShiny] = useState(false);
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

                const localStorageKey = "unlockedPokemons";
                let localStoragePokemon;

                if (localStorage.getItem(localStorageKey) !== null) {
                    localStoragePokemon = JSON.parse(localStorage.getItem(localStorageKey));

                    const foundPokemon = localStoragePokemon.find(pokemon => pokemon.id === result.data.id);
                    if (foundPokemon) {
                        setIsUnlocked(foundPokemon.id);
                        setIsShiny(foundPokemon.is_shiny);
                    }else {
                        setIsUnlocked(false);
                        setIsShiny(false);
                    }
                } else {
                    setIsUnlocked(false);
                    setIsShiny(false);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pokemon]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    const handleMouseMove = (e) => {
        const cardRect = e.target.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 30; 
        const rotateY = -((centerX - x) / centerX) * 30;

        e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
    };

    return (
        <> 
            <div className={styles['card-container']}>
                <div className={
                        [styles['card'], 
                        styles[isUnlocked ? '' : 'locked'],
                        styles[`card-type-${pokemonData.types[0].type.name}`],
                        styles[isShiny ? 'shiny' : '']].join(' ')
                    }
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <h3 className={styles['card-pokemon-name']}>{pokemonData.name}</h3>
                    <div className={styles['image-container']}>
                        <div className={styles['card-thumbnail-bg']}></div>
                        <Image
                            src={
                                isShiny 
                                    ? pokemonData.sprites.other["official-artwork"]["front_shiny"]
                                    : pokemonData.sprites.other["official-artwork"]["front_default"] 
                                }
                                width={100}
                                height={100}
                                style={{
                                    height: "100%",
                                    width: "auto",
                                    display: "block",
                                }}
                            alt={pokemonData.name}
                        />
                    </div>
                    <ul className={styles['types']}>
                        {pokemonData.types.map((type, index) => (
                            <li 
                                key={`type-${index}`} 
                                className={[styles['type'], styles[`type-${pokemonData.types[index].type.name}`]].join(' ')}
                            >
                                {type.type.name}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <li className={styles['move']}>
                            <p>{pokemonData.moves[0].move["name"]}</p>
                            <p className={styles['move-number']}>{pokemonData.stats[0].base_stat}</p>
                        </li>
                        <li className={styles['move']}>
                            <p>{pokemonData.moves.length > 2 ? pokemonData.moves[1].move["name"] : null}</p>
                            <p className={styles['move-number']}>{pokemonData.moves.length > 2 ? pokemonData.stats[1].base_stat : null}</p>
                        </li>
                    </ul>
                    <p className={styles['pokedex-number']}>#{pokemonData.order}</p>
                </div>
            </div>
        </>
    )
}