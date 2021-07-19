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

  const sessionUser = useSelector((state) => state.session.user);
  const collection = useSelector((state) => state.session.user.normCollection);
  const { userId } = useParams();
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

  // handle open close of purchase modal
  const openPurchase = () => {
    if (showProductDisplay) return;
    setShowProductdisplay(true);
  };
  useEffect(() => {
    const closePurchase = (e) => {
      let purchasing = e.target.id === "checkout-button";

      if (purchasing) {
        return;
      } else {
        setShowProductdisplay(false);
      }
    };
    if (showProductDisplay) {
      document.addEventListener("click", closePurchase);
    }
    return () => {
      document.removeEventListener("click", closePurchase);
    };
  }, [showProductDisplay]);

  return (
    <div className="music-content-wrapper">
      {showProductDisplay && (
        <div className="purchase-overlay">
          <ProductDisplay post={musicPost} />{" "}
        </div>
      )}
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
            <div style={{ "font-size": "20px", "font-weight": "600" }}>
              Digital Album
            </div>
            <div style={{ "margin-bottom": "5%" }}>Streaming only</div>
            {sessionUser.id !== parseInt(userId) ? (
              collection["music"][musicPostId] ? (
                <div className="owned-item">You own this</div>
              ) : (
                <button onClick={openPurchase} className="purchase-btn">
                  {parseInt(musicPost.price) > 0
                    ? `Buy Digital Album $${musicPost.price?.toFixed(2)}`
                    : "Buy Digital Album FREE"}
                </button>
              )
            ) : (
              <div>Purchase price: ${musicPost.price}</div>
            )}
          </div>
          <div className="audio-details-2">{musicPost.description}</div>
          <div className="audio-details-3">
            <p className="release-date"></p>
            <p className="copyright">© all rights reserved</p>
          </div>
          <div className="tags-container">
            <div style={{ "font-size": "18px" }}>Tags:</div>
            {musicPost.tags?.map((tag) => {
              return <span className="tag">{tag}</span>;
            })}
          </div>
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
