import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql";
import { Character } from "../components/card/Character";
import { Pagination } from "../components/pagination/Pagination";
import { FilterBar } from "../components/SearchComponent";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const charactersPerPage = 6;

  const { loading, data, error } = useQuery(GET_CHARACTERS);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Paginación
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = data?.characters.results.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <div className="container">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {currentCharacters &&
          currentCharacters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data?.characters.results.length / charactersPerPage)}
        onPageChange={handlePagination}
      />
    </div>
  );
};
