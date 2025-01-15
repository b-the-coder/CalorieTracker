





function Dashboard() {
   const array1 = [1,2,3,4,5]
const turnintohistories = (array)=>{
array.forEach((item)=> item*5)
}
const histories = turnintohistories(array1);
  
         
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

export default Dashboard;
