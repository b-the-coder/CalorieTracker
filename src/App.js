import Dashboard from './components/dashboard.js'
import LoginButton from './features/auth/login.js'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
    const { isAuthenticated } = useAuth0()

    return (
        <div className="App">
            <h1 className="LandingpageWelcome">Welcome to Calories Counter</h1>
            {isAuthenticated ? <Dashboard /> : <LoginButton />}
        </div>
    )
}

export default App
