import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/notes'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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

            const confirmed = window.confirm(
                `${newName} is already added to phonebook, replace the old number with the new one?`
            )

            const updatedPerson = {
                ...personFound, number: newNumber 
            }

            if (confirmed) {
                personService
                    .update(updatedPerson)
                    .then(returnedPerson => {
                        setMessage(
                            `${newName}'s number has been updated`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        // Jos listan id:t ei mätsää .. palautetaan alkuperäinen lista
                        // Muussa tapauksessa palautetaan päivitetty lista
                        setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        console.log('Palautettu', returnedPerson)
                    })
            }
        } else {
            personService
                .create(nameObject)
                .then(returnedPerson => {
                    setMessage(
                        `${newName} has been added`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const removeName = (id) => {

        const personFound = persons.find(person => person.id === id)

        console.log(personFound)

        if (personFound) {
            if (window.confirm(`Do you want to remove ${personFound.name} ?`)) {
                personService
                    .remove(id)
                    .then(response => {
                        setMessage(
                            `${personFound.name} has been removed`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(persons.filter(person => person.id !== id))
                    })
                    .catch(error => {
                        alert(
                            `${personFound.name} was already deleted from server`
                        )
                        setPersons(persons.filter(person => person.id !== id))
                    })
            }
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
            <h1>Phonebook</h1>

            <Notification message={message} />

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

            <Persons persons={namesToShow} removeName={removeName} />

        </div>
    )
}

export default App