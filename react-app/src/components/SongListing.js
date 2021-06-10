import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as audioPlayerActions from "../store/audioPlayer";
import { FaPlay, FaPause } from "react-icons/fa";

const SongListing = ({ song, index }) => {
  const dispatch = useDispatch();
  const [playIcon, setPlayIcon] = useState(false);
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const isPlay = useSelector((state) => state.audioPlayer.playState);

  useEffect(() => {
    if (parseInt(currentTrack) === parseInt(index) && isPlay) {
      setPlayIcon(true);
    } else {
      setPlayIcon(false);
    }
  }, [currentTrack, isPlay]);

  // audio.load(); before setting track
  const handleSongListingPlayPause = (e) => {
    e.preventDefault();
    if (parseInt(currentTrack) === parseInt(index)) {
      dispatch(audioPlayerActions.setPlayState(!isPlay));
    } else {
      dispatch(audioPlayerActions.setCurrentTrack(e.currentTarget.value));
    }
  };

  return (
    <div className="songListing-container" key={song.id} value={index}>
      <button
        className="songListing-play-btn"
        value={index}
        onClick={handleSongListingPlayPause}
      >
        <div value={index}>
          {playIcon ? <FaPause size="10px" /> : <FaPlay size="10px" />}
        </div>
      </button>
      <span className="songListing-title">{song.title}</span>
    </div>
  );
};

export default SongListing;
