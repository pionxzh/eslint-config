// @ts-expect-error - We don't have React installed in test
import React, { useState } from 'react'

function MyComponent() {
    // Define state variables
    const [greeting] = useState('Hello, React!')
    const [counter, setCounter] = useState<number>(0)

    // Define a function
    const incrementCounter = () => {
        setCounter(prevCounter => prevCounter + 1)
    }

    return (
        <div>
            <h1>
                {greeting}
            </h1>
            <button onClick={incrementCounter}>Click me!</button>
            <p>Counter: {counter}</p>
        </div>
    )
}

export default MyComponent
