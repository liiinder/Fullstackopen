const Filter = ({ text, newFilter, handleFilter }) => {
    return (
        <form>
            {text} <input value={newFilter} onChange={handleFilter} />
        </form>
    )
}

export default Filter