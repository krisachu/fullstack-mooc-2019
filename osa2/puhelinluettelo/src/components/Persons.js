import React from 'react'

const Persons = (props) => {
    console.log(props)
    return (
        <div>
            <ul>
                {props.persons.map(person =>
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Persons