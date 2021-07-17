import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import * as viewUserActions from "../../store/viewUser";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(viewUserActions.clearProfile());
    dispatch(logout());
  };

  return (
    // <button onClick={onLogout} className="logout-btn">
    <div className="profile-link-container profile-logout" onClick={onLogout}>
      logout
    </div>
    // </button>
  );
};

export default LogoutButton;
