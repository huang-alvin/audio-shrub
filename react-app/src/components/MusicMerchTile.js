import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/MusicMerchTile.css";

const MusicMerchTile = ({ post }) => {
  let location = useLocation().pathname;
  // location.includes("music")
  const path = post.by
    ? `/users/${post.user_id}/music-post/${post.id}`
    : `/users/${post.user_id}/merch-post/${post.id}`;
  return (
    <div className="music-merch-tile-wrapper">
      <div className="music-merch-tile-container">
        <Link to={path} style={{ textDecoration: "none" }}>
          <div className="music-merch-tile">
            <div className="music-merch-image-container">
              <img src={post.image} className="music-merch-image" />
            </div>
            <div className="music-merch-title">{post.title}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MusicMerchTile;
