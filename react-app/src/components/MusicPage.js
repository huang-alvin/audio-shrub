import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CSS/MusicPage.css";

const MusicPage = () => {
  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        render all music posted by this user
      </div>
      <div className="profile-container">profile component</div>
    </div>
  );
};
export default MusicPage;
