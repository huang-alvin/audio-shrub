import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CSS/DiscographyListing.css";

const DiscographyListing = ({ post }) => {
  const url = `/users/${post.user_id}/music-post/${post.id}`;

  return (
    // <div className="disco">
    <div className="discography-container">
      <Link to={url} style={{ textDecoration: "none" }}>
        <div className="discography-image-container">
          <img src={post.image} className="discography-image" />
        </div>
        <div className="discography-title">{post.title}</div>
      </Link>
    </div>
    // </div>
  );
};
export default DiscographyListing;
