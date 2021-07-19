import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as merchPostActions from "../store/merchPost";
import ProfileSideBar from "./ProfileSideBar";
import ProductDisplay from "./ProductDisplay";

import "./CSS/MerchPost.css";

const MerchPost = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const merchCollection = useSelector(
    (state) => state.session.user.normCollection.merch
  );
  const { userId } = useParams();
  const { merchPostId } = useParams();
  const [merchPost, setMerchPost] = useState({});
  const [showProductDisplay, setShowProductdisplay] = useState(false);

  useEffect(() => {
    const FetchWrapper = async () => {
      let merch_post = await dispatch(
        merchPostActions.fetchSingleMerchPost(merchPostId)
      );

      setMerchPost(merch_post);
    };
    FetchWrapper();
  }, [dispatch]);

  // handle open close of purchase modal
  const openPurchase = () => {
    if (showProductDisplay) return;
    setShowProductdisplay(true);
  };
  useEffect(() => {
    const closePurchase = () => {
      if (!showProductDisplay) return;
      setShowProductdisplay(false);
    };
    if (showProductDisplay) {
      document.addEventListener("click", closePurchase);
    }
    return () => {
      document.removeEventListener("click", closePurchase);
    };
  }, [showProductDisplay]);

  return (
    <div className="music-content-wrapper">
      {showProductDisplay && (
        <div className="purchase-overlay">
          <ProductDisplay post={merchPost} />{" "}
        </div>
      )}
      <div className="main-content-container merch-post">
        <div className="audio-content">
          <div className="post-title">{merchPost.title}</div>
          <div className="audio-container"></div>
          <div className="audio-details-2">{merchPost.description}</div>
          <div className="audio-details-1">
            <div>
              {sessionUser.id !== parseInt(userId) ? (
                merchCollection[merchPost.id] ? (
                  <div className="owned-item">You own this</div>
                ) : (
                  <button onClick={openPurchase} className="purchase-btn">
                    {parseInt(merchPost.price) > 0
                      ? `Buy Merch $${merchPost.price?.toFixed(2)}`
                      : "Buy Merch FREE"}
                  </button>
                )
              ) : (
                <div>
                  Purchase price: ${parseInt(merchPost.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="cover-aux-container">
          <div className="post-image-container">
            <img src={merchPost.image} className="post-image" />
          </div>
          <div className="post-additional-info">
            {/* <span className="post-collections">in x collections</span> */}
            {/* <span className="post-wishlist">
              add to wishlist. react heart fill
            </span> */}
          </div>
        </div>
      </div>
      <div className="profile-container">
        <ProfileSideBar />
      </div>
    </div>
  );
};

export default MerchPost;
