import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as viewUserActions from "../store/viewUser";
import "./CSS/ProfileSideBar.css";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.viewUser.profile);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(viewUserActions.fetchUserInfo(userId));
    };
    if (!profile || profile.id !== userId) {
      fetchProfile();
    }
  }, [dispatch]);

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-image-container">
          {profile && (
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Say_sue_me_in_club_steel_face_at_zandari_festa_2017.jpg"
              src={profile.image}
              className="profile-image"
            />
          )}
          {profile && (
            <div className="profile-username">{profile.username}</div>
          )}
          {/* <div className="profile-description">description</div> */}
        </div>
        {/* <div className="discography-container">discography</div> */}
      </div>
    </>
  );
};
export default ProfileSideBar;
