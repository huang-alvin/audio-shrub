import React from "react";
import { Link } from "react-router-dom";
import "./CSS/MusicMerchTile.css";

const MusicMerchTile = ({ musicPost }) => {
  return (
    <Link to={`/users/${musicPost.user_id}/music-post/${musicPost.id}`}>
      <div className="music-merch-tile-container">
        <div className="music-merch-image-container">
          <img src={musicPost.image} className="music-merch-image" />
        </div>
        <div className="music-merch-title">{musicPost.title}</div>
      </div>
    </Link>
  );
};

export default MusicMerchTile;
