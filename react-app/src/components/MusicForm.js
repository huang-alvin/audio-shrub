import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uploadMusic } from "../store/musicPost";
import "./CSS/MusicForm.css";

const MusicForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);

  const updateSong = (e) => {
    let songList = [];
    for (let song of e.target.files) {
      songList.push(song);
    }
    setSong(e.target.files);
  };
  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updatePrice = (e) => {
    setPrice(e.target.value);
  };
  const uploadUserMusic = async (e) => {
    e.preventDefault();

    let numSongs = 0;
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    form.append("image", image);
    form.append("user_id", userId);
    console.log(song);
    form.append("song", song);
    // form.append("num_songs", numSongs);

    // for (let songFile of song) {
    //   form.append(`song-${numSongs}`, songFile);
    //   numSongs++;
    // }
    dispatch(uploadMusic(form));
  };
  useEffect(() => {
    const form = document.querySelector(".music-form");
    // const func = (e) => e.preventDefault();
    // form.addEventListener("submit", (e) => e.preventDefault());
    // return form.removeEventListener("submit", func);
  });
  //   worry about csurf later
  return (
    <div className="music-form-wrapper">
      <div className="music-form-container">
        <p className="login-title">Upload Music</p>
        <div className="login-divider" />
        <form
          className="music-form"
          onSubmit={uploadUserMusic}
          //   enctype="multipart/form-data"
          action={`/api/upload/music`}
          method="post"
        >
          <div>
            <label className="title-label">Title</label>
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
              className="title-input music-input"
              //   required
            ></input>
          </div>
          <div className="description-div">
            <label className="description-label">Description</label>
            <textarea
              name="description"
              onChange={updateDescription}
              value={description}
              className="description-input"
              //   required
            ></textarea>
          </div>
          <div>
            <label className="price-label">Price</label>
            <input
              type="number"
              name="price"
              onChange={updatePrice}
              value={price}
              className="price-input music-input"
              //   required
              min="0"
            ></input>
          </div>
          <div className="image-div">
            <label className="image-label">Image:</label>
            <input
              type="file"
              name="image"
              onChange={updateImage}
              className="image-input"
              accept=".png,.jpeg"
            ></input>
          </div>
          <div className="song-div">
            <label className="song-label">Song: </label>
            <input
              type="file"
              name="song"
              className="song-input"
              accept=".mp3,.mp4,.m4a,MP4,.WAV"
              multiple
              onChange={updateSong}
              required
            ></input>
          </div>
          <input type="hidden" value={userId} name="userId" />
          <input type="submit" value="upload" className="upload-btn"></input>
        </form>
      </div>
    </div>
  );
};
export default MusicForm;
