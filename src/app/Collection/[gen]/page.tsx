import Link from "next/link";
import Card from "../../components/Card/card";
import Navbar from "../../components/Navbar/navbar";
import Selector from "../../components/Selector/selector";
import styles from "./style.module.css";

type Generation = { name: string };
type PokemonData = { id: number; name: string };

type GenerationListResponse = { data: { results: Generation[] } };
type GenerationDetailResponse = { data: { pokemon_species: Array<{ url: string }> } };
type PokemonResponse = { data: PokemonData };

const getGenerations = async (): Promise<Generation[]> => {
    try {
        const response = await fetch(`http://localhost:3000/api/generations`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result: GenerationListResponse = await response.json();
        return result.data.results;
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Unknown error");
        return [];
    }
};

const getPokemonByGeneration = async (gen: string): Promise<PokemonData[]> => {
    try {
        const response = await fetch(`http://localhost:3000/api/generations/${gen}`);
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
        return pokemonData.filter(Boolean) as PokemonData[];
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Unknown error");
        return [];
    }
};

const getPokemon = async (pokemon: string): Promise<PokemonData | null> => {
    try {
        const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result: PokemonResponse = await response.json();
        return result.data;
    } catch (error) {
        console.log(error instanceof Error ? error.message : "Unknown error");
        return null;
    }
};


export default async function Collection({ params }: { params: { gen: string } }) {
    const { gen } = params;
    const generations = await getGenerations();
    const pokemonOfGen = await getPokemonByGeneration(gen);
    console.log(pokemonOfGen)

    return (
        <>
        <Navbar />
        <div className={styles['collection-heading']}>
            <h2 className={styles['collection-title']}>My Collection</h2>
            <Selector generations={generations} gen={gen} />
        </div>
        
        <div className={styles['collection-grid']}>
            {
            gen !== "0" ?
                pokemonOfGen.map((poke) => (
                    <Link 
                        key={poke.name}
                        href={`/Collection/${gen}/${poke.name}`}
                    >
                        <Card pokemon={poke.name} />
                    </Link>
                )) : null
            }
        </div>
        </>
    )
}