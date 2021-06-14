import React from "react";
import "./CSS/Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <a href="https://github.com/huang-alvin/audio-shrub">
          <FaGithub size="35px" className="github-icon icon" />
        </a>
        <a href="https://www.linkedin.com/in/alvin-huang-8aa750187/">
          <FaLinkedin size="35px" className="github-icon icon" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
