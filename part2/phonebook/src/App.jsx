import { useState, useEffect } from 'react'
import pbService from './services/phonebook'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [persons, setPersons] = useState([])
    const [notification, setNotification] = useState([])

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
                        setNotification(['notification', `${newName}'s number is updated to ${newNumber}`])
                        setTimeout(() => {
                            setNotification([])
                        }, 5000)
                    })
            }
        }
        else if(checkName){
            setNotification(['error', `${checkName.name} is already in the phonebook with this number`])
                setTimeout(() => {
                setNotification([])
            }, 5000)
        }
        else {
            pbService
                .createEntry(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotification(['notification', `Added ${returnedPerson.name}`])
                    setTimeout(() => {
                        setNotification([])
                    }, 5000)
            })
        }
    }
    console.log(`notification`, notification);
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
        console.log(`person`, person)
        if(window.confirm(`Delete ${person.name} ?`)){
            pbService
                .deleteEntry(id)
                .then(() => {
                    setNotification(['notification', `${person.name} has been deleted`])
                    setTimeout(() => {
                        setNotification([])
                    }, 5000)
                })
                .catch(error => {
                    setNotification(['error', `${person.name} was already deleted from server`])
                    setTimeout(() => {
                        setErrorMessage([])
                    }, 5000)
                })
            setPersons(persons.filter(p => p.id !== id))
        }
    }

    const filter = (newFilter === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
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