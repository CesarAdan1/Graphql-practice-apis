import { useQuery } from '@apollo/client'
import React, { Suspense, useState } from 'react'
import { GET_STAR_CHARACTERS } from '../graphql'
import { Pagination } from '../components/pagination/Pagination'
import { Link } from 'react-router-dom'

export const StarFullPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { loading, data, error } = useQuery(GET_STAR_CHARACTERS)

    const resultPerPage = 4

    const handlePagination = (page) => {
        setCurrentPage(page)
    }

    const indexOfLastCharacter = currentPage * resultPerPage
    const indexOfFirstCharacter = indexOfLastCharacter - resultPerPage
    const currentCharacters = data?.allFilms.films?.slice(
        indexOfFirstCharacter, indexOfLastCharacter
    )

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
                {currentCharacters && (currentCharacters.map(details => (
                    <StarDetail key={details.episodeID} starsInfo={details} />
                )))}
            <Pagination 
                currentPage={currentPage}
                totalPages={Math.ceil(data?.films?.length / resultPerPage)}
                onPageChange={handlePagination}
            />
        </div>
    )
}

export const StarDetail = ({starInfo}) => {
    return (
        <div>
            <Link to={`/star/${starInfo.episodeID}`}>
            <h2>{starInfo.title}</h2>
            <span>{starsInfo.releaseDate}</span>
            <span>{starsInfo.director}</span>
            </Link>
        </div>
    )
}