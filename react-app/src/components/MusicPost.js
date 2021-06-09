import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as musicPostActions from "../store/musicPost";
import AudioPlayer from "./AudioPlayer";
import { FaPlay, FaPause } from "react-icons/fa";
import "./CSS/MusicPost.css";

const MusicPost = () => {
  const dispatch = useDispatch();
  const { musicPostId } = useParams();
  const [musicPost, setMusicPost] = useState({});
  const [trackList, setTrackList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    const FetchWrapper = async () => {
      let music_post = await dispatch(
        musicPostActions.fetchSingleMusicPost(musicPostId)
      );
      setMusicPost(music_post);
      setTrackList(music_post.songs);
    };

    FetchWrapper();
  }, [dispatch]);

  const handleSongListingPlayPause = (e) => {
    e.preventDefault();
    setCurrentTrack(e.currentTarget.value);
  };
  //============== song list component

  const songListing = (song, idx) => {
    return (
      <div className="songListing-container" key={song.id} value={idx}>
        <button
          className="songListing-play-btn"
          value={idx}
          onClick={handleSongListingPlayPause}
        >
          <div value={idx}>
            <FaPlay size="10px" />
          </div>
        </button>
        <span className="songListing-title">{song.title}</span>
      </div>
    );
  };
  // =============
  return (
    <div className="music-content-wrapper">
      <div className="main-content-container music-post">
        <div className="audio-content">
          <div className="post-title">{musicPost.title}</div>
          <div className="audio-container">
            {trackList.length && <AudioPlayer song={trackList[currentTrack]} />}
          </div>
          <div className="audio-details-1">
            <div>Digital Album</div>
            <div>Streaming only</div>
            <div>Buy Digital Album ${musicPost.price}</div>
          </div>
          <div className="songList-container">
            {trackList &&
              trackList.map((song, index) => songListing(song, index))}
          </div>
          {/* fix seed data for music post description. must be 1 big string. */}
          <div className="audio-details-2">{musicPost.description}</div>
        </div>
        <div className="cover-aux-container">
          <div className="post-image-container">
            <img src={musicPost.image} className="post-image" />
          </div>
          <div className="post-additional-info">
            <span className="post-collections">in x collections</span>
            <span className="post-wishlist">
              add to wishlist. react heart fill
            </span>
          </div>
        </div>
      </div>
      <div className="profile-container">profile component</div>
    </div>
  );
};

export default MusicPost;
