import { useState } from 'react'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad
    if (sum === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text='Good' value={good} />
                    <StatisticLine text='Neutral' value={neutral} />
                    <StatisticLine text='Bad' value={bad} />
                    <StatisticLine text='All' value={sum} />
                    <StatisticLine text='Average' value={Math.round((((good - bad) / sum) + Number.EPSILON) * 100) / 100} />
                    <StatisticLine text='Positive' value={`${Math.round(((good / sum * 100) + Number.EPSILON) * 100) / 100} %`} />
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={handleGoodClick} text="Good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App