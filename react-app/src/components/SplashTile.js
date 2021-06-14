import React from "react";
import { Link } from "react-router-dom";
import "./CSS/MusicMerchTile.css";
import "./CSS/SplashTile.css";

const SplashTile = ({ post }) => {
  return (
    <div className="splash-tile-wrapper">
      <div className="splash-tile-container">
        <Link
          to={`/users/${post.user_id}/music-post/${post.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="splash-tile">
            <div className="splash-image-container">
              <img src={post.image} className="splash-image" />
            </div>
            <div className="splash-title">{post.title}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SplashTile;
