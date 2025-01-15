 import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const [alertShown, setAlertShown] = useState(false);

    // Display the alert once
    useEffect(() => {
        if (!isAuthenticated && !isLoading && !alertShown) {
            window.alert("Please login first!");
            setAlertShown(true);
        }
    }, [isAuthenticated, isLoading, alertShown]);

    // If still loading, display the loading message
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect after showing the alert
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If authenticated, render the child components
    return children;
};

export default ProtectedRoute;



// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const [alertShown, setAlertShown] = useState(false);

//   // Show alert and update alertShown state once, after the component renders
//   useEffect(() => {
//     if (!isAuthenticated && !alertShown) {
//       window.alert("Please login first!");
//       setAlertShown(true); // Prevent further alerts
//     }
//   }, [isAuthenticated, alertShown]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // If not authenticated, navigate to login page
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   // If authenticated, render the children (protected content)
//   return children;
// };

// export default ProtectedRoute;
