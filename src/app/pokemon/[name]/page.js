// src/app/pokemon/[name]/page.js
import Card from '../../components/Card/Card';

async function fetchPokemonDetail(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  
  return {
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map(type => type.type.name),
    stats: data.stats,
  };
}

export default async function PokemonDetail({ params }) {
  const { name } = params;
  const pokemon = await fetchPokemonDetail(name);
  
  return <Card pokemon={pokemon} />;
}