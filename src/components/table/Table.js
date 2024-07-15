import React from 'react'
import { Link } from 'react-router-dom';

export const Table = ({ countries }) => {
    if (!countries || countries.length === 0) return <div>No data available</div>;
    
    const columns = ['Code', 'Capital', 'Name', 'Continent', 'Languages'];
    
    return (
      <div className="table-container">
      <table role="data-table" className='custom-table'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.code}>
              <td>{country.code}</td>
              <td>{country.capital}</td>
              <td>
                <Link style={{textEmphasis: 'GrayText', cursor: 'pointer'}} 
                to={`/country/${(country.code).toLowerCase()}`}>
                  {country.name}
                </Link>
              </td>
              <td>{country.continent.name}</td>
              <td>
                {country.languages.length > 1 ? 
                  country.languages.map((language, index) => (
                    <span key={language.code}>
                      {language.name}{index < country.languages.length - 1 && ', '}
                    </span>
                  ))
                : <span key={country.code}>{country.languages.name}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }