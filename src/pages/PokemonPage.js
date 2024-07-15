import React from "react";
import { GET_POKEMON_DETAILS } from "../graphql";
import { useParams } from "react-router";

export const PokemonPage = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name },
  });

  const pokemon = data.pokemon_v2_pokemon[0];

  return (
    <div>
      <h1>{pokemon.name}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <h2>Types</h2>
      <ul>
        {pokemon.pokemon_v2_pokemontypes.map((type) => (
          <li key={type.pokemon_v2_type.name}>{type.pokemon_v2_type.name}</li>
        ))}
      </ul>
    </div>
  );
};
