import React from 'react'

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.courseName}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => (
                <Part
                    key={part.id}
                    part={part.name}
                    exercises={part.exercises}
                />
            ))}
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((previousValue, value) =>
        previousValue + value.exercises, 0)

    return (
        <p><strong>
            Total of {total} exercises
        </strong></p>
    )
}

export default Course