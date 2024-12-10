

// function PokemonCard(selectedPokemon) {
//     const pokemonCard = document.createElement('div');
//     const typesText = selectedPokemon.types ? selectedPokemon.types.join(', ') : 'Type non défini';
//     pokemonCard.classList.add('pokemon-card');
//     pokemonCard.innerHTML = `
//         <div class="pokemon-content">
//             <img src="${selectedPokemon.image}" alt="${selectedPokemon.name}">
//             <div>
//                 <h2>${selectedPokemon.name}</h2>
//                 <p>Types: ${typesText}</p>
//                 <p>PV: ${selectedPokemon.hp}</p>
//                 <p>Attaque: ${selectedPokemon.attack}</p>
//                 <p>Nom de l'attaque: ${selectedPokemon.attackName}</p>
//                 <p>Description de l'attaque: ${selectedPokemon.attackDescription}</p>
                
//             </div>
//         </div>
//     `;
//     return pokemonCard;
// }

// export default PokemonCard;

// son image, son nom, son type, ses PV, son attaque, le nom de l'attaque 
// plus la description de l'attaque




// src/app/components/Card/Card.js
import styles from './Card.module.css';

export default function Card({ pokemon }) {
  if (!pokemon) return <div>Pokémon non trouvé</div>;

  return (
    <div className={styles.card}>
      <h1>{pokemon.name}</h1>
      <div className={styles['image-container']}>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <p>Types: {pokemon.types.join(', ')}</p>
      <p>Statistiques:</p>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    </div>
  );
}

