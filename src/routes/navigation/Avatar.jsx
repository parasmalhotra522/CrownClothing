import React, {useEffect, useState } from 'react';

const Avatar = ({ currentUser, onSignOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(currentUser.displayName);
  // console.log("----Curent user", currentUser);
  // Toggles the dropdown visibility
 
  useEffect(() => {
    console.log("CHeck username from local Storage",JSON.parse(localStorage.getItem('authData')).displayName)
    if (!currentUser.displayName) {
      setUserName(JSON.parse(localStorage.getItem('authData')).displayName)
    } else {
          setUserName(currentUser.email)
 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Get initials from the user's name or email
  const getInitials = (name) => {
    if (!name) return 'U'; // Default to 'U' if no name is available
    // console.log("---name ", name);
    const splitName = name.split(' ');
    return splitName.length > 1
      ? `${splitName[0][0]}${splitName[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Avatar container */}
      <div style={avatarStyles.container} onClick={toggleDropdown}>
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="user avatar"
            style={avatarStyles.image}
          />
        ) : (
          <div style={avatarStyles.initials}>
            {getInitials(userName || currentUser?.email)}
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div style={dropdownStyles.container}>
          <div style={dropdownStyles.item} onClick={onSignOut}>
            Sign Out
          </div>
          {/* Add more dropdown options if needed */}
        </div>
      )}
    </div>
  );
};

// Avatar styles remain unchanged
const avatarStyles = {
  container: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginLeft: '15px',
    cursor: 'pointer', // Make it clickable
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  initials: {
    fontSize: '16px',
    color: '#555',
    fontWeight: 'bold',
  },
};

// Basic dropdown styles
const dropdownStyles = {
  container: {
    position: 'absolute',
    top: '50px',
    right: '0',
    width: '120px',
    backgroundColor: '#fff',
    color:'black',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    zIndex: '1000',
  },
  item: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
  },
};

export default Avatar;
