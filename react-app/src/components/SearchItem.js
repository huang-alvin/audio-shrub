import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as searchActions from "../store/search";
import "./CSS/SearchItem.css";

const SearchItem = ({ musicPost }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(searchActions.clearSearchRes());
    history.push(`/users/${musicPost.user_id}/music-post/${musicPost.id}`);
  };
  return (
    <div className="search-listing-container" onClick={onClickHandler}>
      <div className="search-listing-image-container">
        <img src={musicPost.image} className="search-image" />
      </div>
      <div className="search-listing-text-container">
        <div className="search-listing-title">{musicPost.title}</div>
        <div className="search-listing-artist">by {musicPost.by}</div>
        <div className="search-listing-tags-container">
          tags:{" "}
          {musicPost.tags.map((tag) => {
            return <span className="search-listing-tag">{tag}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
