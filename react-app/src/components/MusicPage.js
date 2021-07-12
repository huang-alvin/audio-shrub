import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MusicMerchTile from "../components/MusicMerchTile";
import * as musicPostActions from "../store/musicPost";
import ProfileSideBar from "./ProfileSideBar";
import "./CSS/MusicPage.css";

const MusicPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  // const [userMusicPosts, setUserMusicPosts] = useState([]);
  // const [userMusicPosts, setUserMusicPosts] = useSelector(state=>state.viewUser?.music_posts)
  const userMusicPosts = useSelector((state) => state.viewUser?.music_posts);
  const sessionUserId = useSelector((state) => state.session.user.id);

  // useEffect(() => {
  //   const fetchUserPosts = async () => {
  //     let musicPosts = await dispatch(
  //       musicPostActions.fetchUserMusicPosts(userId)
  //     );
  //     setUserMusicPosts(musicPosts);
  //   };
  //   fetchUserPosts();
  // }, [dispatch]);
  const handleRedirectBtn = () => {
    history.push(`/users/${sessionUserId}/upload-music`);
  };

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        {(!userMusicPosts || userMusicPosts.length < 1) &&
          parseInt(sessionUserId) === parseInt(userId) && (
            <div className="empty-music-posts-container">
              Looks like you have no music posts
              <button
                className="redirect-to-upload-btn"
                onClick={handleRedirectBtn}
              >
                Make a music post
              </button>
            </div>
          )}
        {userMusicPosts &&
          userMusicPosts.map((post) => {
            return <MusicMerchTile post={post} key={post.id} />;
          })}
      </div>
      <div className="profile-container">
        <ProfileSideBar />
      </div>
    </div>
  );
};
export default MusicPage;
