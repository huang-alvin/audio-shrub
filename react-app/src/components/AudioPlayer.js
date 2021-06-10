import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay, FaPause, FaFastForward, FaFastBackward } from "react-icons/fa";
import * as audioPlayerActions from "../store/audioPlayer";
import "./CSS/AudioPlayer.css";

const AudioPlayer = ({ song }) => {
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.audioPlayer.playState);
  const trackList = useSelector((state) => state.audioPlayer.trackList);
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  //   const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState("");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [track, setTrack] = useState(null);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackUrl, setTrackUrl] = useState("");

  useEffect(() => {
    // auto play new track
    const autoPlayNewTrack = () => {
      const audio = document.querySelector(".audio-player");

      audio.load();
      audio
        .play()
        .then((res) => console.log("lll", res))
        .catch((e) => console.log(e, "hi"));
    };
    autoPlayNewTrack();
  }, [currentTrack]);
  const updatePlay = () => {
    console.log("update play");
    dispatch(audioPlayerActions.setPlayState(true));
  };
  //   useEffect(() => {
  //     const audio = document.querySelector(".audio-player");
  //     const updatePlay = () => {
  //       console.log("update play");
  //       dispatch(audioPlayerActions.setPlayState(true));
  //     };
  //     audio.addEventListener("playing", updatePlay);
  //     return () => audio.removeEventListener("playing", updatePlay);
  //   }, []);
  useEffect(() => {
    setTrack(song);
    setTrackTitle(song.title);
    setTrackUrl(song.url);
  });

  const playHandler = () => {
    // console.log(isPlay);
    dispatch(audioPlayerActions.setPlayState(!isPlay));
    // setIsPlay(!isPlay);
  };

  //   useEffect(() => {
  //     // as of right now, no auto play. thus need to reset play btn on re-render
  //     setIsPlay(false);
  //   }, [track]);

  useEffect(() => {
    const audio = document.querySelector(".audio-player");
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlay]);

  const convertTime = (durationSeconds) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60); //  remaining seconds
    const secondsFinal = seconds < 10 ? `0${seconds}` : seconds; // adding 0  for when seconds in single digit
    // setDuration(`${minutes}:${secondsFinal}`);
    return `${minutes}:${secondsFinal}`;
  };

  //   set the value of slider to 0 for initial render
  useEffect(() => {
    const slider = document.querySelector(".audio-slider");
    slider.defaultValue = 0;
  });

  useEffect(() => {
    const audio = document.querySelector(".audio-player");
    const slider = document.querySelector(".audio-slider");
    slider.max = audio.duration;

    const durationSetter = () => {
      let audioDuration = convertTime(audio.duration);
      setDuration(audioDuration);
    };

    const timeUpdater = () => {
      slider.value = audio.currentTime;
      let currentTrackTime = convertTime(slider.value);
      setCurrentTime(currentTrackTime);
    };

    const sliderUpdater = () => {
      audio.currentTime = slider.value;
    };

    audio.addEventListener("loadedmetadata", durationSetter);
    audio.addEventListener("timeupdate", timeUpdater);
    slider.addEventListener("change", sliderUpdater);

    if (audio.ended) {
      // this should be removed later to auto play the next track
      //   setIsPlay(false);
      dispatch(audioPlayerActions.setPlayState(false));
    }
    return function cleanUp() {
      audio.removeEventListener("loadedmetadata", durationSetter);
      audio.removeEventListener("timeupdate", timeUpdater);
      slider.removeEventListener("change", sliderUpdater);
    };
  });
  return (
    <div className="audio-player-container" key={trackTitle}>
      <div className="play-btn-container">
        <button className="play-btn" onClick={playHandler}>
          {isPlay ? <FaPause size="45px" /> : <FaPlay size="45px" />}
        </button>
      </div>
      <div className="track-details">
        <span className="track-title">{song.title}</span>
        <span className="track-time">
          {currentTime} / {duration}
        </span>
      </div>
      {/* {song.url} */}
      <audio
        src={trackList[currentTrack].url} // change of url breaks it in the middle of playing.
        className="audio-player"
        preload="metadata"
      />
      <div className="slider-container">
        <input
          type="range"
          min={0}
          className="audio-slider"
          onPlay={updatePlay}
        />
      </div>
      <div className="audio-btn-container">
        <span className="rewind-container">
          <FaFastBackward />
        </span>
        <span className="fast-foward-container">
          <FaFastForward />
        </span>
      </div>
    </div>
  );
};
export default AudioPlayer;