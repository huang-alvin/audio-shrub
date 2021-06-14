import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CSS/SellingNowTile.css";
import * as splashActions from "../store/splash";

const SellingNowTile = () => {
  const dispatch = useDispatch();
  const sellingNowPosts = useSelector((state) => state.splash.sellingNow);

  useEffect(() => {
    const loadSellNowPosts = async () => {
      if (!sellingNowPosts) {
        await dispatch(splashActions.fetchSellingNowPosts());
      }
    };
    loadSellNowPosts();
  }, [dispatch]);
  return <div></div>;
};

export default SellingNowTile;
