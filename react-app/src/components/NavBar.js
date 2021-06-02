import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./CSS/NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  let location = useLocation().pathname;
  useEffect(() => {
    const nav = document.querySelector(".nav-nav");
    if (location === "/login") {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });
  return (
    <nav className="nav-nav">
      <div className="logo-container">
        <Link to="/">
          <img src="logo.png" className="logo-image" />
        </Link>
      </div>
      <ul className="auth-container">
        {location !== "/login" && !user && (
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              log in
            </NavLink>
          </li>
        )}
        {location !== "/sign-up" && !user && (
          <li>
            <NavLink
              to="/sign-up"
              exact={true}
              activeClassName="active"
              className="sign-up"
            >
              sign up
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
