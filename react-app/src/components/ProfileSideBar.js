import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as viewUserActions from "../store/viewUser";
import { CgProfile } from "react-icons/cg";
import DiscographyListing from "./DiscographyListing";
import "./CSS/ProfileSideBar.css";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const viewUser = useSelector((state) => state.viewUser);
  const [discographyList, setDiscographyList] = useState([]);
  const DISCOGRAPHY_LIMIT = 3;

  // fetch current profile when browsing a new profile
  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(viewUserActions.fetchUserInfo(userId));
    };
    if (!viewUser.id || viewUser.id !== parseInt(userId)) {
      fetchProfile();
    }
  }, [userId]);

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
        <div className="profile-image-container">
          {viewUser?.image ? (
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Say_sue_me_in_club_steel_face_at_zandari_festa_2017.jpg"
              src={viewUser.image}
              className="profile-image"
            />
          ) : (
            <CgProfile className="default-profile-image" />
          )}

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
