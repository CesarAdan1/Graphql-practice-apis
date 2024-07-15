import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql";
import { Character } from "./card/Character";
import { Link } from "react-router-dom";

export const FilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedCharacters, setSuggestedCharacters] = useState([]);

  const { loading, data, error } = useQuery(GET_CHARACTERS);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar personajes basados en el término de búsqueda
    if (value.trim() !== "") {
      const filtered = data?.characters.results.filter((character) =>
        character.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedCharacters(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestedCharacters([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (characterName) => {
    setSearchTerm(characterName);
    setShowSuggestions(false);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
      </form>
      {showSuggestions && (
        <ul>
          {suggestedCharacters.map((character) => (
            <li key={character.id} onClick={() => handleSuggestionClick(character.name)}>
              <Link to={`/characters/${character.id}`}><h2>{character.name}</h2></Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}