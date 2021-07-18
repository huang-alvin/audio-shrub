import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// ===== components =======
import LogoutButton from "./auth/LogoutButton";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
//=====================
import logo from "../images/logo.png";
import "./CSS/NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  let location = useLocation().pathname;
  useEffect(() => {
    const nav = document.querySelector(".nav-nav");
    if (location === "/login" || location === "/sign-up") {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <nav className="nav-nav">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} className="logo-image" />
            </Link>
          </div>
          <span className="search-bar-wrapper">
            {location !== "/login" && location !== "/sign-up" && <SearchBar />}
          </span>
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
            <li>{user && <ProfileButton />}</li>
            {/* remove logout button below
        {user && (
          <li>
            <LogoutButton />
          </li>
        )} */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
