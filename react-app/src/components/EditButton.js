import React from "react";
import { MdModeEdit } from "react-icons/md";
import "../components/CSS/EditButton.css";

const EditButton = ({ openForm }) => {
  return (
    <div className="edit-button-container" onClick={openForm}>
      <MdModeEdit />
    </div>
  );
};

export default EditButton;
