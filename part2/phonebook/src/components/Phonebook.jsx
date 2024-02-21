const Phonebook = ({ person, deleteHandler }) => {
    return (
        <li key={person.name} id={person.name}>
            {person.name} - {person.number}
            <button onClick={deleteHandler}>delete</button>
        </li>
    )
}

export default Phonebook