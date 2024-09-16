import AfterLogin from './User/AuthedUser'
import LoginButton from './User/login'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
    const { isAuthenticated } = useAuth0()

    return (
        <div className="App">
            <h1 className="LandingpageWelcome">Welcome to Calories Counter</h1>
            {isAuthenticated ? <AfterLogin /> : <LoginButton />}
        </div>
    )
}

export default App
