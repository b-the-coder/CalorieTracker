import { useAuth0 } from "@auth0/auth0-react";
import{React, useState}  from "react";
import LogoutButton from "./logout";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [showDropdown, setShowdropdown] = useState(false)

    const handleClick = () => {
        setShowdropdown((showDropdown) => !showDropdown)
    }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
         <button className="userIcon" onClick={handleClick}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        </button>
     
      {showDropdown && (
        <div>
            <LogoutButton />
        </div>)}
         </div>
    )
  );
};

export default Profile;