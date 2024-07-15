// Pages/GeneralPages.js
import React, { Suspense, useState } from "react";
import { Pagination } from "../components/pagination/Pagination";
import { Table } from "../components/table/Table";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_LAUNCHES, GET_POKEMON,  } from "../graphql";
import { ListItem } from "../components/item/ListItem";
import { Link } from "react-router-dom";

export const GeneralPokemonPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pokemonPerPage = 6

  const { loading, data, error } = useQuery(GET_POKEMON, {
    variables: {
      limit: pokemonPerPage,
      offset: (currentPage - 1) * pokemonPerPage
    }
  })

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //pagiancion
  const indexOfLastCountry = currentPage * pokemonPerPage
  const indexOfFirstCountry = indexOfLastCountry - pokemonPerPage
  const currentPokemon = data?.pokemon_v2_pokemon.slice(
      indexOfFirstCountry, indexOfLastCountry
  )
  
  return (
    <div>
      <h1>Pokémon</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <Suspense fallback={<div>Loading pokemon info...</div>}>
       {data && <ul>
          {currentPokemon.map(pokemon => (
            <ListItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
        }
      </Suspense>
      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination
          currentPage={currentPokemon}
          totalPages={Math.ceil(data.pokemon_v2_pokemon.length / countriesPerPage)}
          onPageChange={handlePagination}
        />
      </Suspense>
    </div>
  );
};

export const GeneralCountryPage = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 7;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginación
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = data?.countries?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ) || [];

  let countries = data?.countries || [];

  return (
    <div className="">
      <h2>Countries List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
          <Table countries={currentCountries} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / countriesPerPage)}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  )
}

export const GeneralSpacePage = () => {
  const { loading, data, error } = useQuery(GET_LAUNCHES)

  const launches = data?.launches || []

  return (
    <div>
      <h1>Space Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
        {launches && (launches.map((launch) => (
          <LaunchItem key={launch.id} launch={launch} />
        )))}
     </div>
  );
}
export const LaunchItem = ({launch}) => {
  const [drop, setDrop] = useState(false)

  const handleDropToggle = () => {
    setDrop(!drop)
  }

  return(
    <div>
          <div role="details">
          <Link to={`/missions/${launch.id}`}>
              <span style={{textDecoration: 'underline'}}>Mission: {launch.mission_name}</span>
            </Link>
            <span>Details: {launch.details || "No details available"}</span>
            <span>Year of launch: {launch.launch_year}</span>
            <span>Status: {launch.upcoming ? "Upcoming" : "Completed"}</span>
          </div>
      <button onClick={handleDropToggle}>Show more..</button>
    {drop ?
    (<ul>
        <li key={launch.launch_site.site_id}>
          Site: {launch.launch_site.site_name}
        </li>
    </ul>) : null
    }
    </div>
  )
}