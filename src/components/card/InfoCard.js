import React from 'react'

const InfoCard = ({info}) => {
  return (
    <div>
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
  )
}

export default InfoCard
