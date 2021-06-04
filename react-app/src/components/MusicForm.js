import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uploadMusic } from "../store/musicPost";
import "./CSS/MusicForm.css";

const MusicForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const userId = useSelector((state) => state.session.user.id);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updatePrice = (e) => {
    setPrice(e.target.value);
  };
  const uploadMusic = async (e) => {
    e.preventDefault();
    const mForm = document.querySelector(".music-form");
    const form = new FormData(mForm);
    for (let input of form) {
      console.log(input);
    }
    console.log(form.get("song"));
  };
  //   worry about csurf later
  return (
    <div className="music-form-wrapper">
      <div className="music-form-container">
        <form
          className="music-form"
          onSubmit={uploadMusic}
          enctype="multipart/form-data"
        >
          <div>
            <label className="title-label">Title</label>
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
              className="title-input"
              required
            ></input>
          </div>
          <div>
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
              className="price-input"
              required
              min="0"
            ></input>
          </div>
          <div>
            <label className="image-label">Image: .jpeg and .png only</label>
            <input
              type="file"
              name="image"
              //   onChange={updatePrice}
              className="image-input"
              accept=".png,.jpeg"
            ></input>
          </div>
          <div>
            <label className="song-label">Song: mp3 and mp4 only</label>
            <input
              type="file"
              name="song"
              className="song-input"
              accept=".mp3,.mp4,.m4a"
              multiple
              required
            ></input>
          </div>
          <input type="hidden" value={userId} name="userId" />
          <input type="submit" value="submit"></input>
        </form>
      </div>
    </div>
  );
};
export default MusicForm;
