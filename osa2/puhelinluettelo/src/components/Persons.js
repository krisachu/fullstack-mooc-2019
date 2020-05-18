import React from 'react'

const Persons = (props) => {
    console.log(props)
    return (
        <div>
            <ul>
                {props.persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => props.removeName(person.id)} type="button" className="delete-button">X</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Persons