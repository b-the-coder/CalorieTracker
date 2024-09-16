
import {useState} from "react";
import Input from "./input";



const Display = ()=>{
    const [currentiItemlist, setCurrentItemList] = useState([])
    const [currentCalorieslist, setCurrentCaloriesList] = useState([])
 

    const handelItemInputChange = (value) =>{
       
       const allItem = [...currentiItemlist,value];
       setCurrentItemList(allItem)

    }
    const handelCaloriesInputChange = (value) =>{
    
        const allcalories = [...currentCalorieslist,value];
        setCurrentCaloriesList(allcalories)
      
     }
     const currentlist = currentiItemlist.map((item,index)=>item + " " + currentCalorieslist[index] + " calories")
     const total = currentCalorieslist.map(Number).reduce((a,b)=>a+b,0)
   
    return(<div>
        <Input onItemInputChange={handelItemInputChange} onCaloriesInputChange={handelCaloriesInputChange}/>
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