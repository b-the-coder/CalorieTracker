import React from 'react'
import { useState } from 'react'
import userIcon from'./asset/userIcon.png'
import LogoutButton from './logout'

const UserProfileDropdown = () => {
    const [showDropdown, setShowdropdown] = useState(false)

    const handleClick = () => {
        setShowdropdown((showDropdown) => !showDropdown)
    }
    return (
        <div className='userIcon'>
            <button className='userIcon'onClick={handleClick}>
                <img
                    src={userIcon}
                    alt="Clickable Image"
                    style={{ width: 50, height: 50 }}
                ></img>
            </button>
            {showDropdown && (
                <div >
                  
                    <select id="dropdown">
                        <option value="userprofile">Your Profile</option>
                        <option value="logout">Logout</option>
                    </select>
                </div>
            )}
        </div>
    )
}

export default UserProfileDropdown
