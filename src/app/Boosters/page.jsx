'use client'

import Navbar from '../components/Navbar/navbar'
import Card from '../components/Card/card'
import styles from './style.module.css'
import { useEffect, useState } from 'react';

export default function Boosters() {
    const [generations, setGenerations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGeneration, setSelectedGeneration] = useState('');
    const [pokemonOfGen, setPokemonOfGen] = useState([]);
    const [pokemonOfBooster, setPokemonOfBooster] = useState([]); // State to hold the selected Pokémon
    const [showCards, setShowCards] = useState(false); // State to control card visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setGenerations(result.data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getPokemonByGeneration = async () => {
            if (!selectedGeneration) return;

            try {
                const response = await fetch(`http://localhost:3000/api/generations/${selectedGeneration}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const pokemonPromises = result.data.pokemon_species.map(async (pokemon) => {
                    const extractedPokemonId = pokemon.url.match(/(\d+)(?=\/$)/)[0];
                    return await getPokemon(extractedPokemonId);
                });
                const pokemonData = await Promise.all(pokemonPromises);
                setPokemonOfGen(pokemonData);
            } catch (error) {
                setError(error.message);
            }
        };

        getPokemonByGeneration();
    }, [selectedGeneration]);

    const getPokemon = async (pokemon) => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            setError(error.message);
        }
    };

    const openBooster = () => {
        if (pokemonOfGen.length === 0) {
            console.log("No Pokémon available to open.");
            return;
        }

        let selectedPokemon = [];
        const pokemonOfGenNumber = pokemonOfGen.length;

        const localStorageKey = 'unlockedPokemons';
        let localStoragePokemon;

        if (localStorage.getItem(localStorageKey) !== null) {
            localStoragePokemon = JSON.parse(localStorage.getItem(localStorageKey))
        } else {
            localStoragePokemon = []
        }

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonOfGenNumber);
            const gottenPokemon = pokemonOfGen[randomIndex];

            const isAlreadyUnlocked = localStoragePokemon.some(id => id.id === gottenPokemon.id);
            if (!isAlreadyUnlocked) {
                const is_Shiny = Math.random() <= 0.1; // Shiny logic
                const unlockedPokemon = {
                    id: gottenPokemon.id,
                    is_shiny: is_Shiny
                };
    
                localStoragePokemon.push(unlockedPokemon);
                localStorage.setItem(localStorageKey, JSON.stringify(localStoragePokemon));
            }
            selectedPokemon.push(gottenPokemon);
        }

        setPokemonOfBooster(selectedPokemon); // Set the selected Pokémon
        setShowCards(true); // Show the cards
        console.log("Pokémon of booster:", selectedPokemon);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Navbar />
            <h2>Boosters</h2>
            <div className={styles['cards-area']}>
                {showCards && pokemonOfBooster.map((pokemon) => (
                    <Card key={pokemon.id} pokemon={pokemon.id} /> // Render a card for each Pokémon
                ))}
            </div>
            <div className={styles['button-div']}>
                <button onClick={openBooster}>Open</button>
                <select 
                    name="generations" 
                    id="dropdown-gen"
                    value={selectedGeneration}
                    onChange={(event) => setSelectedGeneration(event.target.value)}
                >
                    {generations.map((gen) => (
                        <option key={gen.name} value={gen.name}>{gen.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}