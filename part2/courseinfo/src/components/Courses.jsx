const Header = ({ name, id }) => {
    return <h2 id={id}>{name}</h2>
}

const Parts = ({parts}) => {
    return (
        <table>
            <tbody>
                {parts.map(part => 
                    <tr key={part.id}>
                        <td>{part.name}</td>
                        <td>{part.exercises}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><b>Total of {total} exercises</b></p>
}

const Courses = ({ courses }) => {
    return (
        courses.map( course =>
            <div key={course.id}>
                <Header name={course.name} id={course.id} />
                <Parts parts={course.parts} />
                <Total parts={course.parts} />
            </div> 
        )
    )
}

export default Courses