import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CSS/ReactiveSearchItem.css";
import * as searchActions from "../store/search";

const ReactiveSearchItem = ({ musicPost, setShowReactiveSearch, setInput }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(searchActions.clearSearchRes());
    setShowReactiveSearch(false);
    setInput("");
    history.push(`/users/${musicPost.user_id}/music-post/${musicPost.id}`);
  };
  return (
    // <Link to={`/users/${musicPost.user_id}/music-post/${musicPost.id}`}>
    <div className="reactive-search-item-container" onClick={onClickHandler}>
      <div className="reactive-search-image-container">
        <img src={musicPost.image} className="reactive-search-image" />
      </div>
      <div className="reactive-search-text-container">
        <div className="reactive-search-title">{musicPost.title}</div>
        <div className="reactive-search-artist">by {musicPost.by}</div>
      </div>
    </div>
    // </Link>
  );
};

export default ReactiveSearchItem;
