import { useState } from "react";
import { Link } from "react-router-dom";

export const Character = ({ character }) => {
  const [toggle, setToggle] = useState(false);

  const handleDropToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="character-content">
      <Link to={`/character/${character.id}`}>
        <img
          width={200}
          height={80}
          className="character-image"
          src={character.image}
          alt={character.name}
        />
        <h2>{character.name}</h2>
      </Link>
      <button style={{ cursor: "pointer" }} onClick={handleDropToggle}>
        Mas
      </button>
      {toggle ? (
        <div className="character-toggle-cont">
          {character.episode.map((ep) => (
            <div key={ep.id}>
              <span>Episode: {ep.name}</span>
              <span>Air date: {ep.air_date}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const Pokemon = ({ pokemon }) => {
  return <div></div>;
};

export const SpaceItem = ({ space }) => {
  return <div></div>;
};

export const Country = ({ country }) => {
  return <div></div>;
};
