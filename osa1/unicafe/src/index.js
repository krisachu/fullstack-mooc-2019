import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    <td>{props.unit}</td>
  </tr>
)

const Statistics = (props) => {

  const allFeedbacks = () => props.good + props.neutral + props.bad
  const thereIsNoFeedback = props.good === 0 && props.neutral === 0 && props.bad === 0;

  const average = () => {
    const goodValue = props.good * 1
    const neutralValue = props.neutral * 0
    const badValue = props.bad * -1

    const averages = goodValue + neutralValue + badValue
    const countAverage = averages / allFeedbacks()

    if (isNaN(countAverage)) {
      return 0
    }
    return countAverage.toPrecision(1)
  }

  const positive = () => {
    const countPercentage = props.good / allFeedbacks() * 100

    if (isNaN(countPercentage)) {
      return 0
    }
    return countPercentage.toPrecision(3)
  }

  return (
    <div>
      <h2>Statistics</h2>
      {thereIsNoFeedback
        ? (
          <p>No feedback given</p>
        ) : (
          <div>
            <table>
              <tbody>
                <Statistic text="Good" value={props.good} />
                <Statistic text="Neutral" value={props.neutral} />
                <Statistic text="Bad" value={props.bad} />
                <Statistic text="All" value={allFeedbacks()} />
                <Statistic text="Average" value={average()} />
                <Statistic text="Positive" value={positive()} unit=" %" />
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
      </div>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
