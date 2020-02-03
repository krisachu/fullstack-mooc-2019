import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = (props) => {
    const [index, setIndex] = useState(0) // yleinen tila (paikka) kaikelle (sekä anekdoottien että listan paikka, ts kaiken)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]) // votes-listan aloitustila

    console.log(index)

    const voteAnecdote = () => {
        const copyOfVotes = [...votes] // tehdään kopio listasta
        copyOfVotes[index] += 1 // kopioidun _listan_ indeksipaikalle lisätään 1
        return setVotes(copyOfVotes) // viedään muutos konkreettisesti tilaan (listan tilaan)
    }

    const randomizeAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length)
        return setIndex(randomIndex)
    }

    const highestIndex = votes.indexOf(Math.max(...votes));

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[index]}
            <br />
            <p>Has {votes[index]} votes</p>
            <br />
            <Button handleClick={() => voteAnecdote()} text='Vote' />
            <Button handleClick={() => randomizeAnecdote()} text='Next anecdote' />
            <h2>Anecdote with most votes</h2>
            {props.anecdotes[highestIndex]}
            <br />
            <p>Has {votes[highestIndex]} votes</p>
        </div>
    )
}

const anecdotes = [
    'The best way to get a project done faster is to start sooner.',
    'I think it is a new feature. Do not tell anyone it was an accident.',
    'Before software can be reusable it first has to be usable.',
    'Inside every large program, there is a small program trying to get out.',
    'Better train people and risk they leave - than do nothing and risk they stay.',
    'Make everything as simple as possible, but not simpler.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));