import { useState, useEffect } from 'react'
import LoginButton from './login'
import UserProfileDropdown from './userprofile'


function App() {
    const [histories, setHistory] = useState(null)

    const handleClick = async () => {
        try {
            const response = await fetch('/api/histories')
            console.log(response)
            // Check if the response is ok (status code is in the 200-299 range)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            // Parse the response as JSON
            const data = await response.json()
            console.log(data)
            setHistory(data)
        } catch (error) {
            console.error('Error fetching histories:', error)
        }
    }

    return (
        <div className="App">
            <h1>Calories Counter</h1>
            <div >
                <LoginButton />
            </div>
            <UserProfileDropdown/>
            <button onClick={handleClick}>My recent calories history</button>
            {histories && (
                <ul>
                    {histories.map((calorie, index) => (
                        <li key={index}>
                            Day {index + 1}: {calorie} calories
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App