import Link from 'next/link';
import Card from '../../components/Card/card';
import Navbar from '../../components/Navbar/navbar'
import Selector from '../../components/Selector/selector'
import styles from './style.module.css'

const getGenerations = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/generations`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result.data.results;
    } catch (error) {
        console.log(error.message);
    }
};

const getPokemonByGeneration = async (gen) => {
    const pokemonOfGen = [];
    try {
        const response = await fetch(`http://localhost:3000/api/generations/${gen}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const pokemonPromises = result.data.pokemon_species.map(async (pokemon, index) => {
            const extractedPokemonId = pokemon.url.match(/(\d+)(?=\/$)/)[0];
            await getPokemon(extractedPokemonId, pokemonOfGen);
            setTimeout(() => {
                //
            }, 200);
        });
        await Promise.all(pokemonPromises);
        return pokemonOfGen;
    } catch (error) {
        console.log(error.message);
    }
};


const getPokemon = async (pokemon, pokemonOfGen) => {
    try {
        const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        pokemonOfGen.push(result.data);
    } catch (error) {
        setError(error.message);
    }
};


export default async function Collection({ params }) {
    const { gen } =  await params;
    const generations = await getGenerations();
    const pokemonOfGen = await getPokemonByGeneration(gen);
    console.log(pokemonOfGen)

    return (
        <>
        <Navbar></Navbar>
        <div className={styles['collection-heading']}>
            <h2 className={styles['collection-title']}>My Collection</h2>
            {/* <select 
                name="generations" 
                id="dropdown-gen"
                onChange={(event) => router.push(`/Collection/${event.target.value}`)}
            >
                <option value="none">Select Generation</option>
                {generations.map((gen) => (
                    <option key={gen.name} value={gen.name}>{gen.name}</option>
                ))}
            </select> */}
            <Selector generations={generations} gen={gen} />
        </div>
        
        <div className={styles['collection-grid']}>
            {
            gen != 0 ?
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