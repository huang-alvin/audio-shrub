import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import "./CSS/SearchBar.css";
import * as searchActions from "../store/search";
import ReactiveSearchItem from "./ReactiveSearchItem";

const SearchBar = () => {
  // TO DO: searches in input change displying 5 of them in a dropdown
  // pressing enter will redirect to /search with all results showing
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [showReactiveSearch, setShowReactiveSearch] = useState(false);
  const searchRes = useSelector((state) => state.search.result);

  useEffect(() => {
    if (input.length > 1) {
      console.log(input);
      dispatch(searchActions.reactiveSearchReq(input));
    } else {
      dispatch(searchActions.clearSearchRes());
    }
  }, [input]);

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hess");
  };
  const handleClickSearch = (e) => {
    console.log("hoho");
  };

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
            onFocus={() => setShowReactiveSearch(true)}
          />
          <button type="submit" className="search-btn">
            <IoSearchOutline className="search-icon" />
          </button>
        </form>
      </div>
      {searchRes?.length > 0 && showReactiveSearch && (
        <div className="reactive-search-wrapper">
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
