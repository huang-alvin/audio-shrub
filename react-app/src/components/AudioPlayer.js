import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaFastForward, FaFastBackward } from "react-icons/fa";
import "./CSS/AudioPlayer.css";

const AudioPlayer = ({ song, trackList }) => {
  const audioRef = useRef();

  //   const [isPlay, setIsPlay] = useState(false);
  const [localIsPlay, setLocalIsPlay] = useState(false);
  const [localCurrTrack, setLocalCurrTrack] = useState(0);
  const [duration, setDuration] = useState("");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [track, setTrack] = useState(null);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [source, setSource] = useState("");

  const updateSong = (source) => {
    setSource(source);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch();
    }
  };

  // auto play new track
  useEffect(() => {
    const slider = document.querySelector(".audio-slider");
    slider.defaultValue = 0;

    const autoPlayNewTrack = () => {
      updateSong(trackList[localCurrTrack].url);
    };
    autoPlayNewTrack();
  }, [localCurrTrack]);

  useEffect(() => {
    setTrack(song);
    // setTrackTitle(trackList[localCurrTrack].title);
    setTrackUrl(song.url);
  });

  const playHandler = () => {
    setLocalIsPlay(!localIsPlay);
  };

  // ==== PLAY HANDLER
  useEffect(() => {
    if (audioRef.current) {
      if (localIsPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [localIsPlay]);

  const convertTime = (durationSeconds) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60); //  remaining seconds
    const secondsFinal = seconds < 10 ? `0${seconds}` : seconds; // adding 0  for when seconds in single digit
    // setDuration(`${minutes}:${secondsFinal}`);
    return `${minutes}:${secondsFinal}`;
  };

  // active slider handler && when track ends
  useEffect(() => {
    const audio = document.querySelector(".audio-player");
    const slider = document.querySelector(".audio-slider");
    slider.max = audioRef.current.duration;

    const durationSetter = () => {
      let audioDuration = convertTime(audioRef.current.duration);
      setDuration(audioDuration);
    };

    const timeUpdater = () => {
      slider.value = audio.currentTime;
      let currentTrackTime = convertTime(slider.value);
      setCurrentTime(currentTrackTime);
    };

    const sliderUpdater = () => {
      audioRef.current.currentTime = slider.value;
    };

    const trackOver = () => {
      if (parseInt(localCurrTrack) === trackList.length - 1) {
        setLocalIsPlay(false);
      } else {
        setLocalCurrTrack(parseInt(localCurrTrack) + 1);
      }
    };

    audioRef.current.addEventListener("ended", trackOver);
    audioRef.current.addEventListener("loadedmetadata", durationSetter);
    audioRef.current.addEventListener("timeupdate", timeUpdater);
    slider.addEventListener("change", sliderUpdater);

    return function cleanUp() {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", trackOver);
        audioRef.current.removeEventListener("loadedmetadata", durationSetter);
        audioRef.current.removeEventListener("timeupdate", timeUpdater);
        slider.removeEventListener("change", sliderUpdater);
      }
    };
  });

  // ====== handle next && back btn ====

  const backBtnHandler = () => {
    if (parseInt(localCurrTrack) > 0) {
      setLocalCurrTrack(localCurrTrack - 1);
    }
  };
  const nextBtnHandler = () => {
    if (parseInt(localCurrTrack) < trackList.length - 1) {
      setLocalCurrTrack(localCurrTrack + 1);
      setLocalIsPlay(true);
    }
  };

  // ====== SongListing component && handlers ========
  const handleSongListingPlayPause = (e) => {
    e.preventDefault();
    let index = e.currentTarget.value;
    if (parseInt(localCurrTrack) === parseInt(index)) {
      setLocalIsPlay(!localIsPlay);
    } else {
      setLocalCurrTrack(parseInt(index));
      setLocalIsPlay(true);
    }
  };
  const songListing = (song, index) => {
    return (
      <div className="songListing-container" key={song.id} value={index}>
        <button
          className="songListing-play-btn"
          value={index}
          onClick={handleSongListingPlayPause}
        >
          <div value={index}>
            {parseInt(localCurrTrack) === parseInt(index) && localIsPlay ? (
              <FaPause size="10px" />
            ) : (
              <FaPlay size="10px" />
            )}
          </div>
        </button>
        <span className="songListing-title">{song.title}</span>
      </div>
    );
  };
  return (
    <>
      <div className="audio-player-container" key={trackTitle}>
        <div className="play-btn-container">
          <button className="play-btn" onClick={playHandler}>
            {localIsPlay ? <FaPause size="45px" /> : <FaPlay size="45px" />}
          </button>
        </div>
        <div className="track-details">
          <span className="track-title">{trackList[localCurrTrack].title}</span>
          <span className="track-time">
            {currentTime} / {duration}
          </span>
        </div>

        <audio
          src={trackList[localCurrTrack].url}
          className="audio-player"
          // preload="metadata"
          preload="auto"
          ref={audioRef}
        >
          <source src={source} type="audio/mpeg" />
        </audio>
        <div className="slider-container">
          <input type="range" min={0} className="audio-slider" />
        </div>
        <div className="audio-btn-container">
          <span className="rewind-container" onClick={backBtnHandler}>
            <FaFastBackward />
          </span>
          <span className="fast-foward-container" onClick={nextBtnHandler}>
            <FaFastForward />
          </span>
        </div>
      </div>
      <div className="songList-container">
        {trackList && trackList.map((song, index) => songListing(song, index))}
      </div>
    </>
  );
};
export default AudioPlayer;
