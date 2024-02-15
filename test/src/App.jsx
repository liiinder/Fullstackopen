import { useState } from 'react'

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
  }

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        const updatedRight = right + 1
        setRight(updatedRight)
        setTotal(left + updatedRight)
    }
    // const increaseByOne = () => setCounter(counter + 1)
    // const decreaseByOne = () => setCounter(counter - 1)
    // const setToZero = () => setCounter(0)

    return (
        <>
            {left}
            <Button
                onClick={handleLeftClick}
                text='Left'
            />
            <Button
                onClick={handleRightClick}
                text='Right'
            />
            {right}
            <History allClicks={allClicks} />
        </>
    )
}
  
export default App