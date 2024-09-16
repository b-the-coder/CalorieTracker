const Input = ({ onItemInputChange, onCaloriesInputChange}) => {
    const handleitemkeydown = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value
            onItemInputChange(value)
            event.target.value = ''
        }
    }
    const handlecalorieskeydown = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value
            onCaloriesInputChange(value)
            event.target.value = ''
        }
    }
    return (
        <div>
            <input className="item"
                onKeyDown={handleitemkeydown}
                type="text"
                name="caloriesInput"
                placeholder="What you eat today?"
            ></input>
             <input className="calories"
                onKeyDown={handlecalorieskeydown}
                type="text"
                name="caloriesInput"
                placeholder="How many calories?"
            ></input>
        </div>
    )
}

export default Input
