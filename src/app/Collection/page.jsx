
import Link from 'next/link';
import Card from '../components/Card/card';
import Navbar from '../components/Navbar/navbar'
import Selector from '../components/Selector/s'
import Loading from '../components/Loading/loading'
import styles from './style.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Collection() {
    // const [generations, setGenerations] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [selectedGeneration, setSelectedGeneration] = useState('');
    // const [pokemonOfGen, setPokemonOfGen] = useState([]);
    // const [pokemonOfBooster, setPokemonOfBooster] = useState([]); // State to hold the selected Pokémon
    // const [showCards, setShowCards] = useState(false); // State to control card visibility

    // const router = useRouter()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3000/api/generations');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const result = await response.json();
    //             setGenerations(result.data.results);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const getPokemonByGeneration = async () => {
    //         if (!selectedGeneration) return;

    //         try {
    //             const response = await fetch(`http://localhost:3000/api/generations/${selectedGeneration}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const result = await response.json();
    //             const pokemonPromises = result.data.pokemon_species.map(async (pokemon) => {
    //                 const extractedPokemonId = pokemon.url.match(/(\d+)(?=\/$)/)[0];
    //                 return await getPokemon(extractedPokemonId);
    //             });
    //             const pokemonData = await Promise.all(pokemonPromises);
    //             setPokemonOfGen(pokemonData);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     getPokemonByGeneration();
    // }, [selectedGeneration]);

    // const getPokemon = async (pokemon) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const result = await response.json();
    //         return result.data;
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };

    // if (loading) return <Loading />;
    // if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Navbar></Navbar>
        <div className={styles['collection-heading']}>
            <h2 className={styles['collection-title']}>My Collection</h2>
            {/* <select 
                name="generations" 
                id="dropdown-gen"
                value={selectedGeneration}
                onChange={(event) => router.push(`/Collection/${event.target.value}`)}
            >
                <option value="none">Select Generation</option>
                {generations.map((gen) => (
                    <option key={gen.name} value={gen.name}>{gen.name}</option>
                ))}
            </select> */}
            <Selector />
        </div>
        
        </>
    )
}