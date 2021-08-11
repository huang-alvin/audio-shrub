import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as viewUserActions from "../store/viewUser";
import { CgProfile } from "react-icons/cg";
import DiscographyListing from "./DiscographyListing";
import EditButton from "./EditButton";
import ProfileImageForm from "./ProfileImageForm";
import "./CSS/ProfileSideBar.css";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const viewUser = useSelector((state) => state.viewUser);
  const [discographyList, setDiscographyList] = useState([]);
  const [showImageForm, setShowImageForm] = useState(false);
  const DISCOGRAPHY_LIMIT = 3;

  // logic to handle open/closing image form
  const openForm = () => {
    if (showImageForm) return;
    setShowImageForm(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(viewUserActions.fetchUserInfo(userId));
    };
    if (!viewUser.id || viewUser.id !== parseInt(userId)) {
      fetchProfile();
    }
  }, [userId]);

  useEffect(() => {
    console.log("profile sidebar");
  }, [sessionUser.updated]);

  // generate discography list below user image
  useEffect(() => {
    const generateDiscographyList = () => {
      let discoList = [];
      for (
        let i = 0;
        i < viewUser?.music_posts.length && i < DISCOGRAPHY_LIMIT;
        i++
      ) {
        let music_post = viewUser.music_posts[i];
        discoList.push(music_post);
      }
      setDiscographyList(discoList);
    };
    generateDiscographyList();
  }, [viewUser]);

  return (
    <>
      <div className="profile-wrapper">
        {showImageForm && (
          <div className="profile-image-form-wrapper">
            <ProfileImageForm setShowImageForm={setShowImageForm} />
          </div>
        )}
        <div className="profile-image-container">
          {viewUser?.image ? (
            userId == sessionUser.id ? (
              <img
                src={`${sessionUser.image}?${sessionUser.updated}`}
                className="profile-image"
                key={sessionUser.updated}
              />
            ) : (
              <img src={viewUser.image} className="profile-image" /> // img for non-session user
            )
          ) : (
            <CgProfile className="default-profile-image" />
          )}
          {parseInt(userId) == sessionUser.id ? (
            <EditButton openForm={openForm} />
          ) : null}
          {/* <div className="profile-description">description</div> */}
        </div>
        {viewUser.username && (
          <div className="profile-username">{viewUser.username}</div>
        )}
        <div className="discography-wrapper">
          <Link to={`/users/${userId}/music`}>discography</Link>
          {discographyList.map((musicPost) => (
            <DiscographyListing post={musicPost} key={musicPost.id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default ProfileSideBar;
