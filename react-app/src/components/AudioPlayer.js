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

  // auto play new track
  useEffect(() => {
    const slider = document.querySelector(".audio-slider");
    slider.defaultValue = 0;

    const autoPlayNewTrack = () => {
      const audio = document.querySelector(".audio-player");
      // audio.pause();
      // audio.src = trackList[currentTrack].url;
      // audio.load();
      // audio
      //   .play()
      //   .then((res) => console.log("promise resolved", res))
      //   .catch((e) => console.log(e, "promise failed"));
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then((res) => console.log("promise reslve"))
          .catch((e) => console.log(e, "fail"));
      }
    };
    autoPlayNewTrack();
  }, [currentTrack]);

  //   set the value of slider to 0 for every new url loaded
  // useEffect(() => {
  //   const audio = document.querySelector(".audio-player");
  //   const slider = document.querySelector(".audio-slider");
  //   slider.defaultValue = 0;
  //   audio.pause();
  //   audio.load();
  // }, [currentTrack]);

  // const updatePlay = () => {
  //   dispatch(audioPlayerActions.setPlayState(true));
  // };
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
    dispatch(audioPlayerActions.setPlayState(!isPlay));
    // setIsPlay(!isPlay);
  };

  // ==== PLAY HANDLER
  useEffect(() => {
    const audio = document.querySelector(".audio-player");
    if (isPlay) {
      // audio.load();
      audio
        .play()
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
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

  // active slider handler && when track ends
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

    const trackOver = () => {
      if (parseInt(currentTrack) === trackList.length - 1) {
        dispatch(audioPlayerActions.setPlayState(false));
      } else {
        dispatch(
          audioPlayerActions.setCurrentTrack(parseInt(currentTrack) + 1)
        );
      }
    };

    audio.addEventListener("ended", trackOver); // when implenting auto paly next track remove this
    audio.addEventListener("loadedmetadata", durationSetter);
    audio.addEventListener("timeupdate", timeUpdater);
    slider.addEventListener("change", sliderUpdater);

    return function cleanUp() {
      audio.removeEventListener("ended", trackOver); // remove this later with ^^
      audio.removeEventListener("loadedmetadata", durationSetter);
      audio.removeEventListener("timeupdate", timeUpdater);
      slider.removeEventListener("change", sliderUpdater);
    };
  });

  // ====== handle next && back btn ====

  const backBtnHandler = () => {
    if (parseInt(currentTrack) > 0) {
      dispatch(audioPlayerActions.setCurrentTrack(parseInt(currentTrack) - 1));
    }
  };
  const nextBtnHandler = () => {
    if (parseInt(currentTrack) < trackList.length - 1) {
      dispatch(audioPlayerActions.setCurrentTrack(parseInt(currentTrack) + 1));
    }
  };
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
        src={trackList[currentTrack].url} // change of url breaks it in the middle of playing?
        className="audio-player"
        // preload="metadata"
        preload="auto"
      />
      <div className="slider-container">
        <input
          type="range"
          min={0}
          className="audio-slider"
          // onPlay={updatePlay}
        />
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
  );
};
export default AudioPlayer;
