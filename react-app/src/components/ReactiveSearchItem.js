import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as searchActions from "../store/search";
import "./CSS/ReactiveSearchItem.css";

const ReactiveSearchItem = ({ musicPost, setShowReactiveSearch, setInput }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(searchActions.clearReactiveSearchRes());
    setShowReactiveSearch(false);
    setInput("");
    history.push(`/users/${musicPost.user_id}/music-post/${musicPost.id}`);
  };
  return (
    <div className="reactive-search-item-container" onClick={onClickHandler}>
      <div className="reactive-search-image-container">
        <img src={musicPost.image} className="reactive-search-image" />
      </div>
      <div className="reactive-search-text-container">
        <div className="reactive-search-title">{musicPost.title}</div>
        <div className="reactive-search-artist">by {musicPost.by}</div>
      </div>
    </div>
  );
};

export default ReactiveSearchItem;
