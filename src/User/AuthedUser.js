import LogoutButton from "./logout";
import Profile from "./profile";
import { useEffect, useState } from "react";


function AfterLogin (){
    const [histories, setHistory] = useState(null)
  useEffect(async () => {
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
},[]);

    return (<div>
        <h1 className="CaloriesCounter">Calories Counter</h1>
        <Profile/>
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
        <LogoutButton/>
    </div>)

}

export default AfterLogin