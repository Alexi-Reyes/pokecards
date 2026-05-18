"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card/card";
import Loading from "../components/Loading/loading";
import Navbar from "../components/Navbar/navbar";
import styles from "./style.module.css";

type Generation = { name: string };
type PokemonData = { id: number; name: string };
type UnlockedPokemon = { id: number; is_shiny: boolean };

type GenerationListResponse = { data: { results: Generation[] } };
type GenerationDetailResponse = { data: { pokemon_species: Array<{ url: string }> } };
type PokemonResponse = { data: PokemonData };

export default function Boosters() {
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGeneration, setSelectedGeneration] = useState("none");
    const [pokemonOfGen, setPokemonOfGen] = useState<PokemonData[]>([]);
    const [pokemonOfBooster, setPokemonOfBooster] = useState<PokemonData[]>([]);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: GenerationListResponse = await response.json();
                setGenerations(result.data.results);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getPokemonByGeneration = async () => {
            if (!selectedGeneration || selectedGeneration === "none") return;

            try {
                const response = await fetch(`http://localhost:3000/api/generations/${selectedGeneration}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: GenerationDetailResponse = await response.json();
                const pokemonPromises = result.data.pokemon_species.map(async (pokemon) => {
                    const extractedPokemonId = pokemon.url.match(/(\d+)(?=\/$)/)?.[0];
                    if (!extractedPokemonId) return null;
                    return await getPokemon(extractedPokemonId);
                });
                const pokemonData = await Promise.all(pokemonPromises);
                setPokemonOfGen(pokemonData.filter(Boolean) as PokemonData[]);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unknown error");
            }
        };

        getPokemonByGeneration();
    }, [selectedGeneration]);

    const getPokemon = async (pokemon: string): Promise<PokemonData | null> => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: PokemonResponse = await response.json();
            return result.data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
            return null;
        }
    };

    const openBooster = () => {
        if (loading) return;

        if (pokemonOfGen.length === 0) {
            console.log("No Pokémon available to open.");
            return;
        }

        let selectedPokemon = [];
        const pokemonOfGenNumber = pokemonOfGen.length;

        const localStorageKey = 'unlockedPokemons';
        const stored = localStorage.getItem(localStorageKey);
        let localStoragePokemon: UnlockedPokemon[] = [];
        if (stored) {
            localStoragePokemon = JSON.parse(stored) as UnlockedPokemon[];
        }

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonOfGenNumber);
            const gottenPokemon = pokemonOfGen[randomIndex];

            const isAlreadyUnlocked = localStoragePokemon.some((entry) => entry.id === gottenPokemon.id);
            if (!isAlreadyUnlocked) {
                const is_Shiny = Math.random() <= 0.1;
                const unlockedPokemon = {
                    id: gottenPokemon.id,
                    is_shiny: is_Shiny
                };
    
                localStoragePokemon.push(unlockedPokemon);
                localStorage.setItem(localStorageKey, JSON.stringify(localStoragePokemon));
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
                {showCards && pokemonOfBooster.map((pokemon, index) => (
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
                        if (value === "none") {
                            setSelectedGeneration("none");
                            return;
                        }
                        setSelectedGeneration(value);
                    }}
                >
                    <option value="none">Select Generation</option>
                    {generations.map((gen) => (
                        <option key={gen.name} value={gen.name}>{gen.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
