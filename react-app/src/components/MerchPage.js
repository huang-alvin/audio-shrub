import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MusicMerchTile from "../components/MusicMerchTile";
import * as merchPostActions from "../store/merchPost";
import ProfileSideBar from "./ProfileSideBar";
import "./CSS/MusicPage.css";

const MerchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  // const [userMerchPosts, setUserMerchPosts] = useState([]);
  const userMerchPosts = useSelector((state) => state.viewUser?.merch_posts);
  const sessionUserId = useSelector((state) => state.session.user.id);

  // useEffect(async () => {
  //   const fetchUserPosts = async () => {
  //     let merchPosts = await dispatch(
  //       merchPostActions.fetchUserMerchPosts(userId)
  //     );
  //     setUserMerchPosts(merchPosts);
  //   };
  //   fetchUserPosts();
  // }, [dispatch]);
  const handleRedirectBtn = () => {
    history.push(`/users/${sessionUserId}/upload-merch`);
  };

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        {(!userMerchPosts || userMerchPosts.length < 1) &&
          parseInt(sessionUserId) === parseInt(userId) && (
            <div className="empty-music-posts-container">
              Looks like you have no merch posts
              <button
                className="redirect-to-upload-btn"
                onClick={handleRedirectBtn}
              >
                Make a merch post
              </button>
            </div>
          )}
        {userMerchPosts &&
          userMerchPosts.map((merchPost) => {
            return <MusicMerchTile post={merchPost} key={merchPost.id} />;
          })}
      </div>
      <div className="profile-container">
        <ProfileSideBar />
      </div>
    </div>
  );
};
export default MerchPage;
