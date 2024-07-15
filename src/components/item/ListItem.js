import React from 'react'

export const ListItem = ({ pokemon }) => {
    return (
        <div>
            <li style={{ display: 'flex' }}>
                <Link to={`/pokemon/${pokemon.name}`}>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </Link>
                <div>
                    <span>{pokemon.types.map((type) => type.type.name).join(', ')}</span>
                </div>
            </li>
        </div>
    );
}