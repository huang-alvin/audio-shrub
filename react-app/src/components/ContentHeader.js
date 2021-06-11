import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, NavLink, useParams } from "react-router-dom";
import banner from "../images/default-banner.jpg";
import "./CSS/ContentHeader.css";

//   /users/:userId/music
const MyPage = () => {
  const [currentTab, setcurrentTab] = useState("music");
  const sessionUser = useSelector((state) => state.session.user);
  let { userId } = useParams();
  let isOwner = sessionUser.id === parseInt(userId);

  return (
    <div className="user-page-wrapper">
      <div className="banner-wrapper">
        {/* <img src={banner} className="banner-image" /> */}
        banner image
      </div>
      <div className="tabs-container">
        <span className="music-tab tab">
          <NavLink to={`/users/${userId}/music`} activeClassName="active-tab">
            music{" "}
          </NavLink>
        </span>
        <span className="merch-tab tab">
          <NavLink to={`/users/${userId}/merch`} activeClassName="active-tab">
            merch{" "}
          </NavLink>
        </span>
        {/* <span className="community-tab tab">community</span> */}
        {isOwner && (
          <span className="upload-music-tab tab">
            <NavLink
              to={`/users/${userId}/upload-music`}
              activeClassName="active-tab"
              className="tab-link"
            >
              upload music{" "}
            </NavLink>
          </span>
        )}
        {isOwner && (
          <span className="upload-music-tab tab">
            <NavLink
              to={`/users/${userId}/upload-merch`}
              activeClassName="active-tab"
              className="tab-link"
            >
              upload merch
            </NavLink>
          </span>
        )}
      </div>
      {/* <div className="main-content-wrapper">
        <div className="main-content-container">
          display diff content depending on tab
        </div>
        <div className="profile-container">profile</div>
      </div> */}
    </div>
  );
};
export default MyPage;
