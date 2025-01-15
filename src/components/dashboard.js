import NavBar from '../features/users/navbar.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import Display from './display.js'
import Token from '../features/users/checkaccesstoken.js'
import fetchUserrecentCalories from '../features/users/fetchCalories.js'

export default function Dashboard() {
    const [histories, setHistory] = useState(null)
    const navigate = useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth0()

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
        const fetchdatasaveuser = async () => {
            if (isAuthenticated && !isLoading) {
                navigate('/dashboard')
                const histories = await fetchUserrecentCalories()

                setHistory(histories)
                await saveUserToBackend(user.sub, user.name)
            }
        }
        fetchdatasaveuser()
    }, [isAuthenticated, user, navigate, isLoading])

    if (isLoading) {
        return <div>Loading...</div>
    }
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
                <Display />
                <Token />
            </div>
        </div>
    )
}
