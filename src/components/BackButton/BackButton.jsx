import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpLeftSquare } from "react-icons/bs";
import "./BackButton.css";

const BackButton = ({ to = "/", label = "BACK" }) => {
  return (
    <Link to={"/"} className="back__button">
      <BsArrowUpLeftSquare className="back__icon" />
      <span className="back__text">BACK</span>
    </Link>
  );
};

export default BackButton;