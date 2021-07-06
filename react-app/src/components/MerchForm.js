import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadMerch } from "../store/merchPost";
import "./CSS/MerchForm.css";

const MerchForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [errorExist, setErrorExist] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);

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
  const uploadUserMusic = (e) => {
    e.preventDefault();
    const uploadPost = async () => {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("price", price);
      form.append("image", image);
      form.append("user_id", userId);

      const res = await dispatch(uploadMerch(form));
      console.log(res, "=====");
      if (res.errors) {
        setErrors([...res.errors]);
        // setErrorExist(true);
      } else {
        history.push(`/users/${userId}/merch-post/${res.id}`);
      }
    };
    uploadPost();
  };
  useEffect(() => {
    const form = document.querySelector(".music-form");
    // const func = (e) => e.preventDefault();
    // form.addEventListener("submit", (e) => e.preventDefault());
    // return form.removeEventListener("submit", func);
  });

  const errorComponent = (err) => {
    return (
      <div key={err} className="err-div">
        {err}
      </div>
    );
  };
  const errExist = errors.length > 0;
  return (
    <div className="music-form-wrapper">
      <div className="music-form-container">
        <p className="login-title">Upload Merch</p>
        <div className="login-divider" />
        <form
          className="music-form"
          onSubmit={uploadUserMusic}
          //   enctype="multipart/form-data"
          action={`/api/upload/music`}
          method="post"
        >
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
            <label className="image-label">Image:</label>
            <input
              type="file"
              name="image"
              onChange={updateImage}
              className="image-input"
              accept=".png,.jpeg,.jpg"
              // required
            ></input>
          </div>
          <input type="hidden" value={userId} name="userId" />
          <input type="submit" value="upload" className="upload-btn"></input>
          <div className="upload-detail">total upload size limited to 15Mb</div>
        </form>
      </div>
    </div>
  );
};
export default MerchForm;
