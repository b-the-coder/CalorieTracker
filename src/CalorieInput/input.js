import { useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

const Input = ({ onInputChange }) => {
    const [item, setItem] = useState('')
    const [calories, setCalories] = useState('')
    const { user } = useAuth0()

    const handleItemChange = (event) => {
        console.log('in item handle change')
        setItem(event.target.value)
    }

    const handleCaloriesChange = (event) => {
        console.log('in calorie handle change')
        setCalories(event.target.value)
    }

    const addItem = async (item, calories) => {
        try {
            // Send fooditem to backend
            const response = await fetch('/api/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Pass the access token
                },
                body: JSON.stringify({
                    item: item,
                    calories: calories,
                    name: user.name,
                    date: new Date().toISOString().split('T')[0],
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to add item')
            }
        } catch (error) {
            console.error('Error saving user to backend:', error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addItem(item, calories);
        onInputChange();

        setItem('')
        setCalories('')
    }

    return (
        <div>
            <input
                value={item}
                className="item"
                onChange={handleItemChange}
                type="text"
                name="caloriesInput"
                placeholder="What you eat today?"
            ></input>
            <input
                value={calories}
                className="calories"
                onChange={handleCaloriesChange}
                type="text"
                name="caloriesInput"
                placeholder="How many calories?"
            ></input>
            <button onClick={handleSubmit}>Add Food</button>
        </div>
    )
}

export default Input
