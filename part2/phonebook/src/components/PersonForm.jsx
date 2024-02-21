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

export default PersonForm