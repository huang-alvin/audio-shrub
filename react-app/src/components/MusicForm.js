import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uploadMusic } from "../store/musicPost";
import "./CSS/MusicForm.css";

const MusicForm = () => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [song, setSong] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);

  const updateSong = (e) => {
    // console.log(e.target.files, "===");

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
    // console.log(song);
    // form.append("song", song);

    for (let songFile of song) {
      form.append(`song-${numSongs}`, songFile);
      numSongs++;
    }

    form.append("num_songs", numSongs);

    setErrors([]);
    setIsUpload(true);
    let res = await dispatch(uploadMusic(form));

    if (res.errors) {
      setIsUpload(false);
      setErrors([...res.errors]);
    } else {
      history.push(`/users/${userId}/music-post/${res.id}`);
    }
  };

  const errorComponent = (err) => {
    return (
      <div key={err} className="err-div">
        {err}
      </div>
    );
  };

  return (
    <div className="music-form-wrapper">
      <div className="music-form-container">
        <p className="login-title">Upload Music</p>
        <div className="login-divider" />
        <form
          className="music-form"
          onSubmit={uploadUserMusic}
          //   enctype="multipart/form-data"
          // action={`/api/upload/music`}
          method="post"
        >
          <div className="upload-status-container">
            {isUpload && <div>Please wait while files upload . . .</div>}
          </div>
          <div className="error-container">
            {errors &&
              errors.map((err) => {
                return errorComponent(err);
              })}
          </div>
          <div>
            <label className="title-label">Title</label>
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
              className="title-input music-input"
              required
            ></input>
          </div>
          <div className="description-div">
            <label className="description-label">Description</label>
            <textarea
              name="description"
              onChange={updateDescription}
              value={description}
              className="description-input"
              required
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
              required
              min="0"
            ></input>
            <div className="price-detail">US Dollars</div>
          </div>
          <div className="image-div">
            <label className="image-label">Image</label>
            <input
              type="file"
              name="image"
              onChange={updateImage}
              className="image-input"
              accept=".png,.jpeg,.jpg"
              required
            ></input>
          </div>
          <div className="song-div">
            <label className="song-label">Song </label>
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
          <div className="upload-container">
            <input type="submit" value="UPLOAD" className="upload-btn"></input>
          </div>
          <div className="upload-detail">total upload size limited to 50Mb</div>
        </form>
      </div>
    </div>
  );
};
export default MusicForm;
