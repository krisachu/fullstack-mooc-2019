import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'
import Filter from './Filter'

const App = () => {

    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setCountryFilter(event.target.value)
    }

    const countriesToShow = countryFilter ? countries.filter(country =>
        country.name.toLowerCase().includes(countryFilter.toLowerCase())) : countries
        console.log('countriestoshow', countriesToShow)

    // Käytetään Axiosta selaimen ja palvelimen väliseen kommunikaatioon

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    console.log('render', countries.length, 'countries')
    console.log(countries)

    return (
        <div>
            <Filter value={countryFilter} onChange={handleFilterChange} />
            <Countries countries={countriesToShow}/>
        </div>
    )
}

export default App
