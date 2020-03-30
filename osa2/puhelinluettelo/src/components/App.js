import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])
      console.log('render', persons.length, 'persons')

    const addName = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        const nameObject = {
            name: newName,
            number: newNumber
        }

        const personFound = persons.find(person =>
            person.name === newName
        )

        if (personFound) {
            window.alert(
                `${newName} is already added to phonebook`
            )
        } else {

            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')

        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilterName(event.target.value)
    }

    // jos filterName on tosi (on kirjoitettu tekstiä), silloin namesToShow on persons.filter.
    // muutoin namesToShow on kaikki

    // person.name laitetaan kokonaan pieniksi kirjaimiksi, sen jälkeen includes katsoo sisältääkö pieneksi muutettu henkilön nimi
    // käyttäjän syötteen (filterName), joka on myös muutettu pieneksi, jotta ne vastaavat toisiaan

    const namesToShow = filterName
        ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={filterName} onChange={handleFilterChange} />

            <h2>Add new</h2>

            <PersonForm
                onSubmit={addName}
                nameValue={newName}
                onNameChange={handleNameChange}
                numberValue={newNumber}
                onNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>

            <Persons persons={namesToShow} />
        </div>
    )
}

export default App