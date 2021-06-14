import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as musicPostActions from "../store/musicPost";
import AudioPlayer from "./AudioPlayer";
import * as audioPlayerActions from "../store/audioPlayer";
import ProfileSideBar from "./ProfileSideBar";
import "./CSS/MusicPost.css";

const MusicPost = () => {
  const dispatch = useDispatch();

  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);

  const { musicPostId } = useParams();
  const [musicPost, setMusicPost] = useState({});

  useEffect(() => {
    const FetchWrapper = async () => {
      let music_post = await dispatch(
        musicPostActions.fetchSingleMusicPost(musicPostId)
      );
      setMusicPost(music_post);
      dispatch(audioPlayerActions.setTrackList(music_post.songs));
    };

    FetchWrapper();
  }, [dispatch]);

  return (
    <div className="music-content-wrapper">
      <div className="main-content-container music-post">
        <div className="audio-content">
          <div className="post-title">{musicPost.title}</div>
          <div className="audio-container">
            {trackList.length && (
              <AudioPlayer
                song={trackList[currentTrack]}
                trackList={trackList}
              />
            )}
          </div>
          <div className="audio-details-1">
            <div>Digital Album</div>
            <div>Streaming only</div>
            {/* <div>Buy Digital Album ${musicPost.price}</div> */}
          </div>
          <div className="audio-details-2">{musicPost.description}</div>
        </div>
        <div className="cover-aux-container">
          <div className="post-image-container">
            <img src={musicPost.image} className="post-image" />
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

export default MusicPost;
