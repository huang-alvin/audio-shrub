import React, { useState, useEffect } from "react";
import Link from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./CSS/SearchBar.css";

const SearchBar = () => {
  // TO DO: searches in input change displying 5 of them in a dropdown
  // pressing enter will redirect to /search with all results showing

  const [input, setInput] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    console.log("hi");
    if (e.key == "Enter") {
      // redirect to /search page with search results from input
      return;
    }
    // fetch using input
  };

  return (
    <div className="search-bar-container">
      <div className="input-container">
        <form className="search-form" onKeyDown={handleKeyDown}>
          <input
            className="input"
            type="text"
            onChange={updateInput}
            value={input}
          />
          <FaSearch />
        </form>
      </div>
    </div>
  );
};
export default SearchBar;
