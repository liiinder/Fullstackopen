import { useState } from 'react'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Anecdotes = ({ anecdote, votes }) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    )
}

const MostVotes = ({ anecdote, votes }) => {
    if (votes === 0) {
        return <p>No votes has been placed</p>
    }
    return <Anecdotes anecdote={anecdote} votes={votes} />
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleSelected = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const handleVote = () => {
        const newVote = [ ...votes ]
        newVote[selected] += 1
        setVotes(newVote)
    }

    const max = Math.max(...votes)
    const index = votes.indexOf(max)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button text="Vote" onClick={handleVote} />
            <Button text="Next anecdote" onClick={handleSelected} />
            <h1>Anectode with most votes</h1>
            <MostVotes anecdote={anecdotes[index]} votes={max} />
        </div>
    )
}

export default App