import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MusicMerchTile from "../components/MusicMerchTile";
import * as merchPostActions from "../store/merchPost";
import "./CSS/MusicPage.css";

const MerchPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [userMerchPosts, setUserMerchPosts] = useState([]);

  useEffect(async () => {
    const fetchUserPosts = async () => {
      let merchPosts = await dispatch(
        merchPostActions.fetchUserMerchPosts(userId)
      );
      setUserMerchPosts(merchPosts);
    };
    fetchUserPosts();
  }, [dispatch]);

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        {userMerchPosts &&
          userMerchPosts.map((merchPost) => {
            return <MusicMerchTile post={merchPost} key={merchPost.id} />;
          })}
      </div>
      <div className="profile-container">profile component</div>
    </div>
  );
};
export default MerchPage;
