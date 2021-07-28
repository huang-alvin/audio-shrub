import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserImage } from "../store/session";
import "./CSS/ProfileImageForm.css";

const ProfileImageForm = ({ setShowImageForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageFile, setImageFile] = useState("");
  const [errors, setErrors] = useState([]);
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionUserImage = useSelector((state) => state.session.user.image);

  const updateImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const upload = async () => {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("user_id", userId);

      const res = await dispatch(updateUserImage(form));
      if (res.errors) {
        setErrors([...res.errors]);
      } else {
        // TO DO: SHOW SOME FORM OF SUCCESS (CSS ANIMATION GREEN CHECKMARK)
        setShowImageForm(false);
      }
    };
    upload();
  };

  return (
    <div class>
      <form className="profile-image-form" onSubmit={uploadImage}>
        {/* TO DO DISPLAY ERR */}
        <input
          type="file"
          name="image"
          onChange={updateImage}
          className="image-input"
          accept=".png,.jpeg,.jpg"
          required
        ></input>
        <button onClick={() => setShowImageForm(false)} id="cancel-btn">
          cancel
        </button>
        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default ProfileImageForm;
