import LogoutButton from './logout'
import NavBar from './navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import DailyIntake from '../CalorieInput/DailyIntake'

function AfterLogin() {
    const [histories, setHistory] = useState(null)
    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    const fetchUserrecentCalories = async () => {
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

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/api/histories')
            // Redirect to the desired route
            fetchUserrecentCalories()
        }
    }, [isAuthenticated, navigate])

    return (
        <div>
            <NavBar />
            <div className="content-container">
                <div>
                    <h2>My recent calories history</h2>
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
                <DailyIntake />
            </div>
        </div>
    )
}

export default AfterLogin
