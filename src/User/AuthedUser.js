import LogoutButton from './logout'
import NavBar from './navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import DailyIntake from '../CalorieInput/DailyIntake'


function AfterLogin() {
    const [histories, setHistory] = useState(null)
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth0()

    const fetchUserrecentCalories = async () => {
        try {
            const response = await fetch('/api/histories')

            // Check if the response is ok (status code is in the 200-299 range)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            // Parse the response as JSON
            const data = await response.json()

            setHistory(data)
        } catch (error) {
            console.error('Error fetching histories:', error)
        }
    }

    const saveUserToBackend = async (id, name) => {
        try {
            // const token = await getAccessTokenSilently();
            // console.log(token);

            // Send user data to backend
            const response = await fetch('/api/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Pass the access token
                },
                body: JSON.stringify({
                    username: name, // e.g., user's name
                    auth0_sub: id, // Auth0 unique user ID
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to save user')
            }
            // Set the userProcessed flag to true
        } catch (error) {
            console.error('Error saving user to backend:', error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/api/histories')
            // Redirect to the desired route
            fetchUserrecentCalories()
            saveUserToBackend(user.sub, user.name)
        }
    }, [isAuthenticated, user, navigate])

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
