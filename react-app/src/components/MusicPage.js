import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MusicMerchTile from "../components/MusicMerchTile";
import * as musicPostActions from "../store/musicPost";
import "./CSS/MusicPage.css";

const MusicPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  let user_music_posts = null;

  useEffect(() => {
    user_music_posts = dispatch(musicPostActions.fetchMusicPost(userId));
  });
  // dispatch call fetch all musicposts from this userId
  // loop thru and render musicmerchtile
  //  indiivudal url: users/:userId/music/:musicPostId
  return (
    <div className="music-content-wrapper">
      <div className="main-content-container">
        <MusicMerchTile />
      </div>
      <div className="profile-container">profile component</div>
    </div>
  );
};
export default MusicPage;
