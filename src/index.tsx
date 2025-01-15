import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import { Auth0Provider } from '@auth0/auth0-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/dashboard'
import ErrorPage from './error-page'
import ProtectedRoute from './features/users/protectedroute'

const router = createBrowserRouter([
    { id: 'root', path: '/', element: <App />, errorElement: <ErrorPage /> },
    {
        path: 'dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-c24xrqhgozkloytg.us.auth0.com"
            clientId="60DYc7EX1MdbR9pGeUdKERkodFbwlTBX"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
