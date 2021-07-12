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

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
