import { useState } from 'react'

const Phonebook = ({ filter }) => {
    return (
        filter.map(person =>
            <li key={person.name}>{person.name} - {person.number}</li>
        )
    )
}

const Filter = ({ text, newFilter, handleFilter }) => {
    return (
        <form>
            {text}<input value={newFilter} onChange={handleFilter} />
        </form>
    )
}

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={handleNewName} />
                <br />
                Number: <input value={newNumber} onChange={handleNewNumber} />
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '0703892506'
        }
    ])
    const filter = (newFilter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const checkName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

        if(checkName){
            window.alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter text="Filter phonebook by: " newFilter={newFilter} handleFilter={handleFilter} />
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber} />
            <h2>Numbers</h2>
            <Phonebook filter={filter} />
        </div>
    )
}

export default App