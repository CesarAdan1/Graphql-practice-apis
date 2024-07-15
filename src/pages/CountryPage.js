import React, { useEffect } from "react";
import { useQuery } from '@apollo/client'
import { GET_COUNTRIES } from "../graphql";
import { useParams } from "react-router";

export const CountryPage = () => {
  const { loading, data, error } = useQuery(GET_COUNTRIES)
  const { code } = useParams()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const country = data.countries.find(country => (country.code).toLowerCase() === (code).toLowerCase())
  
  if(!country) return <p>Country not found</p>
  
  return (
    <div>
        <div key={country.code}>
          <h2>{country.name}{' '}/{' '}{country.capital}</h2>
          <h3>Spoken languages</h3>
          <ul>
            {country.languages.map(lang => (
              <div>
                <li key={lang.code}>
                  <span>My native language is: {lang.native}</span>
                  <span>My other languages are: {lang.name}</span>
                </li>
              </div>
            ))}
          </ul>
        </div>
    </div>
  )
}
