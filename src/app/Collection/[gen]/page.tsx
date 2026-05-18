import Link from "next/link";
import Card from "../../components/Card/card";
import Navbar from "../../components/Navbar/navbar";
import Selector from "../../components/Selector/selector";
import styles from "./style.module.css";
import { AppConfig } from "@/app/config";

import type { GenerationBasicInfo, PokemonData, ApiResponse, PaginatedResponse } from "@/types";
import { getPokemonByGeneration, getGenerations } from "@/adapters/generationAdapter";
import { getPokemon } from "@/adapters/pokemonAdapter";

export default async function Collection({ params }: { params: { gen: string } }) {
    const { gen } = params;
    const generations = await getGenerations();
    const pokemonOfGen = gen !== "0" ? await getPokemonByGeneration(gen) : [];

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
                pokemonOfGen.map((pokeName) => (
                    <Link 
                        key={pokeName}
                        href={`/Collection/${gen}/${pokeName}`}
                    >
                        <Card pokemon={pokeName} />
                    </Link>
                )) : null
            }
        </div>
        </>
    )
}