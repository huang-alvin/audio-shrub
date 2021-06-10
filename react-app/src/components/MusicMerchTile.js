import React from "react";
import { Link } from "react-router-dom";
import "./CSS/MusicMerchTile.css";

const MusicMerchTile = ({ post }) => {
  return (
    <Link to={`/users/${post.user_id}/music-post/${post.id}`}>
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
