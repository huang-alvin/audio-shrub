import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as merchPostActions from "../store/merchPost";
import ProfileSideBar from "./ProfileSideBar";

import "./CSS/MerchPost.css";

const MerchPost = () => {
  const dispatch = useDispatch();

  const { merchPostId } = useParams();
  const [merchPost, setMerchPost] = useState({});

  useEffect(() => {
    const FetchWrapper = async () => {
      let merch_post = await dispatch(
        merchPostActions.fetchSingleMerchPost(merchPostId)
      );
      setMerchPost(merch_post);
    };
    FetchWrapper();
  }, [dispatch]);

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container merch-post">
        <div className="audio-content">
          <div className="post-title">{merchPost.title}</div>
          <div className="audio-container"></div>
          <div className="audio-details-2">{merchPost.description}</div>
          <div className="audio-details-1">
            <div>Purchase ${merchPost.price}</div>
          </div>
        </div>
        <div className="cover-aux-container">
          <div className="post-image-container">
            <img src={merchPost.image} className="post-image" />
          </div>
          <div className="post-additional-info">
            {/* <span className="post-collections">in x collections</span> */}
            {/* <span className="post-wishlist">
              add to wishlist. react heart fill
            </span> */}
          </div>
        </div>
      </div>
      <div className="profile-container">
        <ProfileSideBar />
      </div>
    </div>
  );
};

export default MerchPost;
