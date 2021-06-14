import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// ========= components ==============
import MainFeature from "./MainFeature";
import SellingNowTile from "./SellingNowTile";
import SplashTile from "./SplashTile";
// ========= store ===========
import * as splashActions from "../store/splash";
import "./CSS/SplashPage.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const featuredPosts = useSelector((state) => state.splash.featured);
  const newPosts = useSelector((state) => state.splash.new);
  useEffect(() => {
    const splashFetch = async () => {
      if (!featuredPosts) {
        await dispatch(splashActions.fetchFeatured());
      }
      if (!newPosts) {
        await dispatch(splashActions.fetchNewPosts());
      }
    };
    splashFetch();
  }, [dispatch]);
  return (
    <div>
      <div className="featured-wrapper">
        <div className="featured-grid">
          <div className="main-feature-wrapper">
            {featuredPosts && <MainFeature post={featuredPosts[0]} />}
            {/* <div className="main-feature"></div> */}
          </div>
          <div className="side-feature-wrapper">
            <div className="side-feature side-feature-1">
              {featuredPosts && <MainFeature post={featuredPosts[1]} />}
            </div>
            <div className="side-feature side-feature-2">
              {featuredPosts && <MainFeature post={featuredPosts[2]} />}
            </div>
            <div className="side-feature side-feature-3">
              {featuredPosts && <MainFeature post={featuredPosts[3]} />}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="currently-selling-wrapper">
        <div className="section-title">SELLING RIGHT NOW</div>
        <div className="sell-now-container"></div>
      </div> */}
      <div className="new-and-notable-wrapper">
        <div className="section-title">NEW AND NOTABLE</div>
        <div className="new-container">
          {newPosts &&
            newPosts.map((post) => <SplashTile post={post} key={post.id} />)}
        </div>
      </div>
      {/* <div className="filter-search-wrapper">Filter Search</div> */}
    </div>
  );
};
export default SplashPage;
