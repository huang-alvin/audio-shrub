import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./CSS/SplashPage.css";

const SplashPage = () => {
  return (
    <div>
      <div className="featured-wrapper">
        <div className="featured-grid">
          <div className="main-feature-wrapper">
            <div className="main-feature">main feature</div>
          </div>
          <div className="side-feature-wrapper">
            <div className="side-feature side-feature-1">side feature1</div>
            <div className="side-feature side-feature-2">side feature2</div>
            <div className="side-feature side-feature-3">side feature3</div>
          </div>
        </div>
      </div>
      <div className="currently-selling-wrapper">selling right now</div>
      <div className="new-and-notable-wrapper">new and notable</div>
      <div className="filter-search-wrapper">Filter Search</div>
    </div>
  );
};
export default SplashPage;
