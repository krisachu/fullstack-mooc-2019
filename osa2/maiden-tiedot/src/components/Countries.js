import React from 'react'

const Countries = (props) => {

    // Jos ehdon täyttäviä maita on liikaa (yli 10),
    // kehoitetaan tarkentamaan hakuehtoa

    if (props.countries.length > 10) {

        return (
            <div>Too many countries, specify your search.</div>
        )
    }

    // Kun ehdon täyttäviä maita on enää yksi,
    // näytetään maan perustiedot, lippu sekä siellä puhutut kielet

    if (props.countries.length === 1) {

        return (
        
                <div>
                    {props.countries.map(country =>
                        <div key={country.alpha2Code}>
                            <h1>{country.name}</h1>
                            <p>Capital {country.capital}</p>
                            <p>Population {country.population}</p>
                            <h3>Languages</h3>
                            <ul>
                                {country.languages.map(language => 
                                    <li key={language.name}>
                                        {language.name}
                                    </li>
                                    )}
                            </ul>
                            <img src={country.flag} width="10%" alt="Flag of a country"/>
                        </div>
                    )}
                </div>
            )
        }
    
    return (
        <div>
            {props.countries.map(country =>
                <div key={country.alpha2Code}>
                    {country.name}
                </div>
            )}
        </div>
    )
}

export default Countries