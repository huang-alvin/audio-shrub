import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MusicMerchTile from "../components/MusicMerchTile";
import * as musicPostActions from "../store/musicPost";
import "./CSS/MusicPage.css";

const MusicPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [userMusicPosts, setUserMusicPosts] = useState([]);

  useEffect(async () => {
    let musicPosts = await dispatch(
      musicPostActions.fetchUserMusicPosts(userId)
    );
    setUserMusicPosts(musicPosts);
  }, [dispatch]);

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        {userMusicPosts &&
          userMusicPosts.map((post) => {
            return <MusicMerchTile post={post} key={post.id} />;
          })}
      </div>
      <div className="profile-container">profile component</div>
    </div>
  );
};
export default MusicPage;
