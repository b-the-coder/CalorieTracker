import { useState, useEffect, useRef } from 'react'
import Input from './input.js'
import { useAuth0 } from '@auth0/auth0-react'

const Display = () => {
    const [currentIntakelist, setCurrentIntakeList] = useState([])
    const [currentCalorieslist, setCurrentCalorieslist] = useState([])
    const { user } = useAuth0()

    const userName = user.name

    const fetchItem = async (userName) => {
        try {
            // Get user's fooditem from backend
            const response = await fetch(`/api/getItems/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Pass the access token
                },
            })
            const userItems = await response.json()

            setCurrentIntakeList(userItems)

            const userCalories = userItems.map(
                (singleitem) => singleitem.calories
            )

            setCurrentCalorieslist(userCalories)

            if (!response.ok) {
                throw new Error(`Failed to get user's calories`)
            }
        } catch (error) {
            console.error(
                `Error get user's calorie detail from backend:`,
                error
            )
        }
    }

    useEffect(() => {
        fetchItem(userName) // Fetch when userId is set
    }, []) // Depend on userId only, fetch when userId is available

    const handleInputChange = async (inserted) => {
        if (inserted === true) {
            fetchItem(userName)
        }
    }

    const userItemDisplay = currentIntakelist.map((singleitem) => {
        return (
            <li className="item-display">
                <span>{singleitem.item}</span>
                <span>{singleitem.calories} calories</span>
            </li>
        )
    })

    const total = currentCalorieslist.reduce((a, b) => a + b, 0)

    return (
        <div>
            <Input onInputChange={handleInputChange} />
            <div>
                You total calories so far for today is : {total}
                <ul>{userItemDisplay}</ul>
            </div>
        </div>
    )
}

export default Display
