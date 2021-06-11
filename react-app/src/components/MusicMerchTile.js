import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/MusicMerchTile.css";

const MusicMerchTile = ({ post }) => {
  let location = useLocation().pathname;
  const path = location.includes("music")
    ? `/users/${post.user_id}/music-post/${post.id}`
    : `/users/${post.user_id}/merch-post/${post.id}`;
  return (
    <Link to={path}>
      <div className="music-merch-tile-container">
        <div className="music-merch-image-container">
          <img src={post.image} className="music-merch-image" />
        </div>
        <div className="music-merch-title">{post.title}</div>
      </div>
    </Link>
  );
};

export default MusicMerchTile;
