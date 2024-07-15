import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_CHARACTERS } from "../graphql";

export const CharacterPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.characters.results.find((char) => char.id === id);

  return (
    <div className="character-details">
      <h1>{character.name}</h1>
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      />
      <div className="episode-list">
        {character.episode.map((ep) => (
          <div key={ep.id}>
            <span>Episode: {ep.name}</span>
            <span>Air date: {ep.air_date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
