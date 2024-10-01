import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const Token = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    console.log('Access Token: ', token);
                    setAccessToken(token);  // Store it in state if needed
                } catch (error) {
                    console.error('Error fetching access token:', error);
                }
            }
        };

        fetchToken();  // Fetch the token after the user is authenticated
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div>
         
            {accessToken && <p>Access Token fetched! Check the console for details.</p>}
        </div>
    );
};

export default Token;
