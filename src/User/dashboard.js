
import NavBar from './navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import Display from '../CalorieInput/display';
import Token from './checkaccesstoken';




function Dashboard() {
    const [histories, setHistory] = useState(null);
    const [userMetadata,setUserMetadata]  = useState(null);
    const navigate = useNavigate();
    const { user, isAuthenticated,isLoading,getAccessTokenSilently} = useAuth0();
    

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
    };

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
    };
    const getUserMetadata = async () => {
        const domain = "dev-c24xrqhgozkloytg.us.auth0.com";
    if(isAuthenticated){
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            },
          });
    
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
           console.log(userDetailsByIdUrl);
           console.log(accessToken);
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const { user_metadata } = await metadataResponse.json();
    
          setUserMetadata(user_metadata);
          console.log(user_metadata);
        } catch (e) {
          console.log(e.message);
        }}
      };
   

    useEffect(() => {
        if (isAuthenticated && !isLoading ) {
            navigate('/dashboard')
            getUserMetadata();
            fetchUserrecentCalories();
           
            saveUserToBackend(user.sub, user.name)
        }
    }, [isAuthenticated, user, navigate,isLoading])

   
   if(isLoading){
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

export default Dashboard;
