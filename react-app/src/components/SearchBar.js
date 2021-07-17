import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Link from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";
import "./CSS/SearchBar.css";
import * as searchActions from "../store/search";
import ReactiveSearchItem from "./ReactiveSearchItem";

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [showReactiveSearch, setShowReactiveSearch] = useState(false);
  const searchRes = useSelector((state) => state.search.reactiveRes);

  useEffect(() => {
    if (input.length > 1) {
      dispatch(searchActions.reactiveSearchReq(input));
    } else {
      dispatch(searchActions.clearReactiveSearchRes());
    }
  }, [input]);

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("ahndel submit");
    e.preventDefault();
    if (input.length > 1) {
      const searchInput = input;
      dispatch(searchActions.searchReq(input));
      setInput("");
      history.push(`/search?q=${searchInput}`);
    }
  };
  const handleClickSearch = (e) => {
    console.log("hoho");
  };

  // clicking anywhere else on doc closes reactive searches
  useEffect(() => {
    const closeReactiveSearch = () => {
      if (!showReactiveSearch) return;
      setShowReactiveSearch(false);
    };
    if (showReactiveSearch) {
      document.addEventListener("click", closeReactiveSearch);
    }
    return () => {
      document.removeEventListener("click", closeReactiveSearch);
    };
  }, [showReactiveSearch]);

  return (
    <div className="search-bar-container">
      <div className="input-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            onChange={updateInput}
            value={input}
            placeholder="Search and discover music"
            onClick={() => setShowReactiveSearch(true)}
          />
          <button type="submit" className="search-btn" onClick={handleSubmit}>
            <IoSearchOutline className="search-icon" />
          </button>
        </form>
      </div>
      {searchRes?.length > 0 && showReactiveSearch && (
        <div
          className="reactive-search-wrapper"
          onMouseLeave={() => setShowReactiveSearch(false)}
        >
          {searchRes.map((musicPost) => (
            <ReactiveSearchItem
              musicPost={musicPost}
              key={musicPost.title}
              setShowReactiveSearch={setShowReactiveSearch}
              setInput={setInput}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
