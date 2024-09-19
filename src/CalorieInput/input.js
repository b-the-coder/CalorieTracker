import { useState } from 'react'

const Input = ({ onInputChange }) => {
    const [item, setItem] = useState('')
    const [calories, setCalories] = useState('')

    const handleItemChange = (event) => {
        console.log("in item handle change")
        setItem(event.target.value)
    }

    const handleCaloriesChange = (event) => {
        console.log("in calorie handle change")
        setCalories(event.target.value)
    }

    const handleSubmit = (event) => {
        console.log(item, calories)
          event.preventDefault();
          setItem("");
          setCalories("")
        }
    
    return (
        <div>
            <input value = {item}
                className="item"
                onChange={handleItemChange}
                type="text"
                name="caloriesInput"
                placeholder="What you eat today?"
            ></input>
            <input value = {calories}
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
