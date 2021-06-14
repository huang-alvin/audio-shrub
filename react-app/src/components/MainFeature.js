import React from "react";
import { Link } from "react-router-dom";
import "./CSS/MainFeature.css";

const MainFeature = ({ post }) => {
  return (
    <div className="main-feature-container">
      <Link to={`/users/${post.user_id}/music-post/${post.id}`}>
        <div className="feature-overlay" />
        <div className="feature-title">{post.title}</div>
        <div className="main-feature-image-container">
          <img src={post.image} className="main-feature-image" />
        </div>
      </Link>
    </div>
  );
};
export default MainFeature;
