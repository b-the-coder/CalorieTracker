import { useAuth0 } from '@auth0/auth0-react'
import { React, useState } from 'react'
import LogoutButton from '../../components/logout.js'

const NavBar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0()

    const [showDropdown, setShowdropdown] = useState(false)

    const handleClick = () => {
        setShowdropdown((showDropdown) => !showDropdown)
    }

    if (isLoading) {
        return <div>Loading ...</div>
    }

    return (
        isAuthenticated && (
            <div className="header-container">
                <h1 className="CaloriesCounter">Calories Counter</h1>
                <button className="userIcon" onClick={handleClick}>
                    <img
                        className="userProfileImage"
                        src={user.picture}
                        alt={user.name}
                    />
                </button>
                {showDropdown && (
                    <div>
                        <LogoutButton />
                        {user.email}
                    </div>
                )}
            </div>
        )
    )
}

export default NavBar
