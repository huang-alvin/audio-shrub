import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as viewUserActions from "../store/viewUser";
import "./CSS/ProfileSideBar.css";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const viewUser = useSelector((state) => state.viewUser);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("fetch profile");
      await dispatch(viewUserActions.fetchUserInfo(userId));
    };
    if (!viewUser.id || viewUser.id !== parseInt(userId)) {
      console.log(viewUser.id, userId);
      fetchProfile();
    }
  }, [userId]);

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-image-container">
          {viewUser && (
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Say_sue_me_in_club_steel_face_at_zandari_festa_2017.jpg"
              src={viewUser.image}
              className="profile-image"
            />
          )}
          {viewUser && (
            <div className="profile-username">{viewUser.username}</div>
          )}
          {/* <div className="profile-description">description</div> */}
        </div>
        {/* <div className="discography-container">discography</div> */}
      </div>
    </>
  );
};
export default ProfileSideBar;
