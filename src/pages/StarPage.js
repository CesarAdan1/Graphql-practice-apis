import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_STAR_CHARACTERS, GET_STAR_FILM } from '../graphql'
import { useParams } from 'react-router'

export const StarPage = () => {
    const {id} = useParams()

    const { loading, data, error } = useQuery(GET_STAR_FILM, {
        variables: { id }
    })

    const character = data.films.find(film => film.episodeID === id)
    
    return(
        <div>
         {loading && <p>Loading...</p>}
         {error && <p>{error.message}</p>}
        <div>
            <h2>{character.title}</h2>
            <span>{character.releaseDate}</span>
            <span>{character.director}</span>
        </div> 
        <div>
           Producers: {character.producers.join(', ')}
        </div>
        <div>
            {character.charactersConnection.characters.map(character => (
               <li key={character.id}>
                    <h2>{character.name}</h2>
                    <span>{character.birthYear}</span>
                    <span>{character.gender}</span>
               </li> 
            ))}
        </div>
        </div>
    )
}


