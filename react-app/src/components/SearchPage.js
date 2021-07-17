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

  useEffect(() => {
    let searchInput = location.search.split("=")[1];
    console.log(searchInput);
  });

  return (
    <div className="search-page-container">
      <div className="search-header-container"></div>
      <div className="search-items-wrapper">
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
