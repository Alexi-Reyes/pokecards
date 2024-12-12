// "use client";
// import { useEffect } from "react";
// import styles from "./page.module.css";

// export default function Home() {
//   useEffect(() => {
//     function displayPokemonList() {
//       fetch("https://pokeapi.co/api/v2/pokemon?limit=1008")
//         .then((response) => response.json())
//         .then((data) => {
//           const pokemonListContainer = document.querySelector("#allPokemonList");
//           if (!pokemonListContainer) {
//             console.error("Element with ID 'allPokemonList' not found.");
//             return;
//           }

//           const listElement = document.createElement("ul");
//           listElement.classList.add("pokemon-list");

//           data.results.forEach((pokemon) => {
//             const listItem = document.createElement("li");
//             const nameElement = document.createElement("strong");
//             nameElement.textContent = pokemon.name;
//             listItem.appendChild(nameElement);

//             fetch(pokemon.url)
//               .then((response) => response.json())
//               .then((pokemonData) => {
//                 const typesElement = document.createElement("div");
//                 const typesText = "Types: " + pokemonData.types.map(type => `<strong>${type.type.name}</strong>`).join(", ");
//                 typesElement.innerHTML = typesText;
//                 listItem.appendChild(typesElement);

//                 const imageElement = document.createElement("img");
//                 imageElement.src = pokemonData.sprites.front_default;
//                 listItem.appendChild(imageElement);
//               })
//               .catch((error) => {
//                 console.error("Error fetching pokemon data:", error);
//               });
//             listElement.appendChild(listItem);
//           });

//           pokemonListContainer.appendChild(listElement);
//         })
//         .catch((error) => {
//           console.error("Error fetching pokemon list:", error);
//         });
//     }

//     displayPokemonList();
//   }, []);

//   return (
//     <div id="allPokemonList" className={styles.page}>
//       {/* Le contenu de la liste des Pokémon sera ajouté ici */}
//     </div>
//   );
// }


// src/app/page.js

// import Card from './components/Card/Card';

import Link from 'next/link';

async function fetchPokemonDetails() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
  const data = await res.json();
  
  const detailedPokemonList = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonDetails = await fetch(pokemon.url);
      const details = await pokemonDetails.json();
      return {
        name: details.name,
        image: details.sprites.front_default,
        types: details.types.map(type => type.type.name),
        attaque : details.moves[0].move["name"],
      };
    })
  );

  return detailedPokemonList;
}

export default async function PokemonList() {
  const pokemonList = await fetchPokemonDetails();
  
  return (
    <div>
      <h1>Liste des Pokémon</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <div>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>Types: {pokemon.types.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



