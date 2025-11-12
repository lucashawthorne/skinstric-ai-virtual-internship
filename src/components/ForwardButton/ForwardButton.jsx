import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightSquare } from "react-icons/bs";
import "./ForwardButton.css";

const ForwardButton = ({ to = "/", label = "" }) => {
  return (
    <Link to={to} className="forward__button">
      <span className="forward__text">{label}</span>
      <BsArrowUpRightSquare className="forward__icon" />
    </Link>
  );
};

export default ForwardButton;
