import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as musicPostActions from "../store/musicPost";
import AudioPlayer from "./AudioPlayer";
import * as audioPlayerActions from "../store/audioPlayer";
import ProfileSideBar from "./ProfileSideBar";
import ProductDisplay from "./ProductDisplay";
import "./CSS/MusicPost.css";

const MusicPost = () => {
  const dispatch = useDispatch();

  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);

  const { musicPostId } = useParams();
  const [musicPost, setMusicPost] = useState({});
  const [showProductDisplay, setShowProductdisplay] = useState(false);

  useEffect(() => {
    const FetchWrapper = async () => {
      let music_post = await dispatch(
        musicPostActions.fetchSingleMusicPost(musicPostId)
      );
      setMusicPost(music_post);
      dispatch(audioPlayerActions.setTrackList(music_post.songs));
    };

    FetchWrapper();
  }, [dispatch, musicPostId]);

  const handlePurchaseBtn = () => {
    setShowProductdisplay(true);
  };
  return (
    <div className="music-content-wrapper">
      {showProductDisplay && <ProductDisplay musicPost={musicPost} />}
      <div className="main-content-container music-post">
        <div className="audio-content">
          <div className="post-title">{musicPost.title}</div>
          <div className="post-artist">by {musicPost.by}</div>
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
            <button onClick={handlePurchaseBtn}>
              Buy Digital Album ${musicPost.price}
            </button>
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
