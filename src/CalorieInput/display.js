
import {useState, useEffect} from "react";
import Input from "./input";



const Display = ()=>{
    const [currentiItemlist, setCurrentItemList] = useState([])
    const [currentCalorieslist, setCurrentCaloriesList] = useState([])
    const [total, setTotal] = useState(0);
 

    const handleInputChange = async (value) => {
        // Send both item and calories to the backend
        await fetch('/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: value.item, calories: value.calories }),
        });

        
        // // Fetch updated data from the backend
        // fetchData();
    };

    // const fetchData = async () => {
    //     const response = await fetch('/api/getItems');
    //     const data = await response.json();

    //     // Assuming the data returned is an array of objects with item and calories
    //     setCurrentItemList(data.map(d => d.item));
    //     setCurrentCaloriesList(data.map(d => d.calories));

    //     // Update total calories
    //     const totalCalories = data.map(d => parseInt(d.calories, 10)).reduce((a, b) => a + b, 0);
    //     setTotal(totalCalories);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const currentlist = currentiItemlist.map((item, index) => item + " " + currentCalorieslist[index] + " calories");

   
    return(<div>
        <Input onInputChange={handleInputChange} />
        <div>Today's total calories: {total}{ 
                        <ul>
                            {currentlist.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    }</div>
    </div>)
}

export default Display;