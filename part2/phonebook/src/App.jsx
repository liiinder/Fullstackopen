import { useState, useEffect } from 'react'
import pbService from './services/phonebook'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [persons, setPersons] = useState([])

    useEffect(() => {
        pbService
            .getAll()
            .then(initialPB => {
                setPersons(initialPB)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const checkName = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

        if(checkName && checkName.number !== newPerson.number ){
           if(window.confirm(`Do you want to update ${checkName.name}'s number from ${checkName.number} to ${newNumber} ?`))
           {
                pbService
                    .updateEntry(checkName.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== checkName.id ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        }
        else if(checkName){
            window.alert(`${newName} is already added to phonebook`)
        }
        else {
            pbService
                .createEntry(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
            })
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

    const deletePerson = id => {
        const person = persons.find(p => p.id === id)
        if(window.confirm(`Delete ${person.name} ?`)){
            pbService
                .deleteEntry(id)
            setPersons(persons.filter(p => p.id !== id))
        }
    }

    const filter = (newFilter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

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
            {filter.map(person =>
                <Phonebook
                    person={person}
                    deleteHandler={() => deletePerson(person.id)}
                    key={person.id}
                />
            )}
        </div>
    )
}

export default App