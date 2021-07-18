import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as searchActions from "../store/search";
import SearchItem from "./SearchItem";
import "./CSS/SearchPage.css";

const SearchPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [numPages, setNumPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const searchRes = useSelector((state) => state.search.result);
  let searchInput = location.search.split("=")[1];

  useEffect(() => {
    console.log(searchInput);
  });

  return (
    <div className="search-page-container">
      <div className="search-header-container">
        <img
          //   src="https://www.treestodaynursery.com/wp-content/uploads/2018/04/roses1.jpg"
          src="https://s1.1zoom.me/big0/480/Germany_Parks_Autumn_477732.jpg"
          className="search-background-image"
        />
        <div className="search-overlay">
          <p className="search-result-title">Search results for:</p>
          <p className="search-result-title">"{searchInput}"</p>
        </div>
      </div>
      <div className="search-items-wrapper">
        {searchRes.length < 1 && <div>No results found</div>}
        {searchRes.length > 0 &&
          searchRes.map((musicPost) => {
            return <SearchItem musicPost={musicPost} key={musicPost.title} />;
          })}
      </div>
      <div className="page-container">{/* TODO GENERATE */}</div>
    </div>
  );
};

export default SearchPage;
