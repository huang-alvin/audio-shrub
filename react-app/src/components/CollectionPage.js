import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MusicMerchTile from "./MusicMerchTile";
import "./CSS/CollectionPage.css";

const CollectionPage = () => {
  const collection = useSelector((state) => state.session.user.collection);

  return (
    <div className="collection-container">
      {collection.map((post) => {
        return <MusicMerchTile post={post} />;
      })}
    </div>
  );
};

export default CollectionPage;
