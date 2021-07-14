//  REACT imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//  local imports ==============
import LogoutButton from "./auth/LogoutButton";
import "./CSS/ProfileButton.css";
// react-icons ====================================
import { CgProfile } from "react-icons/cg";

const ProfileButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const imageUrl = sessionUser ? sessionUser.image : null;
  const userId = sessionUser.id;
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = () => {
      if (!showMenu) return;
      setShowMenu(false);
    };
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        {imageUrl ? (
          <div className="navbar-image-container">
            <img src={imageUrl} className="navbar-image" />
          </div>
        ) : (
          <CgProfile size="25px" />
        )}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div>{sessionUser.username}</div>
          <div className="profile-link-container">
            <Link to={`/users/${userId}/collection`} className="profile-link">
              view collection
            </Link>
          </div>
          <div className="profile-link-container">
            <Link to={`/users/${userId}/music`} className="profile-link">
              my page
            </Link>
          </div>
          <LogoutButton />
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
