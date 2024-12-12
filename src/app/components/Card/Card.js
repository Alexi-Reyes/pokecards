

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
  const typeClass = pokemon.types.length > 0 ? `type-${pokemon.types[0]}` : '';
  return (
    <div className={styles['card-container']}> 
      <div className={`${styles['card']} ${styles[typeClass]}`}>
        
        <div className={styles['header']}>
          <h3 className={styles['h3']}>{pokemon.name}</h3>
          <div className={styles['hp']}>
            <p className={styles['p']}>HP</p>
            <h3>{pokemon.stats[0].base_stat}</h3>
          </div>
          
        </div>
        
        <div className={styles['image-container']}>
          <div className={styles['imagebg-container']}></div>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        
        <p className={styles['p']}>{pokemon.types.join(', ')}</p>


        <div className={styles['capacite']}>

          <div className={styles['attaque']}>
            <h3>azerty{pokemon.attaque}</h3>
            <h3>{pokemon.stats[1].base_stat}</h3>
            {/* <h3>azerty{pokemon.attaque} {pokemon.stats[1].base_stat}</h3>
            <h3>{pokemon.stats[2].stat.name} {pokemon.stats[2].base_stat}</h3> */}
          </div>

          <div className={styles['defense']}>
            <h3>{pokemon.stats[2].stat.name} </h3> 
            <h3>{pokemon.stats[2].base_stat}</h3> 
          </div>

        </div>

        


        {/* <p>Types: {pokemon.types.join(', ')}</p>
        <p>Statistiques:</p>
        <ul>
          <span>{pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}</span>
          {pokemon.stats.map(stat => (
            <li className={styles['li']} key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

